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

const blocks = [...css.replace(/\/\*[^]*?\*\//g, "").matchAll(/([^{}]+)\{([^{}]*)\}/g)];
const byTheme = { base: {}, light: {}, dark: {}, compact: {}, comfortable: {} };
const scopes = new Set();

for (const [, selRaw, body] of blocks) {
  const sel = selRaw.trim();
  if (sel.startsWith("@")) continue;
  const theme = THEME(sel);
  scopes.add(sel);
  for (const m of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+)/g)) {
    const name = m[1].trim();
    const value = m[2].trim();
    (byTheme[theme] = byTheme[theme] || {})[name] = value;
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
        node[p] = { $value: value, $type: KIND(name, value, hints.get(name)) };
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
const THEMABLE = /^--lw-(fg|bg|line|brand|navy|cta|success|warning|danger|neutral|surface|text|border|diff|chart|shadow)/;
const EXEMPT = /^--lw-on-/;
const problems = [];
for (const theme of ["dark"]) {
  const t = byTheme[theme] || {};
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
  dark: nest(byTheme.dark || {}),
  density: { compact: nest(byTheme.compact || {}), comfortable: nest(byTheme.comfortable || {}) },
};

const count = Object.keys(byTheme.base).length;
if (problems.length) {
  console.error("lw-tokens-dtcg: " + problems.length + " token(s) not re-pointed in every theme scope:");
  for (const p of problems.slice(0, 20)) console.error("  · " + p);
  if (problems.length > 20) console.error("  … and " + (problems.length - 20) + " more");
  process.exit(1);
}
if (checkOnly) {
  console.log("lw-tokens-dtcg: OK — " + count + " base tokens across " + scopes.size + " scopes, every themable channel re-pointed.");
  process.exit(0);
}
writeFileSync(outPath, JSON.stringify(doc, null, 2) + "\n");
console.log("lw-tokens-dtcg: wrote " + outPath + " — " + count + " base tokens, " + scopes.size + " scopes.");
