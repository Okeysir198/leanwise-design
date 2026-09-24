#!/usr/bin/env node
/**
 * Pointer-affordance gate. A cursor is invisible to every screenshot gate, so
 * it is asserted statically.
 *
 *   RULE 1  theme.css's base layer gives `cursor: pointer` to every native and
 *           ARIA control in REQUIRED (UA sheets give a <button> `default`).
 *   RULE 2  a marketing.css class whose OWN subject reacts to :hover is a click
 *           target, so it must state `cursor: pointer` — unless the subject is an
 *           <a>/<button>, which RULE 1 already covers.
 *   RULE 3  a class marked `cursor: not-allowed` is a control, so it must also
 *           state `cursor: pointer`.
 *
 * Usage: node scripts/affordance.mjs [--self-test]
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { splitRules, splitSelectorList, stripComments } from "./lib/css.mjs";
import { report } from "./lib/report.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const REQUIRED = [
  "button:not(:disabled)",
  '[role="button"]:not([aria-disabled="true"])',
  '[role="tab"]',
  '[role="menuitem"]',
  '[role="option"]',
  "a[href]",
  "summary",
  "select",
  "label[for]",
];

const cursorIn = (body) => /(?:^|[;{\s])cursor\s*:\s*([a-z-]+)/.exec(body)?.[1] ?? null;
const norm = (s) => s.replace(/\s+/g, "").replace(/'/g, '"');

/** Flatten rules, descending into @layer / @media blocks. */
function rulesOf(text) {
  const out = [];
  const walk = (src) => {
    for (const r of splitRules(src)) {
      if (r.selector.startsWith("@")) { if (/^@(layer|media|supports)/.test(r.selector)) walk(r.body); continue; }
      out.push(r);
    }
  };
  walk(stripComments(text));
  return out;
}

function subjectOf(sel) {
  return sel.trim().split(/\s+|(?=>)|(?=\+)|(?=~)/).filter((t) => t && !/^[>+~]$/.test(t)).pop()?.replace(/^[>+~]/, "") ?? "";
}

export function analyse({ theme, marketing }) {
  const problems = [];
  let checked = 0;

  // RULE 1
  const pointerSelectors = new Set();
  for (const r of rulesOf(theme)) {
    if (cursorIn(r.directBody ?? r.body) === "pointer") for (const s of splitSelectorList(r.selector)) pointerSelectors.add(norm(s));
  }
  for (const req of REQUIRED) {
    checked++;
    if (!pointerSelectors.has(norm(req))) problems.push(`theme.css: \`${req}\` is not given \`cursor: pointer\` in the base layer`);
  }

  // RULES 2 + 3
  const cursors = new Map();
  const hovered = new Map();
  for (const r of rulesOf(marketing)) {
    const cursor = cursorIn(r.directBody ?? r.body);
    for (const sel of splitSelectorList(r.selector)) {
      const subj = subjectOf(sel);
      if (/::/.test(subj)) continue;
      const classes = [...subj.matchAll(/\.(lw-[a-z0-9-]+)/g)].map((m) => m[1]);
      const native = /^(a|button|summary)\b/.test(subj);
      for (const c of classes) {
        if (cursor) { checked++; (cursors.get(c) ?? cursors.set(c, new Set()).get(c)).add(cursor); }
        if (/:hover/.test(subj) && !native) hovered.set(c, sel.trim());
      }
    }
  }
  for (const [c, sel] of hovered) {
    checked++;
    if (!cursors.get(c)?.has("pointer")) problems.push(`marketing.css: \`${sel}\` reacts to hover but .${c} never states \`cursor: pointer\``);
  }
  for (const [c, v] of cursors) {
    if (v.has("not-allowed") && !v.has("pointer")) problems.push(`marketing.css: .${c} is \`not-allowed\` when disabled but never \`pointer\``);
  }
  return { problems, checked };
}

if (process.argv.includes("--self-test")) {
  const theme = '@layer base { button:not(:disabled), a[href] { cursor: pointer; } }';
  const marketing = ".lw-canary:hover { color: red } .lw-canary-two:disabled { cursor: not-allowed }";
  const { problems } = analyse({ theme, marketing });
  const ok1 = problems.some((p) => p.includes('`summary`'));
  const ok2 = problems.some((p) => p.includes(".lw-canary never"));
  const ok3 = problems.some((p) => p.includes(".lw-canary-two is"));
  console.log(`  ${ok1 ? "ok  " : "FAIL"} a control missing from theme.css's pointer list is caught`);
  console.log(`  ${ok2 ? "ok  " : "FAIL"} a hover-reactive class without a pointer is caught`);
  console.log(`  ${ok3 ? "ok  " : "FAIL"} not-allowed without pointer is caught`);
  process.exit(ok1 && ok2 && ok3 ? 0 : 1);
}

const read = (f) => readFileSync(join(ROOT, f), "utf8");
const { problems, checked } = analyse({ theme: read("theme.css"), marketing: read("marketing.css") });
process.exit(report("affordance", {
  problems,
  checked,
  minChecked: REQUIRED.length + 2,
  summary: `affordance: ${checked} pointer checks across theme.css + marketing.css`,
  footer: "See the header of scripts/affordance.mjs.",
}));
