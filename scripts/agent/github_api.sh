#!/usr/bin/env bash
#
# Thin curl layer over api.github.com, sourced by scripts/agent/run_agent.sh.
#
# There is no `gh` CLI on this host, and there must be no GitHub token in the
# agent's environment: every function here reads the PAT inline from
# $GH_TOKEN_FILE per call and never exports it, so the headless claude
# subprocess never sees a credential it was told not to use.
#
# Conventions:
#   - payloads are assembled with tiny `python3 -` heredocs, never ad-hoc JSON
#   - each call writes the response body to a caller-named file and sets
#     GH_HTTP_CODE; callers decide what a code means
#   - DRY_RUN=1 (in the environment) turns every WRITE into a logged no-op —
#     reads stay real so intake is exercised exactly as in production

# gh_api <method> <path> <out_body_file> [in_body_file]
# Sets GH_HTTP_CODE. A curl failure (network) yields GH_HTTP_CODE="".
gh_api() {
  local method="$1" path="$2" out="$3" in_file="${4:-}"
  local curl_args=(
    -sS -o "$out" -w '%{http_code}'
    -X "$method" "https://api.github.com${path}"
    -H "Authorization: Bearer $(<"$GH_TOKEN_FILE")"
    -H 'Accept: application/vnd.github+json'
    -H 'X-GitHub-Api-Version: 2022-11-28'
  )
  [[ -n "$in_file" ]] && curl_args+=(--data-binary "@$in_file")
  GH_HTTP_CODE="$(curl "${curl_args[@]}")" || GH_HTTP_CODE=""
}

# list_open_issues <out_json> — open issues AND PRs (the list endpoint returns
# both; the caller filters entries carrying a `pull_request` key).
list_open_issues() {
  gh_api GET "/repos/$GH_REPO/issues?state=open&per_page=100&sort=created&direction=asc" "$1"
}

# single_issue <number> <out_json>
single_issue() {
  gh_api GET "/repos/$GH_REPO/issues/$1" "$2"
}

# issue_comments <number> <out_json>
issue_comments() {
  gh_api GET "/repos/$GH_REPO/issues/$1/comments?per_page=100" "$2"
}

# list_open_pr_head_refs <out_txt> — one `head.ref` per line.
list_open_pr_head_refs() {
  local out="$1"
  gh_api GET "/repos/$GH_REPO/pulls?state=open&per_page=100" "$out.json"
  "$PYTHON_BIN" - "$out.json" > "$out" <<'PY'
import json, sys
try:
    pulls = json.load(open(sys.argv[1], encoding="utf-8"))
except Exception:
    pulls = []
for p in pulls if isinstance(pulls, list) else []:
    ref = (p.get("head") or {}).get("ref") or ""
    if ref:
        print(ref)
PY
}

# add_comment <number> <body_file>
add_comment() {
  if [[ "${AGENT_DRY_RUN:-0}" == "1" ]]; then
    log "dry run — comment on #$1 skipped"
    return 0
  fi
  local n="$1" body_file="$2" payload="$STATE_DIR/comment_payload.json" resp="$STATE_DIR/comment_response.json"
  "$PYTHON_BIN" - "$body_file" > "$payload" <<'PY'
import json, sys
print(json.dumps({"body": open(sys.argv[1], encoding="utf-8").read()}))
PY
  gh_api POST "/repos/$GH_REPO/issues/$n/comments" "$resp" "$payload"
  if [[ "$GH_HTTP_CODE" == "201" || "$GH_HTTP_CODE" == "200" ]]; then
    log "comment posted on #$n"
  else
    log "comment on #$n FAILED (HTTP $GH_HTTP_CODE): $(head -c 300 "$resp" 2>/dev/null)"
    return 1
  fi
}

# add_labels <number> <label> [more labels...]
add_labels() {
  if [[ "${AGENT_DRY_RUN:-0}" == "1" ]]; then
    log "dry run — labels [$*] on #$1 skipped"
    return 0
  fi
  local n="$1"; shift
  local payload="$STATE_DIR/labels_payload.json" resp="$STATE_DIR/labels_response.json"
  "$PYTHON_BIN" - "$@" > "$payload" <<'PY'
import json, sys
print(json.dumps({"labels": list(sys.argv[1:])}))
PY
  gh_api POST "/repos/$GH_REPO/issues/$n/labels" "$resp" "$payload"
  if [[ "$GH_HTTP_CODE" == "200" || "$GH_HTTP_CODE" == "201" ]]; then
    log "labels [$*] added to #$n"
  else
    log "labels on #$n FAILED (HTTP $GH_HTTP_CODE): $(head -c 300 "$resp" 2>/dev/null)"
    return 1
  fi
}

# ensure_label <name> <color> <description> — idempotent bootstrap; 422 = exists.
ensure_label() {
  local name="$1" color="$2" desc="$3" payload="$STATE_DIR/label_payload.json" resp="$STATE_DIR/label_response.json"
  "$PYTHON_BIN" - "$name" "$color" "$desc" > "$payload" <<'PY'
import json, sys
print(json.dumps({"name": sys.argv[1], "color": sys.argv[2], "description": sys.argv[3]}))
PY
  gh_api POST "/repos/$GH_REPO/labels" "$resp" "$payload"
  case "$GH_HTTP_CODE" in
    201) log "label created: $name" ;;
    422) log "label already exists: $name" ;;
    *)   log "ensure_label $name FAILED (HTTP $GH_HTTP_CODE): $(head -c 300 "$resp" 2>/dev/null)"; return 1 ;;
  esac
}

# create_pr <branch> <base> <title> <body_file> <resp_json>
create_pr() {
  local branch="$1" base="$2" title="$3" body_file="$4" resp="$5" payload="$STATE_DIR/pr_payload.json"
  "$PYTHON_BIN" - "$branch" "$base" "$title" "$body_file" > "$payload" <<'PY'
import json, sys
branch, base, title, body_file = sys.argv[1:5]
print(json.dumps({
    "title": title,
    "head": branch,
    "base": base,
    "body": open(body_file, encoding="utf-8").read(),
}))
PY
  gh_api POST "/repos/$GH_REPO/pulls" "$resp" "$payload"
}

# create_issue <title> <body_file> <resp_json> [label ...]
# Labels are set AT CREATION, not with a follow-up call: the run report must
# never exist unlabelled, or the next run's intake queues it as work.
create_issue() {
  local title="$1" body_file="$2" resp="$3"
  shift 3
  local payload="$STATE_DIR/issue_payload.json"
  "$PYTHON_BIN" - "$title" "$body_file" "$@" > "$payload" <<'PY'
import json, sys
payload = {"title": sys.argv[1], "body": open(sys.argv[2], encoding="utf-8").read()}
if sys.argv[3:]:
    payload["labels"] = sys.argv[3:]
print(json.dumps(payload))
PY
  gh_api POST "/repos/$GH_REPO/issues" "$resp" "$payload"
}
