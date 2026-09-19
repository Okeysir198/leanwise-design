#!/usr/bin/env node
/**
 * Emit a SUBSET of the token core for consumers that cannot import.
 *
 *   node tools/lw-subset.mjs --manifest=path/tokens.manifest.json
 *   node tools/lw-subset.mjs --manifest=… --format=ts --out=src/ui/tokens.gen.ts
 *
 * ## Why this exists alongside lw-inline
 *
 * `lw-inline` answers the single-file artifact: a report, a briefing, a takeaway
 * deck. One render, one reader, size irrelevant. It emits the token core VERBATIM,
 * ~80 KB, of which ~58 KB is this package's own block prose.
 *
 * A Cloudflare Worker serving a `no-store` page is the same supply chain — no npm at
 * runtime, no bundler, hand-written HTML — with one difference that changes the
 * arithmetic: the bytes ship again on EVERY request. Inlining the verbatim core takes
 * msg-worker's manage page from 31 KB to ~115 KB, forever, to carry essays no browser
 * reads. Told that, an author does what the SOP report's author did and retypes thirty
 * values by hand. That is the failure this package already conceded once.
 *
 * ## What it keeps from lw-inline, exactly
 *
 * - GENERATED, never typed. That is the whole argument.
 * - The SAME `tokens.css sha256:` digest, over the whole unmodified file, so a subset
 *   and a verbatim copy are diffable against a later release by one parser.
 * - Token core ONLY — never a component layer.
 * - Every RETAINED token's own trailing comment. `lw-inline` rejects comment-STRIPPING
 *   ("the comments are where the reasoning lives"), and that rejection is honoured
 *   here: the reasons that govern a value the app ships travel with it. What is
 *   dropped is the block prose ABOUT values the app does not ship, which lives in
 *   README and is reachable at full fidelity through the digest.
 *
 * ## What it adds
 *
 * A `selection sha256:` over the sorted seed list. Without it, two subsets of one
 * source are indistinguishable and "the artifact is stale" looks exactly like "the
 * manifest changed".
 *
 * ⚠️ The parser is DECLARATION-level, not line-level, because tokens.css packs several
 * declarations per line (`--lw-space-4: 4px;  --lw-space-8: 8px;`). A line-based
 * extractor mis-parses those and ships silently wrong output.
 */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));

process.stdout.on("error", (e) => { if (e.code === "EPIPE") process.exit(0); throw e; });

const args = process.argv.slice(2);
const val = (f) => {
  const hit = args.find((a) => a.startsWith(`${f}=`));
  return hit ? hit.slice(f.length + 1) : null;
};

// ── Parser ────────────────────────────────────────────────────────────────────────
// Comment-aware throughout: tokens.css carries 320 backticks and prose containing
// braces, so any scan that does not skip /* */ will mis-nest.

function skipComment(css, i) {
  if (css[i] === "/" && css[i + 1] === "*") {
    const close = css.indexOf("*/", i + 2);
    return close < 0 ? css.length : close + 2;
  }
  return -1;
}

function matchBrace(css, open) {
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    const j = skipComment(css, i);
    if (j >= 0) { i = j - 1; continue; }
    if (css[i] === "{") depth++;
    else if (css[i] === "}") { depth--; if (depth === 0) return i; }
  }
  return css.length;
}

/** Declarations inside one block, each with its own trailing comment. */
function parseDecls(inner) {
  const decls = [];
  let i = 0, buf = "";
  while (i < inner.length) {
    const j = skipComment(inner, i);
    if (j >= 0) { buf += inner.slice(i, j); i = j; continue; }
    if (inner[i] === ";") {
      // Comments on the same line AFTER the semicolon belong to this declaration.
      // ⚠️ There can be MORE THAN ONE: tokens.css writes
      //   `--lw-sys-mac-red-c: 4.0 100% 67.5%; /* @kind color */    /* #FF5F57 */`
      // and stopping at the first leaves the second to be swallowed by the next
      // declaration's buffer.
      let k = i + 1, trailing = "";
      i = i + 1;
      for (;;) {
        while (k < inner.length && (inner[k] === " " || inner[k] === "\t")) k++;
        const c = skipComment(inner, k);
        if (c < 0) break;
        trailing += " " + inner.slice(k, c).trim();
        i = c; k = c;
      }
      // ⚠️ Strip comments BEFORE matching. A preceding block comment lands in `buf`,
      // and those comments quote token names with colons — `--lw-z-raised: these
      // never compete with page furniture` — so a leftmost match binds the PROSE and
      // the real declaration is dropped. That silently lost two tokens until the
      // round-trip test caught it.
      const code = buf.replace(/\/\*[\s\S]*?\*\//g, " ");
      const m = code.match(/(--[A-Za-z0-9_-]+)\s*:\s*([^;]*)$/);
      if (m) decls.push({ name: m[1], value: m[2].trim(), text: `${m[1]}: ${m[2].trim()};${trailing}` });
      buf = "";
      continue;
    }
    buf += inner[i]; i++;
  }
  return decls;
}

function parseBlocks(css) {
  const nodes = [];
  let i = 0, buf = "";
  while (i < css.length) {
    const j = skipComment(css, i);
    if (j >= 0) { buf += css.slice(i, j); i = j; continue; }
    if (css[i] === "{") {
      const close = matchBrace(css, i);
      const prelude = buf.replace(/\/\*[\s\S]*?\*\//g, "").trim();
      const inner = css.slice(i + 1, close);
      if (/^@/.test(prelude)) nodes.push({ kind: "at", prelude, children: parseBlocks(inner) });
      else nodes.push({ kind: "rule", prelude, decls: parseDecls(inner) });
      buf = ""; i = close + 1; continue;
    }
    if (css[i] === ";") { buf = ""; i++; continue; }
    buf += css[i]; i++;
  }
  return nodes;
}

// ── Closure ───────────────────────────────────────────────────────────────────────
const VAR_RE = /var\(\s*(--[A-Za-z0-9_-]+)/g;

function collect(nodes, into) {
  for (const n of nodes) {
    if (n.kind === "at") collect(n.children, into);
    else for (const d of n.decls) (into[d.name] ||= []).push(d);
  }
  return into;
}

function closure(seeds, byName) {
  const want = new Set(seeds);
  const queue = [...seeds];
  while (queue.length) {
    const name = queue.pop();
    for (const d of byName[name] || []) {
      for (const m of d.value.matchAll(VAR_RE)) {
        if (!want.has(m[1])) { want.add(m[1]); queue.push(m[1]); }
      }
    }
  }
  return want;
}

// ── Emit ──────────────────────────────────────────────────────────────────────────
function emit(nodes, want, drop, indent = "") {
  const out = [];
  for (const n of nodes) {
    if (n.kind === "at") {
      const inner = emit(n.children, want, drop, indent + "  ");
      if (inner.length) out.push(`${indent}${n.prelude} {`, ...inner, `${indent}}`);
    } else {
      if (drop.some((re) => re.test(n.prelude))) continue;
      const keep = n.decls.filter((d) => want.has(d.name));
      if (keep.length) {
        out.push(`${indent}${n.prelude} {`, ...keep.map((d) => `${indent}  ${d.text}`), `${indent}}`);
      }
    }
  }
  return out;
}

// ── Main ──────────────────────────────────────────────────────────────────────────
const manifestPath = val("--manifest");
if (!manifestPath) {
  console.error("lw-subset: --manifest=<path to tokens.manifest.json> is required.");
  process.exit(1);
}
const manifest = JSON.parse(readFileSync(resolve(manifestPath), "utf8"));
const seeds = [...new Set(manifest.seeds || [])].sort();
if (!seeds.length) { console.error("lw-subset: manifest has no seeds."); process.exit(1); }

const tokens = readFileSync(join(ROOT, "tokens.css"), "utf8");
const digest = createHash("sha256").update(tokens).digest("hex").slice(0, 12);
const selection = createHash("sha256").update(seeds.join("\n")).digest("hex").slice(0, 12);

const tree = parseBlocks(tokens);
const byName = collect(tree, Object.create(null));

const missing = seeds.filter((s) => !byName[s]);
if (missing.length) {
  console.error(`lw-subset: ${missing.length} seed(s) do not exist in @leanwise/design v${pkg.version}:`);
  for (const m of missing) console.error(`  ${m}`);
  console.error("Fix the manifest. A seed that does not resolve is a value the app invents.");
  process.exit(1);
}

const want = closure(seeds, byName);
const drop = (manifest.dropScopePatterns || []).map((p) => new RegExp(p));
const body = emit(tree, want, drop);

const banner = [
  "/* =============================================================================",
  `   @leanwise/design v${pkg.version} — token SUBSET, vendored inline.`,
  `   tokens.css sha256:${digest}`,
  `   selection sha256:${selection}  (${seeds.length} seeds -> ${want.size} tokens)`,
  "",
  "   GENERATED by `lw-subset`. Do not edit these values by hand: the digests above",
  "   are the only thing that can tell a later reader whether this block still",
  "   matches the package. Re-run the generator instead, and diff.",
  "",
  "   Vendored because this consumer cannot import — a Worker serving hand-written",
  "   HTML with no bundler, whose bytes ship again on every request. Every OTHER",
  "   kind of consumer must depend on the package: see README §Install.",
  "",
  "   Seeds (the design decision; everything else is the transitive var() closure):",
  ...seeds.map((s) => `     ${s}`),
  "   ============================================================================= */",
  "",
];

const css = [...banner, ...body, ""].join("\n");
const format = val("--format") || "css";
let output = css;
if (format === "ts") {
  // ⚠️ tokens.css contains backticks (320 of them) and no `${`. Escape both anyway:
  // an unescaped backtick truncates the literal, which is how a console once shipped
  // a half-stylesheet that still compiled.
  const escaped = css.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
  output = `// GENERATED by lw-subset — do not edit by hand. Run \`npm run tokens\`.\nexport const LW_TOKENS = \`${escaped}\`;\n`;
}

const dest = val("--out");
if (dest) { writeFileSync(resolve(dest), output); console.error(`lw-subset: wrote ${dest} (${output.length} bytes, ${want.size} tokens)`); }
else process.stdout.write(output);
