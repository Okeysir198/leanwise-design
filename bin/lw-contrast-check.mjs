#!/usr/bin/env node
/**
 * WCAG contrast gate for the token core.
 *
 * This exists because the obvious mapping was wrong and nobody noticed: white
 * text on the LeanWise orange (#F97316) scores 2.80, and on the teal (#14B8A6)
 * scores 2.49. Both fail AA. The design system shipped that pairing in a doc for
 * months. A number in CI would have caught it on day one; a human eyeballing a
 * mockup did not.
 *
 * Parses tokens.css for the authored HSL triples, resolves each pair below, and
 * fails the build if any drops under threshold. Run it whenever a token changes.
 *
 *   node bin/lw-contrast-check.mjs
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const AA_TEXT = 4.5; // body text
const AA_UI = 3.0; // large text, icons, UI boundaries

/** Pairs that must hold. `ui: true` relaxes to 3.0 (icons / large type / borders). */
const PAIRS = [
  // The decision this file exists to defend: brand fills carry NAVY ink.
  ["on-brand", "brand-500", "brand fill + its ink (default Button)"],
  ["on-cta", "cta-500", "CTA fill + its ink (the one orange button)"],
  ["on-danger", "danger", "destructive fill + its ink (white — the exception)"],
  ["on-brand", "success", "success fill + its ink"],
  ["on-brand", "warning", "warning fill + its ink"],

  // Text on the light page.
  ["text-1", "surface-0", "body text on page"],
  ["text-2", "surface-0", "secondary text on page"],
  ["text-3", "surface-0", "muted text on page (the floor)"],
  ["brand-700", "surface-0", "teal AS TEXT — links (brand-500 would be 2.49)"],
  ["success-text", "surface-0", "success as text"],
  ["warning-text", "surface-0", "warning as text"],
  ["danger-text", "surface-0", "danger as text"],
  ["text-1", "surface-1", "body text on subtle surface"],
  ["text-1", "brand-50", "text on the --accent hover surface"],

  // Text on the dark page. Names resolved from the .dark block.
  ["d-text-1", "d-paper", "body text on dark"],
  ["d-text-2", "d-paper", "secondary text on dark"],
  ["d-text-3", "d-paper", "muted text on dark"],
  ["brand-400", "d-paper", "teal as text on dark"],
  ["cta-400", "d-paper", "orange as text on dark"],
  ["d-text-1", "d-surface", "text on a dark card"],

  // The full-bleed dark hero (.lw-hero-dark) sits on navy-deep, not the dark paper.
  ["brand-400", "navy-deep", "brand accent text on the dark hero"],

  // Badge/chip pairs: the -on text sitting on its own -soft tint. These are easy to
  // forget in the dark block — and forgetting them shipped #34D399 on #DCFCE7 (1.75).
  ["success-text", "success-soft", "success badge (light)"],
  ["warning-text", "warning-soft", "warning badge (light)"],
  ["danger-text", "danger-soft", "danger badge (light)"],
  ["d-success-on", "d-success-soft", "success badge (dark)"],
  ["d-warning-on", "d-warning-soft", "warning badge (dark)"],
  ["d-danger-on", "d-danger-soft", "danger badge (dark)"],
];

const css = readFileSync(join(ROOT, "tokens.css"), "utf8");

/**
 * Pull every `--lw-<name>-c: <h> <s>% <l>%;` declaration from ONE block.
 *
 * Scoping matters: the dark block redefines the same names (that is the whole
 * point of it). Scanning the file as a whole lets the last declaration win, so a
 * light token silently resolves to its dark value and the checker compares pairs
 * that never co-occur. It reported light badges at 2.14 for exactly that reason.
 */
function triplesIn(src) {
  const out = {};
  const re = /--lw-([a-z0-9-]+)-c:\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*;/gi;
  let m;
  while ((m = re.exec(src))) out[m[1]] = [+m[2], +m[3], +m[4]];
  return out;
}

/** Body of the first `<selector> { … }` block whose selector matches. */
function block(src, selector) {
  const i = src.indexOf(selector);
  if (i < 0) throw new Error(`selector not found: ${selector}`);
  const open = src.indexOf("{", i);
  let depth = 0;
  for (let j = open; j < src.length; j++) {
    if (src[j] === "{") depth++;
    else if (src[j] === "}" && --depth === 0) return src.slice(open + 1, j);
  }
  throw new Error(`unbalanced block: ${selector}`);
}

const light = triplesIn(block(css, ":root {"));
const darkRaw = triplesIn(block(css, ".dark,"));
// The dark block only re-points what CHANGES; everything else is inherited.
const dark = { ...light, ...darkRaw };

function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)];
}

function luminance([r, g, b]) {
  const lin = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

// Role aliases: names used in PAIRS that point at another token rather than
// holding a value of their own. `d-*` resolves against the dark scope — and maps
// to the ROLE token (--lw-fg-c), not the palette token (--lw-text-1-c), because
// that is what actually re-points in the dark block.
const ALIAS = {
  "on-brand": ["light", "text-1"],
  "on-cta": ["light", "text-1"],
  "on-danger": ["light", "surface-0"],
  "d-paper": ["dark", "bg"],
  "d-surface": ["dark", "bg-subtle"],
  "d-text-1": ["dark", "fg"],
  "d-text-2": ["dark", "fg-muted"],
  "d-text-3": ["dark", "fg-subtle"],
  "d-success-on": ["dark", "success-on"],
  "d-warning-on": ["dark", "warning-on"],
  "d-danger-on": ["dark", "danger-on"],
  "d-success-soft": ["dark", "success-soft"],
  "d-warning-soft": ["dark", "warning-soft"],
  "d-danger-soft": ["dark", "danger-soft"],
};

const resolve = (name) => {
  const [scopeName, key] = ALIAS[name] ?? ["light", name];
  return (scopeName === "dark" ? dark : light)[key];
};

let failed = 0;
const rows = [];

for (const [fgName, bgName, label] of PAIRS) {
  const fg = resolve(fgName);
  const bg = resolve(bgName);
  if (!fg || !bg) {
    console.error(`  ?? unresolved token in pair (${fgName} on ${bgName})`);
    failed++;
    continue;
  }
  const ratio = contrast(hslToRgb(...fg), hslToRgb(...bg));
  const ok = ratio >= AA_TEXT;
  if (!ok) failed++;
  rows.push([ok ? "PASS" : "FAIL", ratio.toFixed(2), `${fgName} on ${bgName}`, label]);
}

const w = Math.max(...rows.map((r) => r[2].length));
console.log("\nLeanWise Design System — WCAG contrast gate\n");
for (const [status, ratio, pair, label] of rows) {
  const mark = status === "PASS" ? "\x1b[32m✓\x1b[0m" : "\x1b[31m✗\x1b[0m";
  console.log(`  ${mark} ${ratio.padStart(5)}  ${pair.padEnd(w)}  ${label}`);
}

if (failed) {
  console.error(`\n\x1b[31m${failed} pair(s) below AA (${AA_TEXT}:1). Fix the token, not the test.\x1b[0m\n`);
  process.exit(1);
}
console.log(`\n\x1b[32mAll ${rows.length} pairs pass WCAG AA (≥ ${AA_TEXT}:1).\x1b[0m\n`);
