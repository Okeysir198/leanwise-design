#!/usr/bin/env node
/**
 * lw-template-literals — every `#RRGGBB` in a `.dc.html` template must be a
 * token's value.
 *
 * ## Why this exists
 *
 * The twelve templates are the one surface no gate renders (REVIEW item 2:
 * they need the `<x-dc>` runtime, and `lw-templates.mjs` reads them as text).
 * They are also, unavoidably, written in LITERAL hex — a `.dc.html` is styled
 * with inline `style=` attributes, and several are deliberately theme-free
 * (a deck slide, an email). So they are a SECOND HOME for palette values, the
 * same shape as `email.css`, with one difference that mattered: `email.css`
 * has had a two-way literal assertion in `check:contrast` since v3.0.0, and
 * the templates had nothing at all.
 *
 * What that cost, both found the hour this gate was first run:
 *
 *   - `PitchDeck` painted `#7C8AA3`, which is the value `--lw-on-navy-3` held
 *     BEFORE v1.1.3 re-tuned it to `#808EA6` for the same AA hole `--lw-text-3`
 *     had. A token moved and its copy did not, for eleven releases.
 *   - `Email`'s footer line painted `#8A94A6` on the `#F7F6F5` backdrop —
 *     **2.83:1 at 11.5px**, below AA. No gate here could see it: `check:contrast`
 *     evaluates tokens and `email.css`, `check:a11y` renders cards and not
 *     templates, and `check:visual` shoots what is there rather than judging it.
 *
 * Neither is exotic. Both are what a literal does when nothing compares it to
 * the thing it was copied from.
 *
 * ## What it asserts, and what it deliberately does not
 *
 * ASSERTS: every hex literal in every `templates/<name>/*.dc.html` equals the
 * resolved value of some token, in some theme scope, or is named in
 * `TEMPLATE_HEX_EXEMPT` with the reason it is not a token.
 *
 * DOES NOT assert the inverse (that every token appears in a template) — that
 * is the half `email.css` needs, because email.css is a full palette copy. A
 * template paints the handful of colours its own design uses; requiring the
 * whole palette in each would be nonsense.
 *
 * DOES NOT assert that the literal is the RIGHT token for its context — that a
 * ground is `--lw-bg-subtle` rather than `--lw-bg-muted` is a judgement, and
 * REVIEW's standing note is that a judgement about a relationship needs an eye
 * or a fixture, not a rule. This gate catches the mechanical half: a value that
 * matches nothing in the system at all.
 *
 * ## Source of truth
 *
 * `tokens.json`, not `tokens.css` — it is generated FROM tokens.css and
 * `check:themes` fails when it is stale, so reading it here adds no parser and
 * no second home. Every scope in the file contributes (`base`, `dark`, …): a
 * deck slide legitimately paints a dark-scope value on a light page, so the
 * accepted set is the union, and narrowing it per template would need to know
 * which ground each element sits on — see "does not assert", above.
 *
 * `templates/pitch-deck/deck-stage.js` is NOT read: it is vendored, carries
 * `@ds-adherence-ignore` on line 1, and the next `copy_starter_component`
 * overwrites it (REVIEW item 4). Only `*.dc.html` is ours to hold.
 *
 *   node tools/lw-template-literals.mjs
 *   node tools/lw-template-literals.mjs --self-test   # plant a fault, expect red
 */

import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { hslToRgb } from "./_color.mjs";
import { report, dim } from "./_report.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TEMPLATES = join(ROOT, "templates");

/* Hex values that are deliberately NOT a token, each with the reason. Keep it
   greppable and keep it short: an entry here is a value the design system has
   decided it does not own, not a value someone could not be bothered to move.
   Empty is the honest state today — both literals this gate found on its first
   run were defects, and both were fixed rather than exempted. */
const TEMPLATE_HEX_EXEMPT = {
  // "#RRGGBB": "why this is not a token",
};

/* A gate that reads nothing reports clean. The tree has twelve templates and
   ~80 literals; these floors are well under that and exist to catch a glob or a
   regex that has silently stopped matching, not to encode the current counts. */
const MIN_LITERALS = 40;
const MIN_TEMPLATES = 10;

const norm = (h) => {
  const v = h.replace("#", "").toUpperCase();
  return "#" + (v.length === 3 ? v.split("").map((c) => c + c).join("") : v);
};

const tripleToHex = (value) => {
  const m = /^\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*$/.exec(value);
  if (!m) return null;
  const { r, g, b } = hslToRgb(+m[1], +m[2], +m[3]);
  return norm([r, g, b].map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join(""));
};

/* Every colour a token resolves to, mapped back to the token path so a failure
   can say what the value SHOULD have been called. Three spellings appear in
   tokens.json: the bare channel triple (the authored form), `hsl(H S% L%)`, and
   a literal hex (the artwork and chart values, which have no `-c` sibling). */
function tokenHexes() {
  const tokens = JSON.parse(readFileSync(join(ROOT, "tokens.json"), "utf8"));
  const byHex = new Map();
  const add = (hex, path) => { if (hex && !byHex.has(hex)) byHex.set(hex, path); };

  const walk = (node, path) => {
    if (!node || typeof node !== "object") return;
    if (typeof node.$value === "string") {
      const v = node.$value.trim();
      const name = path.join(".");
      if (/^#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?$/.test(v)) add(norm(v), name);
      else add(tripleToHex(v.replace(/^hsl\(([^)]*)\)$/i, "$1")), name);
      return;
    }
    for (const k of Object.keys(node)) walk(node[k], [...path, k]);
  };
  walk(tokens, []);
  return byHex;
}

function templateFiles() {
  const out = [];
  for (const d of readdirSync(TEMPLATES, { withFileTypes: true })) {
    if (!d.isDirectory() || d.name === "_shared") continue;
    for (const f of readdirSync(join(TEMPLATES, d.name))) {
      if (f.endsWith(".dc.html")) out.push([`templates/${d.name}/${f}`, join(TEMPLATES, d.name, f)]);
    }
  }
  return out;
}

function run({ inject } = {}) {
  const byHex = tokenHexes();
  const files = templateFiles();
  const problems = [];
  let literals = 0;

  for (const [rel, abs] of files) {
    let src = readFileSync(abs, "utf8");
    if (inject && rel === inject.file) src = src.replace(inject.find, inject.replace);

    const seen = new Map();
    for (const m of src.matchAll(/#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})\b/g)) {
      literals++;
      const hex = norm(m[1]);
      if (byHex.has(hex) || hex in TEMPLATE_HEX_EXEMPT) continue;
      seen.set(hex, (seen.get(hex) ?? 0) + 1);
    }
    for (const [hex, n] of seen) {
      problems.push(
        `${rel} paints ${hex}${n > 1 ? ` (${n}×)` : ""}, which is not any token's value in any scope. ` +
        `Either it is a token that MOVED and this copy did not — check tokens.css for its old value — ` +
        `or it is a colour the system does not own, in which case add it to TEMPLATE_HEX_EXEMPT with the reason.`,
      );
    }
  }

  return {
    problems,
    literals,
    files: files.length,
    tokens: byHex.size,
  };
}

/* --self-test: plant the exact defect this gate was written for — a token value
   nudged by one channel, the shape both real findings had — and require red.
   A gate nobody has watched fail is a hypothesis, not a gate (CLAUDE.md). */
if (process.argv.includes("--self-test")) {
  const clean = run();
  if (clean.problems.length) {
    console.error("lw-template-literals --self-test: the tree is already failing; fix that first.");
    process.exit(1);
  }
  /* The FIRST template carrying a 6-digit literal, not the first template:
     `ai-app-shell` sorts first and paints entirely from tokens, so anchoring on
     it made the self-test fail for the best possible reason and read exactly
     like a broken gate. */
  let first = null, hex = null;
  for (const f of templateFiles()) {
    const m = /#([0-9A-Fa-f]{6})\b/.exec(readFileSync(f[1], "utf8"));
    if (m) { first = f; hex = m; break; }
  }
  if (!hex) {
    console.error("lw-template-literals --self-test: no 6-digit literal anywhere to corrupt — the fixture assumption is stale.");
    process.exit(1);
  }
  const bumped = "#" + (parseInt(hex[1], 16) + 1).toString(16).padStart(6, "0").toUpperCase();
  const dirty = run({ inject: { file: first[0], find: hex[0], replace: bumped } });
  if (!dirty.problems.length) {
    console.error(`lw-template-literals --self-test: FAILED — ${hex[0]} -> ${bumped} in ${first[0]} was not caught.`);
    process.exit(1);
  }
  console.log(`lw-template-literals --self-test: a one-channel drift in ${first[0]} is caught.`);
  process.exit(0);
}

const r = run();
/* Two ways to read nothing, so two floors. `report`'s minChecked covers the
   regex; a glob that stops finding templates would also drop the literal count,
   but not necessarily below MIN_LITERALS — one big template could carry it. */
if (r.files < MIN_TEMPLATES) {
  r.problems.unshift(
    `only ${r.files} template(s) found under templates/ (expected at least ${MIN_TEMPLATES}) — ` +
    "the directory walk is reading nothing; fix it rather than this number.",
  );
}
process.exit(report("lw-template-literals", {
  problems: r.problems,
  checked: r.literals,
  minChecked: MIN_LITERALS,
  summary: `lw-template-literals: OK — ${r.literals} hex literal(s) across ${r.files} template(s), every one a token's value` +
    (Object.keys(TEMPLATE_HEX_EXEMPT).length ? ` (${Object.keys(TEMPLATE_HEX_EXEMPT).length} documented exemption(s))` : "") +
    dim(` · ${r.tokens} distinct token colours`),
  footer: "A literal is a second home. The gate that keeps one honest is a comparison against the value it was copied from.",
}));
