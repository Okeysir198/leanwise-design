#!/usr/bin/env node
/**
 * lw-template-literals — every `#RRGGBB` in a `.dc.html` template must be a
 * token's value.
 *
 * ## Why this exists
 *
 * The templates are the one surface no gate renders (REVIEW item 2: they need
 * the `<x-dc>` runtime, and `lw-templates.mjs` reads them as text). Two of them
 * were also written in LITERAL hex — a `.dc.html` is styled with inline
 * `style=` attributes, and a deck slide and an email are deliberately
 * theme-free — which made them a SECOND HOME for palette values, the same shape
 * as `email.css`, with one difference that mattered: `email.css` had a two-way
 * literal assertion in `check:contrast` from v3.0.0, and the templates had
 * nothing at all.
 *
 * What that cost, both found the hour this gate was first run:
 *
 *   - `PitchDeck` painted `#7C8AA3`, which is the value `--lw-on-navy-3` held
 *     BEFORE v1.1.3 re-tuned it to `#808DA6` for the same AA hole `--lw-text-3`
 *     had. A token moved and its copy did not, for eleven releases.
 *   - `Email`'s footer line painted `#8A94A6` on the `#F7F6F5` backdrop —
 *     **2.83:1 at 11.5px**, below AA. No gate here could see it: `check:contrast`
 *     evaluated tokens and `email.css`, `check:a11y` renders cards and not
 *     templates, and `check:visual` shoots what is there rather than judging it.
 *
 * Neither is exotic. Both are what a literal does when nothing compares it to
 * the thing it was copied from.
 *
 * ⚠ **Both of those templates were removed at v4.0.0, so the tree it guards now
 * holds ZERO literals.** That is not a reason to delete the gate — it is the
 * state the gate exists to keep. The floor moved from "40 literals read" to
 * "10 templates read" so a clean tree passes and a broken glob still fails, and
 * the self-test plants a literal rather than corrupting one.
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
 * Only `*.dc.html` is read. That rule was written for `deck-stage.js`, which was
 * vendored, `@ds-adherence-ignore` on line 1, and overwritten by the next
 * `copy_starter_component` (REVIEW item 4); it went with `pitch-deck` at
 * v4.0.0, and the rule stands for the next vendored file that arrives.
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

/* A gate that reads nothing reports clean — so the floor is the number of
   TEMPLATES read, not the number of literals found.
   
   It was literals until v4.0.0, which removed `email` and `pitch-deck` — the
   only two templates that painted in hex. Every remaining template paints
   entirely from tokens, so the honest literal count is now ZERO, and a floor of
   40 would have failed a clean tree. Zero literals is a pass; a glob that stops
   finding templates is not, and neither is a literal that matches no token. */
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
  /* PLANT a literal rather than corrupt one. Until v4.0.0 this bumped an
     existing hex by a channel — the shape both real findings had — but the two
     templates that carried hex went with that release, so there is nothing left
     to corrupt and "no literal to corrupt" reads exactly like a broken gate.
     Injecting into the `<body` of the first template exercises the same path:
     read the file, match the hex, fail to account for it. */
  const [first] = templateFiles();
  if (!first) {
    console.error("lw-template-literals --self-test: no templates found at all.");
    process.exit(1);
  }
  const PLANT = "#ABCDEF";  // not a token value in any scope, and not exempt
  const src = readFileSync(first[1], "utf8");
  const at = /<body[^>]*>/.exec(src);
  if (!at) {
    console.error(`lw-template-literals --self-test: ${first[0]} has no <body> to plant in.`);
    process.exit(1);
  }
  const dirty = run({ inject: { file: first[0], find: at[0], replace: `${at[0]}<i style="color:${PLANT}"></i>` } });
  if (!dirty.problems.length) {
    console.error(`lw-template-literals --self-test: FAILED — ${PLANT} planted in ${first[0]} was not caught.`);
    process.exit(1);
  }
  console.log(`lw-template-literals --self-test: a planted ${PLANT} in ${first[0]} is caught.`);
  process.exit(0);
}

const r = run();
process.exit(report("lw-template-literals", {
  problems: r.problems,
  checked: r.files,
  minChecked: MIN_TEMPLATES,
  summary: `lw-template-literals: OK — ${r.literals} hex literal(s) across ${r.files} template(s), every one a token's value` +
    (Object.keys(TEMPLATE_HEX_EXEMPT).length ? ` (${Object.keys(TEMPLATE_HEX_EXEMPT).length} documented exemption(s))` : "") +
    dim(` · ${r.tokens} distinct token colours`),
  footer: "A literal is a second home. The gate that keeps one honest is a comparison against the value it was copied from.",
}));
