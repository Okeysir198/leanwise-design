#!/usr/bin/env bash
#
# Issue-driven agent pipeline — cron entrypoint.
#
# The wrapper is REPO-AGNOSTIC: every repo-specific value (the GitHub repo,
# the ops clone path, the install command, the state-dir slug) lives in
# scripts/agent/repo.conf beside this script. Each repo carries its own copy of
# this directory, because the run hard-resets its tree to origin/main — the
# pipeline has to be IN the tree it resets.
#
#   layer 1  GitHub API    intake: open issues with no open PR, unlabeled or
#                          retriable, oldest first, capped per run
#   layer 2  claude -p     per issue, one unattended session: read the brief,
#                          implement, prove with local gates, push ONE branch
#   layer 3  GitHub REST   open a PR (Closes #N) from the branch metadata the
#                          agent left behind — the agent never touches the API
#   layer 4  GitHub issue  publish the run report so it reaches a human —
#                          GitHub emails the repo owner on issue creation
#
# The human merges the PR; `Closes #N` closes the issue on merge. There is no
# auto-merge and no approval detection anywhere in this script.
#
# Layer 2 runs with --dangerously-skip-permissions and is bounded four ways:
# `timeout`, --max-turns, the hard constraints in scripts/agent/agent_prompt.md
# (never main, never wrangler, never playwright, no push without green gates),
# and the wrapper's validation of the branch name before any PR is opened.
#
# ⚠ This script HARD-RESETS its own repo tree to origin/main. It must only ever
# run from a pipeline-only clone, whose path is EXPECTED_ROOT. Never point it at
# a working checkout — the path is asserted, and a dirty tree is refused
# outright. (Override for one-off experiments with AGENT_ALLOW_ANY_CWD=1.)
#
# ⚠ ACCEPTED RISK: the agent's hard constraints (never wrangler, never e2e,
# never the network) are PROMPT-level — the wrapper validates only the branch
# name it comes back with. The cheap containment lever is the token: point
# GH_TOKEN_FILE at a fine-grained PAT scoped to the one repo, so the worst case
# is bounded to it.
#
# ⚠ Issue text becomes the agent's prompt, so intake takes only issues OPENED by
# the repo's owner, members or collaborators, and the brief carries only their
# comments. On a public repo anyone can open an issue or comment; an arming
# label would not close it, because the author can still edit the body after a
# collaborator applies the label.
#
# Configuration, in precedence order: the environment, then
# scripts/agent/repo.conf (committed, public-safe), then an optional host file
# $AGENT_CONFIG_DIR/$AGENT_SLUG.conf (never committed) for what a public repo
# must not carry — EXPECTED_ROOT, a token path. Credentials also live in
# $AGENT_CONFIG_DIR (default ~/.config/leanwise-agent):
#   agent.env — ANTHROPIC_BASE_URL / AUTH_TOKEN / ANTHROPIC_DEFAULT_*_MODEL.
#     REQUIRED: without it the session would fall back to ambient credentials.
#   gh.token  — a PAT covering the repo (override with GH_TOKEN_FILE).
#
# Install: one cron entry per repo, each running the copy inside its OWN ops
# clone, offset so they do not overlap. Create the log directory first — cron
# opens the redirect before this script creates STATE_DIR:
#
#   mkdir -p ~/.cache/leanwise-agent/<slug>
#   7 3 */2 * * <ops-clone>/scripts/agent/run_agent.sh \
#     >> ~/.cache/leanwise-agent/<slug>/run_agent.log 2>&1
#
# Testing without side effects:
#
#   AGENT_DRY_RUN=1 AGENT_CAP=0 scripts/agent/run_agent.sh        # intake only
#   AGENT_DRY_RUN=1 AGENT_ISSUES=3 AGENT_CAP=1 scripts/agent/run_agent.sh
#
#   A dry run reads the real API (so intake is exercised) but the agent does
#   not push, and no comment, label, PR or report issue is written.

set -uo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

# Everything repo-specific lives in repo.conf next to this script, so the same
# wrapper serves more than one repo. It is sourced BEFORE the
# defaults below, and every value in it yields to an environment variable the
# caller already set.
REPO_CONF="${AGENT_REPO_CONF:-$(dirname "${BASH_SOURCE[0]}")/repo.conf}"
if [[ -f "$REPO_CONF" ]]; then
  # shellcheck source=repo.conf
  source "$REPO_CONF"
else
  echo "[run_agent] missing repo config: $REPO_CONF" >&2
  exit 1
fi
# The host file fills what a public repo.conf must not commit (EXPECTED_ROOT,
# a token path). Sourced after repo.conf with the same `:=` defaults, so it
# fills gaps and never overrides a committed value.
AGENT_CONFIG_DIR="${AGENT_CONFIG_DIR:-$HOME/.config/leanwise-agent}"
HOST_CONF="$AGENT_CONFIG_DIR/${AGENT_SLUG:-}.conf"
# shellcheck disable=SC1090
[[ -n "${AGENT_SLUG:-}" && -f "$HOST_CONF" ]] && source "$HOST_CONF"
for _need in GH_REPO EXPECTED_ROOT AGENT_SLUG INSTALL_CMD PKG_BIN; do
  [[ -n "${!_need:-}" ]] || { echo "[run_agent] $_need is unset — set it in $REPO_CONF or $HOST_CONF" >&2; exit 1; }
done

ENV_FILE="${AGENT_ENV:-$AGENT_CONFIG_DIR/agent.env}"
# State is namespaced by AGENT_SLUG: the lock, the saved branch metadata and
# the run logs are all per-repo. Two pipelines sharing a state dir would take
# each other's lock and heal from each other's meta files.
AGENT_STATE_ROOT="${AGENT_STATE_ROOT:-$HOME/.cache/leanwise-agent}"
STATE_DIR="${AGENT_STATE_DIR:-$AGENT_STATE_ROOT/$AGENT_SLUG}"
RUN_DIR="$STATE_DIR/runs/$(date -u +%Y%m%dT%H%M%SZ)"
LOCK_DIR="$STATE_DIR/run.lock"
STALE_LOCK_SECONDS="${AGENT_STALE_LOCK:-14400}"   # 4h > worst case: 5 issues x 40min
GH_TOKEN_FILE="${GH_TOKEN_FILE:-$AGENT_CONFIG_DIR/gh.token}"
CLAUDE_BIN="${CLAUDE_BIN:-$HOME/.local/bin/claude}"
PYTHON_BIN="${PYTHON_BIN:-python3}"
AGENT_TIMEOUT="${AGENT_TIMEOUT:-2400}"
RUN_ABORT_REASON=""   # set by run_issue on an environment fault; read by main
RUN_ABORT_LOG=""
AGENT_MAX_TURNS="${AGENT_MAX_TURNS:-120}"
AGENT_CAP="${AGENT_CAP:-5}"
BASE_BRANCH="${BASE_BRANCH:-main}"
LABEL_FAIL="agent-failed"       # remove this label on the issue to retry
LABEL_SKIP="no-agent"           # pipeline must never pick this up

# The run report is itself an issue, so without this the pipeline queues its
# own reports as work. It did: run 2026-10-08 "implemented" #17 and #18, which
# are both [agent-run] reports, and the next run then queued #19. Two guards,
# because they fail differently: the label is applied to reports created from
# now on, and the title prefix catches the ones already on the board (and any
# report whose labelling call failed).
REPORT_TITLE_PREFIX="[agent-run]"
export REPORT_TITLE_PREFIX   # read by the intake filter's python heredoc

# `set -e` is deliberately OFF (see `set -uo pipefail` above): every failure
# in this script is a path that must continue — a failed issue must not abort
# the remaining issues. The manual `|| rc=` handling everywhere is on purpose.
# cron gives a near-empty PATH. ~/.local/bin holds claude, node and npm;
# ~/.local/share/pnpm is the standalone pnpm (there is no corepack on this box,
# which is also why repo.conf turns pnpm's packageManager self-install OFF).
export PATH="$HOME/.local/bin:$HOME/.local/share/pnpm:/usr/local/bin:/usr/bin:/bin:${PATH}"
# Fail fast instead of hanging on an SSH passphrase prompt nobody can answer.
export GIT_SSH_COMMAND="ssh -o BatchMode=yes"

# Logs go to STDERR so a function whose stdout is captured (open_pr_from_meta
# echoes the PR URL into $( )) keeps its diagnostics out of the captured value.
log() { echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] $*" >&2; }
_mtime() { stat -c %Y "$1" 2>/dev/null || stat -f %m "$1" 2>/dev/null || echo 0; }

# --- Preflight ---------------------------------------------------------------

if [[ "$REPO_ROOT" != "$EXPECTED_ROOT" && "${AGENT_ALLOW_ANY_CWD:-0}" != "1" ]]; then
  log "refusing to run outside the pipeline checkout"
  log "  this tree: $REPO_ROOT"
  log "  expected:  $EXPECTED_ROOT"
  log "the run hard-resets its tree to origin/main — see the header of this script"
  exit 1
fi

if [[ -n "$(git -C "$REPO_ROOT" status --porcelain --untracked-files=no 2>/dev/null)" ]]; then
  log "ops checkout is dirty — refusing to reset; inspect $REPO_ROOT"
  exit 1
fi

if [[ ! -f "$ENV_FILE" ]]; then
  log "required env file missing: $ENV_FILE"
  log "without it the headless session would use ambient credentials — set it up, see the header"
  exit 1
fi

if [[ ! -f "$GH_TOKEN_FILE" ]]; then
  log "no GitHub token at $GH_TOKEN_FILE — intake itself needs it (private repo)"
  exit 1
fi

if [[ ! -x "$CLAUDE_BIN" ]]; then
  CLAUDE_BIN="$(command -v claude || true)"
fi
[[ -n "$CLAUDE_BIN" ]] || { log "claude CLI not found"; exit 1; }

# The toolchain is logged, not just checked. Five issues failed identically on
# 2026-10-08 with "pnpm install failed" and the only evidence was a log file on
# this box — so the run report could not say WHICH part of the toolchain was
# wrong, and the owner reading GitHub had nothing to act on. Versions in the
# run log make a skew visible before it becomes an install failure.
PKG_BIN_PATH="$(command -v "$PKG_BIN" || true)"
if [[ -z "$PKG_BIN_PATH" ]]; then
  log "package manager '$PKG_BIN' is not on PATH"
  log "  PATH=$PATH"
  log "cron does not source rc files — PATH is set at the top of this script; add the dir there"
  exit 1
fi
PKG_VERSION_ACTUAL="$("$PKG_BIN" --version 2>/dev/null | tr -d '[:space:]')"
NODE_VERSION_ACTUAL="$(node --version 2>/dev/null || echo '?')"
log "toolchain: node $NODE_VERSION_ACTUAL, $PKG_BIN $PKG_VERSION_ACTUAL ($PKG_BIN_PATH)"

# This script FORCES a PATH (cron gives it nothing), so whichever node comes
# first on that PATH is the one that builds the code — and nothing used to
# assert which. A box with an old node earlier on the path installs and builds
# against it, and the failure surfaces as a confusing install or build error
# rather than as "wrong node".
if [[ -n "${NODE_VERSION_MIN:-}" ]]; then
  _node_major="${NODE_VERSION_ACTUAL#v}"; _node_major="${_node_major%%.*}"
  if [[ ! "$_node_major" =~ ^[0-9]+$ ]]; then
    log "cannot determine the node version (got '$NODE_VERSION_ACTUAL') — is node on PATH?"
    log "  PATH=$PATH"
    exit 1
  fi
  if (( _node_major < NODE_VERSION_MIN )); then
    log "node $NODE_VERSION_ACTUAL is older than the required major $NODE_VERSION_MIN"
    log "  which node: $(command -v node)"
    log "  PATH=$PATH"
    log "the PATH this script exports decides which node runs — fix it there, not in cron"
    exit 1
  fi
fi
if [[ -n "${PKG_VERSION_EXPECTED:-}" && "$PKG_VERSION_ACTUAL" != "$PKG_VERSION_EXPECTED" ]]; then
  log "⚠ $PKG_BIN is $PKG_VERSION_ACTUAL but repo.conf expects $PKG_VERSION_EXPECTED"
  log "  the install runs with version self-management OFF, so a skew here is"
  log "  resolved against the installed $PKG_BIN, not the pinned one — if the"
  log "  install fails on a lockfile that is in sync, this is the first suspect"
fi

mkdir -p "$STATE_DIR" "$STATE_DIR/meta" "$RUN_DIR"

# Never let a slow run overlap the next one. mkdir-lock: atomic everywhere, no flock dependency.
# Known (accepted) race: on the stale path, rmdir→mkdir is not atomic, so two
# processes that BOTH see a stale lock can slip through together; a fresh
# run's lock can only be cleared by a clock drift of STALE_LOCK_SECONDS.
# With a 4h window and a 2-day cadence, neither is reachable in practice.
if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  lock_age=$(( $(date +%s) - $(_mtime "$LOCK_DIR") ))
  if [[ "$lock_age" -lt "$STALE_LOCK_SECONDS" ]]; then
    log "another agent run is still going (${lock_age}s); skipping"
    exit 0
  fi
  log "clearing stale lock (${lock_age}s old)"
  rmdir "$LOCK_DIR" 2>/dev/null
  mkdir "$LOCK_DIR" 2>/dev/null || { log "cannot acquire lock"; exit 1; }
fi
trap 'rmdir "$LOCK_DIR" 2>/dev/null' EXIT

# shellcheck source=github_api.sh
source "$(dirname "${BASH_SOURCE[0]}")/github_api.sh"

# Credentials are handled AFTER the preflight checks. The ANTHROPIC_* values
# are exported to the claude subprocess via an EXPLICIT ALLOWLIST — not
# `set -a; source`: the day someone adds another token to the env file, a
# blanket export hands it to a --dangerously-skip-permissions process. The
# GitHub PAT is never exported either way — github_api.sh reads the file
# inline per call.
_env_allowlist='^(ANTHROPIC_BASE_URL|ANTHROPIC_AUTH_TOKEN|ANTHROPIC_DEFAULT_(SONNET|OPUS|HAIKU)_MODEL)='
while IFS= read -r _line; do export "$_line"; done < <(grep -E "$_env_allowlist" "$ENV_FILE")
for _required in ANTHROPIC_BASE_URL ANTHROPIC_AUTH_TOKEN; do
  [[ -n "${!_required:-}" ]] || { log "env file $ENV_FILE is missing $_required"; exit 1; }
done

# --- Intake --------------------------------------------------------------------
# Eligible = open issue (not a PR), without LABEL_SKIP/LABEL_FAIL, with no
# agent/issue-<n>-* branch on origin (open PR or bare branch both count),
# oldest first, capped. AGENT_ISSUES="3 7" intersects for testing.

collect_issues() {
  local issues="$RUN_DIR/issues.json" pr_heads="$RUN_DIR/pr_heads.txt" remote="$RUN_DIR/remote_branches.txt"

  # The PR list and the remote branches come FIRST: the heal pass depends only
  # on these, so a transient failure of the issues list must not stop healing.
  list_open_pr_head_refs "$pr_heads"
  git -C "$REPO_ROOT" ls-remote --heads origin 'refs/heads/agent/issue-*' > "$remote" 2>/dev/null || true

  list_open_issues "$issues"
  if [[ "$GH_HTTP_CODE" != "200" ]]; then
    log "issue list FAILED (HTTP $GH_HTTP_CODE): $(head -c 300 "$issues" 2>/dev/null)"
    : > "$RUN_DIR/queue.txt"
    return 1
  fi

  "$PYTHON_BIN" - "$issues" "$pr_heads" "$remote" > "$RUN_DIR/queue.txt" <<'PY'
import json, os, re, sys

issues = json.load(open(sys.argv[1], encoding="utf-8"))
if not isinstance(issues, list):
    sys.exit(0)  # an error body already surfaced as a non-200 upstream
pr_heads = {l.strip() for l in open(sys.argv[2], encoding="utf-8") if l.strip()}
remote = {l.split()[-1].removeprefix("refs/heads/")
          for l in open(sys.argv[3], encoding="utf-8") if l.strip()}

cap = int(os.environ.get("AGENT_CAP", "5"))
only = {int(x) for x in os.environ.get("AGENT_ISSUES", "").split() if x}
skip_labels = {"no-agent", "agent-failed"}
# The pipeline's own run reports are issues. Without this it queues them as
# work — which it did, on 2026-10-08, to #17 and #18.
report_prefix = os.environ.get("REPORT_TITLE_PREFIX", "[agent-run]")
# Issue text becomes the agent's prompt; see the header.
trusted = {"OWNER", "MEMBER", "COLLABORATOR"}

picked = 0
for it in sorted(issues, key=lambda x: x.get("number", 0)):
    if picked >= cap:
        break
    if "pull_request" in it:
        continue
    n = it["number"]
    labels = {l["name"] for l in it.get("labels", [])}
    if labels & skip_labels:
        continue
    if report_prefix and (it.get("title") or "").startswith(report_prefix):
        continue
    if it.get("author_association") not in trusted:
        print(f"skip #{n}: opened by {it.get('author_association')}, not a collaborator", file=sys.stderr)
        continue
    if only and n not in only:
        continue
    # Anything already in flight for this issue number — open PR or a bare
    # pushed branch — is skipped. A bare branch with no PR is healed (or
    # failed) by the heal pass below, not re-implemented.
    if any(re.fullmatch(rf"agent/issue-{n}-.+", ref) for ref in pr_heads | remote):
        continue
    title = (it.get("title") or "").replace("\t", " ").strip()
    print(f"{n}\t{title}")
    picked += 1
PY
}

# --- PR opening (shared by the success path and the heal path) -----------------
# Saves pain twice: the heal path retries ONLY this step when a previous run
# pushed the branch but the PR call failed; and the meta file is written
# before the PR call, so a network failure never costs a re-implementation.

# Parse (NEVER source) the meta file: it is written by an unattended session,
# and `source` would execute any hallucinated or injected line as code with
# the wrapper's whole environment behind it. Exactly these keys are legal,
# exactly in double quotes; anything else fails validation downstream.
parse_meta() {  # parse_meta <meta_file> → M_BRANCH M_TITLE M_BODY M_STATUS M_REASON
  local f="$1"
  M_BRANCH="$(sed -n 's/^BRANCH="\([^"]*\)"$/\1/p' "$f")"
  M_TITLE="$(sed -n 's/^PR_TITLE="\([^"]*\)"$/\1/p' "$f")"
  M_BODY="$(sed -n 's/^PR_BODY_FILE="\([^"]*\)"$/\1/p' "$f")"
  M_STATUS="$(sed -n 's/^STATUS="\([^"]*\)"$/\1/p' "$f")"
  M_REASON="$(sed -n 's/^FAIL_REASON="\(.*\)"$/\1/p' "$f")"
}

open_pr_from_meta() {  # $1 = issue number, $2 = meta env file; echoes PR URL on success
  local n="$1" meta_file="$2"
  parse_meta "$meta_file"
  if [[ -z "$M_BRANCH" || -z "$M_TITLE" || -z "$M_BODY" || ! -f "$M_BODY" ]]; then
    log "issue #$n: branch_meta incomplete or unparseable (need BRANCH, PR_TITLE, PR_BODY_FILE)"
    return 1
  fi
  # The branch name is the dedup key of the whole pipeline. A meta file naming
  # any other branch is a hallucination or a bug — never open a PR for it.
  if [[ ! "$M_BRANCH" =~ ^agent/issue-${n}- ]]; then
    log "issue #$n: meta names unexpected branch '$M_BRANCH' — refusing to open a PR for it"
    return 1
  fi
  # The ticket-closing mechanism is the Closes keyword. If the agent forgot
  # it, append it — a missing Closes silently breaks the whole contract.
  if ! grep -qi "closes #$n" "$M_BODY"; then
    printf '\n\nCloses #%s\n' "$n" >> "$M_BODY"
    log "issue #$n: PR body was missing 'Closes #$n' — appended"
  fi
  if [[ "${AGENT_DRY_RUN:-0}" == "1" ]]; then
    log "dry run — PR for #$n from $M_BRANCH skipped"
    return 0
  fi
  local resp="$RUN_DIR/pr-$n-response.json"
  create_pr "$M_BRANCH" "$BASE_BRANCH" "$M_TITLE" "$M_BODY" "$resp"
  if [[ "$GH_HTTP_CODE" == "201" ]]; then
    "$PYTHON_BIN" -c 'import json,sys; print(json.load(open(sys.argv[1]))["html_url"])' "$resp"
    return 0
  fi
  if [[ "$GH_HTTP_CODE" == "422" ]] && grep -q "already exists" "$resp" 2>/dev/null; then
    log "issue #$n: PR for $M_BRANCH already open — treating as success"
    echo "(PR already open)"
    return 0
  fi
  log "issue #$n: PR FAILED (HTTP $GH_HTTP_CODE): $(head -c 300 "$resp" 2>/dev/null)"
  return 1
}

# --- Failure path ---------------------------------------------------------------
# The report (or the session output tail) lands on the issue, and the label
# keeps future runs from burning another session on it. Removing the label is
# the retry button.

fail_issue() {  # $1 = n, $2 = issue_dir, $3 = reason
  local n="$1" dir="$2" reason="$3" body_file="$dir/failure-comment.md"
  mkdir -p "$dir"   # the heal pass fails issues that never had a run_issue dir
  {
    echo "🤖 The agent pipeline could not implement this issue."
    echo
    echo "**Reason:** $reason"
    echo
    if [[ -f "$dir/report.md" ]]; then
      echo "### Agent report"
      echo
      # 300 lines, never a byte-cut: a byte cap can split a markdown fence and
      # wreck the rest of the comment's rendering.
      sed -n '1,300p' "$dir/report.md"
    else
      # No report means the session died before writing one. It used to print
      # "(no output captured)" here and leave a path on the ops box as the
      # only evidence — which is what #12/#13/#14 got on 2026-10-08. Say which
      # stage failed instead, so the comment is actionable on its own.
      echo "### Session output (tail)"
      echo
      echo '```'
      if [[ -s "$dir/claude-output.txt" ]]; then
        tail -40 "$dir/claude-output.txt"
      else
        echo "(the session produced no output — it failed to start, or was killed"
        echo " before writing anything. The reason above is all the run knows;"
        echo " the full run log is on the ops host.)"
      fi
      echo '```'
    fi
    echo
    echo "_Remove the \`$LABEL_FAIL\` label to retry._"
  } > "$body_file"
  add_comment "$n" "$body_file" || true
  add_labels "$n" "$LABEL_FAIL" || true
  ledger "$n" "failed" "-" "$reason"
}

ledger() {  # $1 n, $2 verdict, $3 branch, $4 detail
  # detail is agent/free text: strip | (breaks the report table) and tabs
  # (break every later IFS=$'\t' read over the ledger).
  local detail=${4//|// }; detail=${detail//$'\t'/ }
  printf '%s\t%s\t%s\t%s\n' "$1" "$2" "$3" "$detail" >> "$RUN_DIR/ledger.txt"
}

# --- Dependency install -----------------------------------------------------------
# INSTALL_CMD comes from repo.conf (pnpm in one repo, npm in another). It is
# deliberately a STRING run through `bash -c`: the command needs its own flags
# and the config seam should not force every repo into one package manager's
# argument shape.
#
# < /dev/null for the same reason the session has it — this runs inside a
# `while read` over the queue, and anything that reads stdin eats the queue.

install_deps() {  # $1 = log file; 0 = installed, 1 = failed
  local logf="$1"
  log "install: $INSTALL_CMD"
  if bash -c "$INSTALL_CMD" < /dev/null >> "$logf" 2>&1; then
    return 0
  fi
  # The tail goes to the run log too, so the cron mail says what broke even
  # if the GitHub calls are the thing that is down.
  log "install FAILED — tail of $logf:"
  tail -20 "$logf" >&2
  return 1
}

# --- Per-issue session ------------------------------------------------------------

build_brief() {  # $1 = n, $2 = issue_dir
  local n="$1" dir="$2" issue="$dir/issue.json" comments="$dir/comments.json"
  single_issue "$n" "$issue"
  if [[ "$GH_HTTP_CODE" != "200" ]]; then
    log "issue #$n fetch FAILED (HTTP $GH_HTTP_CODE)"; return 1
  fi
  issue_comments "$n" "$comments" || true
  "$PYTHON_BIN" - "$issue" "$comments" > "$dir/brief.md" <<'PY'
import json, sys

it = json.load(open(sys.argv[1], encoding="utf-8"))
try:
    comments = json.load(open(sys.argv[2], encoding="utf-8"))
except Exception:
    comments = []
print(f"# Issue #{it['number']}: {it.get('title', '')}")
print()
labels = ", ".join(l["name"] for l in it.get("labels", [])) or "(none)"
print(f"Labels: {labels}")
print()
print("## Body")
print()
print(it.get("body") or "(empty)")
print()
print("## Comments")
trusted = {"OWNER", "MEMBER", "COLLABORATOR"}
kept = [c for c in comments if c.get("author_association") in trusted]
for c in kept:
    print()
    print(f"> **@{c['user']['login']}**: {c.get('body', '').strip()}")
if not kept:
    print("(none)")
if len(kept) < len(comments):
    print()
    print(f"({len(comments) - len(kept)} comment(s) from non-collaborators omitted.)")
PY
}

run_issue() {  # $1 = n, $2 = title
  local n="$1" title="$2" dir="$RUN_DIR/issue-$n" meta_file="$STATE_DIR/meta/issue-$n.env" pr_url
  mkdir -p "$dir"
  log "issue #$n: $title"

  # Workspace prep is wrapper-owned and idempotent: the agent inherits a tree
  # exactly at origin/main with no leftovers from the previous issue's build.
  git -C "$REPO_ROOT" fetch -q origin
  git -C "$REPO_ROOT" checkout -q "$BASE_BRANCH"
  git -C "$REPO_ROOT" reset -q --hard "origin/$BASE_BRANCH"
  git -C "$REPO_ROOT" clean -fdxq -e node_modules

  # An install that fails on a tree freshly reset to origin/main is an
  # ENVIRONMENT fault, never a property of this issue. It used to be handled
  # as a per-issue failure, so one broken box on 2026-10-08 commented on five
  # issues, labelled all five `agent-failed`, and left the owner to clear five
  # labels for one cause. Return 2 — main aborts the run and reports once.
  if ! install_deps "$dir/install.log"; then
    log "issue #$n: dependency install failed on a clean $BASE_BRANCH tree — aborting the run"
    RUN_ABORT_REASON="\`$INSTALL_CMD\` failed on a tree freshly reset to origin/$BASE_BRANCH, before any issue was touched. This is a host/toolchain fault, not an issue fault — no issue was labelled."
    RUN_ABORT_LOG="$dir/install.log"
    return 2
  fi

  build_brief "$n" "$dir" || { fail_issue "$n" "$dir" "could not fetch the issue from the API"; return 1; }

  rm -f "$meta_file"
  local prompt
  prompt="$(sed -e "s|@ISSUE_BRIEF_FILE@|$dir/brief.md|g" \
                -e "s|@REPORT_FILE@|$dir/report.md|g" \
                -e "s|@META_FILE@|$meta_file|g" \
                -e "s|@ISSUE_NUMBER@|$n|g" \
                -e "s|@BASE_BRANCH@|$BASE_BRANCH|g" \
                "$REPO_ROOT/scripts/agent/agent_prompt.md" 2>/dev/null)"
  # An empty prompt would launch an aimless session. The usual cause: the
  # plumbing files are not on $BASE_BRANCH yet (the tree was just reset to
  # them) — i.e. this script is running from a tree that predates its own
  # merge, or BASE_BRANCH points somewhere without the pipeline.
  if [[ -z "$prompt" || ! -f "$REPO_ROOT/scripts/agent/agent_prompt.md" ]]; then
    log "issue #$n: agent_prompt.md unreadable after reset — is the plumbing merged to $BASE_BRANCH?"
    fail_issue "$n" "$dir" "pipeline files missing from $BASE_BRANCH — merge the plumbing PR first, or set BASE_BRANCH to a branch that has them"
    return 1
  fi

  # < /dev/null — this session runs INSIDE a `while read` over queue.txt; if
  # claude or anything it spawns ever reads stdin, it eats the remaining queue
  # lines and silently skips issues. (Found by the GLM review of this file.)
  local claude_status
  timeout "$AGENT_TIMEOUT" "$CLAUDE_BIN" -p "$prompt" \
    --dangerously-skip-permissions --max-turns "$AGENT_MAX_TURNS" \
    < /dev/null > "$dir/claude-output.txt" 2>&1
  claude_status=$?

  case "$claude_status" in
    0)   ;;
    124) log "issue #$n: session exceeded AGENT_TIMEOUT=${AGENT_TIMEOUT}s — killed" ;;
    *)   log "issue #$n: session exited $claude_status" ;;
  esac

  if [[ -f "$dir/report.md" ]]; then
    log "issue #$n: report written"
  else
    log "issue #$n: no report at $dir/report.md — see $dir/claude-output.txt"
  fi

  if [[ ! -f "$meta_file" ]]; then
    fail_issue "$n" "$dir" \
      "the session left no branch metadata (nothing was pushed — see the report above)"
    return 1
  fi
  parse_meta "$meta_file"
  if [[ "$M_STATUS" == "failed" ]]; then
    fail_issue "$n" "$dir" "${M_REASON:-the agent reported failure (see the report above)}"
    return 1
  fi
  if [[ "$claude_status" == "124" ]]; then
    fail_issue "$n" "$dir" "session killed at the ${AGENT_TIMEOUT}s timeout AFTER writing metadata — partial work may exist on $M_BRANCH; inspect manually"
    return 1
  fi

  pr_url="$(open_pr_from_meta "$n" "$meta_file")" || {
    # The branch is already pushed; the meta file survives at $meta_file so
    # the next run's heal pass retries only the PR-open step.
    add_comment "$n" "$(printf '🤖 Branch `%s` was pushed but the PR could not be opened (see the run log). The next scheduled run will retry the PR step automatically.' "$M_BRANCH")" || true
    add_labels "$n" "$LABEL_FAIL" || true
    ledger "$n" "pr-failed" "$M_BRANCH" "branch pushed, PR open failed"
    return 1
  }
  rm -f "$meta_file"
  log "issue #$n: PR opened: $pr_url"
  ledger "$n" "pr" "$M_BRANCH" "$pr_url"
}

# --- Heal pass --------------------------------------------------------------------
# An issue whose agent/issue-n-* branch exists on origin but has NO open PR.
# If the saved meta file is there, open the PR from it (no session, no cost).
# If not, the branch came from somewhere this pipeline cannot account for —
# surface it and label, never re-implement over it.

heal_pass() {
  while IFS=$'\t' read -r n title; do
    local meta_file="$STATE_DIR/meta/issue-$n.env" pr_url
    log "issue #$n ($title): branch exists with no open PR"
    if [[ -f "$meta_file" ]]; then
      if pr_url="$(open_pr_from_meta "$n" "$meta_file")"; then
        rm -f "$meta_file"
        log "issue #$n: healed — PR opened: $pr_url"
        ledger "$n" "healed" "-" "$pr_url"
        continue
      fi
      log "issue #$n: heal attempt failed"
    else
      log "issue #$n: no saved metadata to heal from"
    fi
    fail_issue "$n" "$RUN_DIR/issue-$n" \
      "a branch agent/issue-$n-* exists on origin with no open PR and no saved metadata — inspect it manually"
  done < "$RUN_DIR/heal.txt"
  return 0
}

# Issues that are in flight as a bare branch only (no open PR): candidates for
# the heal pass. Written by collect_issues' sibling so the queue stays simple.
collect_healable() {
  "$PYTHON_BIN" - "$RUN_DIR/issues.json" "$RUN_DIR/pr_heads.txt" "$RUN_DIR/remote_branches.txt" > "$RUN_DIR/heal.txt" <<'PY'
import json, re, sys

issues = json.load(open(sys.argv[1], encoding="utf-8"))
if not isinstance(issues, list):
    sys.exit(0)
pr_heads = {l.strip() for l in open(sys.argv[2], encoding="utf-8") if l.strip()}
remote = {l.split()[-1].removeprefix("refs/heads/")
          for l in open(sys.argv[3], encoding="utf-8") if l.strip()}
titles = {it["number"]: (it.get("title") or "").replace("\t", " ").strip()
          for it in issues if "pull_request" not in it}

for ref in sorted(remote):
    m = re.fullmatch(r"agent/issue-(\d+)-.+", ref)
    if not m:
        continue
    n = int(m.group(1))
    if n in titles and not any(re.fullmatch(rf"agent/issue-{n}-.+", h) for h in pr_heads):
        print(f"{n}\t{titles[n]}")
PY
}

# --- Run report ---------------------------------------------------------------------
# One issue per run, so GitHub emails the owner exactly once. Skipped entirely
# on an empty run — a quiet day costs nothing and says nothing.

post_run_report() {
  local processed prs failed
  processed="$(wc -l < "$RUN_DIR/ledger.txt")"
  prs="$(awk -F'\t' '$2=="pr" || $2=="healed"' "$RUN_DIR/ledger.txt" | wc -l)"
  failed="$(awk -F'\t' '$2=="failed" || $2=="pr-failed"' "$RUN_DIR/ledger.txt" | wc -l)"
  local report="$RUN_DIR/run-report.md"
  {
    echo "Automated agent run over the open issue board."
    echo
    echo "| Issue | Verdict | Branch | Detail |"
    echo "|---|---|---|---|"
    while IFS=$'\t' read -r n verdict branch detail; do
      # Backticks in a double-quoted string are COMMAND SUBSTITUTION — write
      # the markdown code ticks with printf %s, never inline. A `|` in the
      # detail (agent-written failure reasons are free text) breaks the table.
      detail=${detail//|// }
      printf '| #%s | %s | `%s` | %s |\n' "$n" "$verdict" "$branch" "$detail"
    done < "$RUN_DIR/ledger.txt"
    echo
    # An aborted run says so above the fold, with the evidence inline: the
    # owner reads this issue in email, not the log on the ops box.
    if [[ -n "$RUN_ABORT_REASON" ]]; then
      echo "### ⚠ Run aborted"
      echo
      echo "$RUN_ABORT_REASON"
      echo
      echo "Issues still in the queue were not attempted. Fix the host, then the"
      echo "next scheduled run picks them up — there are no labels to clear."
      if [[ -n "$RUN_ABORT_LOG" && -s "$RUN_ABORT_LOG" ]]; then
        echo
        echo '```'
        tail -30 "$RUN_ABORT_LOG"
        echo '```'
      fi
      echo
    fi
    echo "PRs merge manually; an issue closes when its PR merges (\`Closes #N\`)."
    echo "A failed issue carries the \`$LABEL_FAIL\` label — remove it to retry."
  } > "$report"
  if [[ "${AGENT_DRY_RUN:-0}" == "1" ]]; then
    log "dry run — run-report issue skipped (report at $report)"
    return 0
  fi
  local resp="$RUN_DIR/run-report-response.json"
  # LABEL_SKIP on the report is the other half of the self-cannibalisation
  # fix: the title guard in intake catches the reports already on the board,
  # this keeps every new one out by label as well.
  create_issue "$REPORT_TITLE_PREFIX $(date -u +%F) — ${processed} processed, ${prs} PR(s), ${failed} failed" "$report" "$resp" "$LABEL_SKIP"
  if [[ "$GH_HTTP_CODE" == "201" ]]; then
    log "run report published: $($PYTHON_BIN -c 'import json,sys; print(json.load(open(sys.argv[1]))["html_url"])' "$resp")"
  else
    log "run-report issue FAILED (HTTP $GH_HTTP_CODE): $(head -c 300 "$resp" 2>/dev/null)"
    return 1
  fi
}

# --- Main ------------------------------------------------------------------------------

# The two labels the pipeline's own control flow depends on. Idempotent (422 =
# already there), two API calls a run. This is what makes the wrapper portable:
# pointing it at a new repo no longer needs a manual label-setup step, and the
# `agent-failed` retry button cannot silently be a label that does not exist.
bootstrap_labels() {
  [[ "${AGENT_DRY_RUN:-0}" == "1" ]] && { log "dry run — label bootstrap skipped"; return 0; }
  ensure_label "$LABEL_FAIL" "d93f0b" "agent could not implement; remove this label to retry" || true
  ensure_label "$LABEL_SKIP" "0e8a16" "agent pipeline must never pick this issue up" || true
}

main() {
  local intake_ok=1
  bootstrap_labels
  collect_issues || intake_ok=0
  collect_healable

  local queue_count heal_count rc=0
  queue_count="$(wc -l < "$RUN_DIR/queue.txt")"
  heal_count="$(wc -l < "$RUN_DIR/heal.txt")"
  log "intake: $queue_count eligible issue(s), $heal_count healable branch(es)"

  if [[ "$queue_count" == "0" && "$heal_count" == "0" ]]; then
    if [[ "$intake_ok" == "1" ]]; then
      log "nothing to do — exiting quietly"
      return 0
    fi
    log "intake failed and nothing healable — failing the run (the next one retries)"
    return 1
  fi

  touch "$RUN_DIR/ledger.txt"
  heal_pass
  while IFS=$'\t' read -r n title; do
    run_issue "$n" "$title"
    local issue_rc=$?
    # 2 = environment fault (see install_deps). Every remaining issue would
    # fail for the same reason, so stop instead of commenting on all of them.
    if [[ "$issue_rc" == "2" ]]; then
      log "run aborted: $RUN_ABORT_REASON"
      # Deliberately NOT a ledger row: the counts in the report title are
      # "issues processed", and an environment fault processed none. The
      # abort gets its own section in post_run_report instead.
      rc=1
      break
    fi
    [[ "$issue_rc" == "0" ]] || rc=1
  done < "$RUN_DIR/queue.txt"

  post_run_report || rc=1
  [[ "$intake_ok" == "1" ]] || rc=1
  return "$rc"
}

main "$@"
exit $?
