#!/usr/bin/env node
/**
 * TWO STATIC RULES ABOUT CONTROLS, both written after a bug that shipped for
 * eleven releases and that no other gate in this package could see.
 *
 * ── RULE 1 · not-allowed IMPLIES pointer ────────────────────────────────────
 * `.lw-btn:disabled { cursor: not-allowed }` had been in base.css since v1.0.
 * `.lw-btn { cursor: pointer }` never was — the pointer-affordance block stated,
 * in a comment, that "<button> and a[href] get the pointer from the UA", and
 * that is only true of the link. Every UA sheet gives a button `cursor: default`.
 * So the most-clicked class in the package read as inert text under the mouse in
 * all seven consumers, and the reason nobody looked is that the COMMENT WAS THE
 * AUDIT. A cursor is also the one thing `check:visual` structurally cannot catch:
 * it is not in the screenshot.
 *
 * The rule generalises the fix rather than pinning it. Bothering to mark a class
 * `not-allowed` when disabled is an admission that it is a CONTROL; a control
 * that is a pointer target when disabled and not when enabled is backwards. The
 * only exceptions are controls you type into, where the UA's text caret is right
 * and a pointer would be a lie — those are named in TEXT_ENTRY, one line each.
 *
 * ── RULE 2 · a state rule must not WIPE a decoration ────────────────────────
 * `.lw-input:disabled, .lw-textarea:disabled, .lw-select:disabled { background:
 * var(--lw-bg-muted); … }`. The shorthand resets `background-image` too, and the
 * one control in that list that HAS an image is the select's chevron — so a
 * disabled select lost its arrow entirely and, with `appearance: none` also
 * suppressing the platform one, rendered as a disabled TEXT INPUT. Two controls a
 * user cannot tell apart, from a one-word difference in a declaration only ever
 * meant to set a fill.
 *
 * So: a class that declares `background-image` may not be re-declared later with
 * a `background:` shorthand that carries no image component. `background: none`
 * IS an image component — deliberately clearing one is allowed and says so.
 *
 * Usage: node tools/lw-affordance.mjs [--self-test]
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { splitRules, splitSelectorList, stripComments } from "./_css.mjs";
import { report } from "./_report.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SHEETS = ["base.css", "product.css", "marketing.css"];

/**
 * Controls you TYPE INTO. The UA's text caret is the correct affordance and a
 * pointer over one would promise a click that does nothing, so `not-allowed` on
 * the disabled form does not imply `pointer` on the enabled one.
 *
 * Anything added here needs the sentence, not just the name — the whole failure
 * this gate exists for was an unexamined claim about a cursor.
 */
const TEXT_ENTRY = new Set([
  "lw-input", // the text field itself; UA caret
  "lw-textarea", // ditto, multi-line
  "lw-combo", // a filter box that happens to open a list — product.css sets cursor: text on it
]);

/** `cursor: <value>` in a rule body, ignoring custom properties. */
function cursorIn(body) {
  const m = /(?:^|[;{\s])cursor\s*:\s*([a-z-]+)/.exec(body);
  return m ? m[1] : null;
}

/**
 * The `.lw-*` classes a rule is actually STYLING — the subject of each selector,
 * which is its rightmost compound and nothing to its left.
 *
 * `.lw-band-dark .lw-kpi` styles the KPI, not the band. Reading every class in
 * the selector instead reported 28 problems on a clean tree, all of them a dark
 * scope "wiping" a decoration belonging to some unrelated class that merely
 * appeared first in the same selector — a gate that cries wolf about the file's
 * most common idiom is one people learn to skip.
 *
 * A selector whose subject carries a PSEUDO-ELEMENT is skipped outright: `::after`
 * is its own box with its own background, so neither rule here is about it.
 */
function subjectClassesIn(prelude) {
  const out = new Map();
  for (const sel of splitSelectorList(prelude)) {
    const compound = sel.trim().split(/\s+|(?=>)|(?=\+)|(?=~)/).filter(Boolean).pop() ?? "";
    if (/::[a-z-]+/.test(compound)) continue;
    for (const m of compound.matchAll(/\.(lw-[a-z0-9-]+)/g)) {
      // QUALIFIED = the subject carries a state on top of the class — `:disabled`,
      // `[aria-invalid]`, `:hover`. It matters because such a rule OUTRANKS the
      // bare class no matter where it sits in the file, and the select bug this
      // gate was written for is exactly that shape: `.lw-select:disabled` is 20
      // lines ABOVE `.lw-select`, and won anyway.
      const qualified = /[:[]/.test(compound.replace(/^.*?\.lw-[a-z0-9-]+/, ""));
      out.set(m[1], (out.get(m[1]) ?? false) || qualified);
    }
  }
  return out;
}

/**
 * Does a `background:` shorthand value carry an <image> component? `none`, a
 * `url()`, and any `*-gradient()` all do; a bare colour or var() does not.
 *
 * Erring toward "carries one" is the safe direction: a false NEGATIVE here is a
 * missed report, a false positive is a gate nobody can satisfy.
 */
function shorthandCarriesImage(value) {
  return /\bnone\b|\burl\s*\(|gradient\s*\(|\bimage-set\s*\(/.test(value);
}

function analyse(sources) {
  const problems = [];
  // Class -> the cursor keywords declared for it, in source order.
  const cursors = new Map();
  // Class -> where it first declared a background-image.
  const imaged = new Map();
  // Rules that set the `background:` shorthand without an image, in source order.
  const wipes = [];
  let cursorDecls = 0;

  for (const { file, text } of sources) {
    const rules = splitRules(stripComments(text));
    rules.forEach((rule, index) => {
      if (rule.selector.startsWith("@")) return;
      const body = rule.directBody ?? rule.body;
      const classes = subjectClassesIn(rule.selector);
      if (!classes.size) return;

      const cursor = cursorIn(body);
      if (cursor) {
        cursorDecls += 1;
        for (const c of classes.keys()) {
          if (!cursors.has(c)) cursors.set(c, new Set());
          cursors.get(c).add(cursor);
        }
      }

      // Only a rule that targets the class WITHOUT a state can be its base
      // declaration; `.lw-select:disabled` declaring an image would not restore
      // the enabled one.
      if (/(?:^|[;{\s])background-image\s*:/.test(body)) {
        for (const [c, qualified] of classes) {
          if (!qualified && !imaged.has(c)) imaged.set(c, { file, index });
        }
      }

      const shorthand = /(?:^|[;{\s])background\s*:\s*([^;}]+)/.exec(body);
      if (shorthand && !shorthandCarriesImage(shorthand[1])) {
        wipes.push({ file, index, selector: rule.selector.trim(), classes });
      }
    });
  }

  // RULE 1.
  for (const [cls, values] of cursors) {
    if (!values.has("not-allowed")) continue;
    if (TEXT_ENTRY.has(cls)) continue;
    if (values.has("pointer")) continue;
    problems.push(
      `.${cls} is \`cursor: not-allowed\` when disabled but never \`cursor: pointer\` when it is not. ` +
        "A class worth marking not-allowed is a control; give it the pointer, or name it in " +
        "TEXT_ENTRY with the reason a caret is right.",
    );
  }

  // RULE 2.
  for (const wipe of wipes) {
    for (const [cls, qualified] of wipe.classes) {
      const base = imaged.get(cls);
      if (!base) continue;
      // Does the shorthand actually WIN? Two ways it can: it outranks the base
      // rule on specificity (a state on the subject), or it merely comes later.
      // Order alone was the first version of this check and it let the bug that
      // prompted the gate straight through — `.lw-select:disabled` sits ABOVE
      // `.lw-select` in base.css and beat it on specificity from up there.
      const later =
        base.file === wipe.file ? wipe.index > base.index : SHEETS.indexOf(wipe.file) > SHEETS.indexOf(base.file);
      if (!qualified && !later) continue;
      problems.push(
        `${wipe.file}: \`${wipe.selector}\` sets the \`background:\` SHORTHAND, which resets ` +
          `background-image — and .${cls} declares one (${base.file}). Use \`background-color:\`, ` +
          "or say `none` if wiping the image is the intent.",
      );
    }
  }

  return { problems, checked: cursorDecls + imaged.size };
}

const sources = SHEETS.map((file) => ({ file, text: readFileSync(join(ROOT, file), "utf8") }));

if (process.argv.includes("--self-test")) {
  /* A gate nobody has watched fail is a gate nobody should trust — and both of
     these faults passed every other gate in the package for eleven releases, so
     "it reports nothing" is exactly the answer that must be proven wrong. */
  const injected = [
    { file: "base.css", text: ".lw-canary { color: red } .lw-canary:disabled { cursor: not-allowed }" },
    {
      file: "product.css",
      text: ".lw-canary-two { background-image: url(x.svg) } .lw-canary-two:disabled { background: grey }",
    },
  ];
  const { problems } = analyse(injected);
  const sawRule1 = problems.some((p) => p.includes("lw-canary ") || p.includes(".lw-canary is"));
  const sawRule2 = problems.some((p) => p.includes("lw-canary-two"));
  if (!sawRule1 || !sawRule2) {
    console.error(`lw-affordance --self-test FAILED: rule1=${sawRule1} rule2=${sawRule2}`);
    console.error(problems.map((p) => "  - " + p).join("\n"));
    process.exit(1);
  }
  console.log("lw-affordance --self-test: both rules catch their injected fault.");
  process.exit(0);
}

const { problems, checked } = analyse(sources);
process.exit(
  report("lw-affordance", {
    problems,
    checked,
    // The three sheets carry ~50 cursor declarations and a handful of
    // background-image bases. Reading under 20 means the parser stopped matching.
    minChecked: 20,
    summary: `lw-affordance: ${checked} control declarations across ${SHEETS.length} sheets — no wrong cursor, no wiped decoration.`,
    footer: "See the header of tools/lw-affordance.mjs for what each rule is guarding against.",
  }),
);
