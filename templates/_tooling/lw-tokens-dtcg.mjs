#!/usr/bin/env node
/**
 * tokens.css → tokens.json (DTCG), for Tokens Studio in Figma.
 *
 * ONE generator, no hand-maintained second copy — the same discipline as the
 * logo SVGs being generated from tokens rather than hand-edited. Designers PULL
 * from this; nothing pushes back into code.
 *
 * It also fails the build on a token that exists in one theme scope and not
 * another. That is a real class of bug in this system's history (--lw-neutral-text
 * had a derived colour while its three siblings had only channels, so it silently
 * froze to the light palette on dark), and a generator that walks every scope is
 * the cheapest place to catch it.
 *
 * Usage: node templates/_tooling/lw-tokens-dtcg.mjs [--out tokens.json] [--check]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { splitRules, stripComments, declarationsIn } from "./_css.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const args = process.argv.slice(2);
const outPath = join(ROOT, args.includes("--out") ? args[args.indexOf("--out") + 1] : "tokens.json");
const checkOnly = args.includes("--check");

const css = readFileSync(join(ROOT, "tokens.css"), "utf8");

// Scope name → the theme it represents. Anything not listed is treated as a
// variant of :root, which is deliberate: an unrecognised scope should show up in
// the output rather than vanish from it.
const THEME = (sel) =>
  /\.dark|\[data-theme="dark"\]|data-band="dark"|band-dark/.test(sel) ? "dark"
  : /\.light|\[data-theme="light"\]|data-band="light"|band-light/.test(sel) ? "light"
  : /data-density="compact"/.test(sel) ? "compact"
  : /data-density="comfortable"/.test(sel) ? "comfortable"
  : "base";

const KIND = (name, value, hinted) => {
  if (hinted) return hinted;
  if (/^--lw-(space|radius|control-h|row-h|cell-pad|card-pad|stack-gap|field-pad|bp|sidebar|bottom-nav|mobile-bar)/.test(name)) return "dimension";
  if (/^--lw-(dur)/.test(name)) return "duration";
  if (/^--lw-(ease)/.test(name)) return "cubicBezier";
  if (/^--lw-(fw)/.test(name)) return "fontWeight";
  if (/^--lw-font/.test(name)) return "fontFamily";
  if (/^--lw-(text)/.test(name)) return "dimension";
  if (/^--lw-shadow/.test(name)) return "shadow";
  if (/hsl|rgb|#[0-9a-f]{3,8}/i.test(value)) return "color";
  return "other";
};

// Strip comments but keep the /* @kind x */ hints, which are authored precisely
// so this generator does not have to guess a type from a string.
const hints = new Map();
for (const m of css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);\s*\/\*\s*@kind\s+(\w+)/g)) hints.set(m[1], m[3]);

/* Shared walker — this file previously used a regex block matcher and had to be
   taught the `@import` case by hand after the contrast gate hit it. Same parser
   now, so there is no third place for the next parse defect to hide. */
const byTheme = { base: {}, light: {}, dark: {}, compact: {}, comfortable: {} };
const scopes = new Set();

for (const { selector, body } of splitRules(stripComments(css))) {
  if (!selector || selector.startsWith("@")) continue;
  const theme = THEME(selector);
  scopes.add(selector);
  for (const [name, value] of Object.entries(declarationsIn(body))) {
    byTheme[theme]["--lw-" + name] = value;
  }
}

// Nest --lw-brand-500 as brand.500, so Tokens Studio shows a tree rather than
// 400 flat rows.
const nest = (flat) => {
  const out = {};
  for (const [name, value] of Object.entries(flat)) {
    const parts = name.replace(/^--lw-/, "").split("-");
    let node = out;
    parts.forEach((p, i) => {
      if (i === parts.length - 1) {
        const leaf = { $value: value, $type: KIND(name, value, hints.get(name)) };
        // Group-then-leaf is the mirror of the case handled below: `brand-500-c`
        // creates the group `brand.500`, and `brand-500` arriving after it would
        // overwrite that group with a leaf and take every channel under it with
        // it. Same answer — the leaf becomes DEFAULT beside its siblings.
        node[p] = node[p] && !node[p].$value ? { ...node[p], DEFAULT: leaf } : leaf;
      } else {
        node[p] = node[p] || {};
        // A token that is both a group and a leaf (foo and foo-bar) needs the leaf
        // moved to foo.DEFAULT, or one silently overwrites the other.
        if (node[p].$value) node[p] = { DEFAULT: node[p] };
        node = node[p];
      }
    });
  }
  return out;
};

// The gate: every non-base theme must answer for every token the base declares in
// a themable family, or a consumer composing that token inside the scope gets the
// base value and never knows.
//
// `--lw-on-*` is EXEMPT, and the exemption is the rule rather than a hole in it:
// those inks sit on fills that do not follow the theme (the cyan button is cyan on
// both grounds), so an ink that DID follow would put 1.77 contrast on the amber.
// They are literal triples on purpose — README §Accessibility, third hole.
//
// The PALETTE is exempt for the same reason, and this exemption only became
// load-bearing when the parse defect above was fixed — until then `base` never
// contained a palette channel, so the gate never had to have an opinion. A
// numbered ramp (`brand-500`, `surface-2`, `text-3`), the navy constants and the
// status FILLS are fixed values: the cyan is the same cyan on both grounds, and
// what follows the theme is the ROLE composed from them (`fg`, `bg`, `line`,
// `brand-text`, `*-on`, `*-soft`). Requiring a ramp to re-point would demand
// exactly what README rule 2 forbids. `--lw-{status}-text-c` is likewise a light
// palette constant — the theme-following role is `--lw-{status}-on-c`, which
// points at it on light and IS re-pointed on dark.
const THEMABLE = /^--lw-(fg|bg|line|brand|navy|cta|success|warning|danger|neutral|surface|text|border|diff|chart|shadow)/;
const EXEMPT = new RegExp(
  "^--lw-on-"                                       // inks on theme-invariant fills
  + "|^--lw-(brand|cta|surface|text|border)-\\d+-c$" // numbered palette ramps
  + "|^--lw-navy-(700|900|deep)-c$"                  // the mark's navy constants
  + "|^--lw-(success|warning|danger|neutral)(-text)?-c$" // status fills + their light ink
);
const problems = [];
for (const theme of ["dark"]) {
  const t = byTheme[theme];
  for (const name of Object.keys(byTheme.base)) {
    if (!THEMABLE.test(name) || EXEMPT.test(name)) continue;
    // Channel tokens are what dark re-points; a derived colour follows its channel,
    // so only the channels are required to appear in both.
    if (!name.endsWith("-c")) continue;
    if (!(name in t)) problems.push(theme + " does not re-point " + name);
  }
}

const doc = {
  $description: "@leanwise/design tokens, generated from tokens.css. Do not hand-edit — regenerate.",
  base: nest(byTheme.base),
  dark: nest(byTheme.dark),
  density: { compact: nest(byTheme.compact), comfortable: nest(byTheme.comfortable) },
};

const count = Object.keys(byTheme.base).length;
if (problems.length) {
  console.error("lw-tokens-dtcg: " + problems.length + " token(s) not re-pointed in every theme scope:");
  for (const p of problems.slice(0, 20)) console.error("  · " + p);
  if (problems.length > 20) console.error("  … and " + (problems.length - 20) + " more");
  process.exit(1);
}
if (checkOnly) {
  // tokens.json is committed (it is in package.json#exports, and every consumer
  // installs from a git tag, where a generated-at-publish file does not exist).
  // A committed generated file can go stale silently, so the check that runs on
  // every token change is also the one that catches it.
  const want = JSON.stringify(doc, null, 2) + "\n";
  let have = null;
  try { have = readFileSync(outPath, "utf8"); } catch { /* absent — reported below */ }
  if (have === null) {
    console.error("lw-tokens-dtcg: " + outPath + " is missing. Run `npm run tokens` and commit it.");
    process.exit(1);
  }
  if (have !== want) {
    console.error("lw-tokens-dtcg: " + outPath + " is stale — tokens.css has moved since it was generated.");
    console.error("  Run `npm run tokens` and commit the result.");
    process.exit(1);
  }
  console.log("lw-tokens-dtcg: OK — " + count + " base tokens across " + scopes.size + " scopes, every themable channel re-pointed; tokens.json current.");
  process.exit(0);
}
writeFileSync(outPath, JSON.stringify(doc, null, 2) + "\n");
console.log("lw-tokens-dtcg: wrote " + outPath + " — " + count + " base tokens, " + scopes.size + " scopes.");
