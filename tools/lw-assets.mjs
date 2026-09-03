#!/usr/bin/env node
/**
 * Generate the on-dark twin of each two-ground artwork asset from its ink source.
 *
 * Run: node tools/lw-assets.mjs         (writes)
 *      node tools/lw-assets.mjs --check (fails if a generated file on disk is stale)
 *
 *   assets/hex-lattice-ink.svg  →  assets/hex-lattice.svg          (stroke, opacity)
 *   assets/hero-mark-ink.svg    →  assets/hero-mark.svg            (gradient stops 0 and 1)
 *   assets/logo-lockup.svg      →  assets/logo-lockup-ondark.svg   (both gradients' stops)
 *
 * Three pairs of assets shared their path data byte-for-byte and differed only
 * in colour — which meant three drawings kept in two places each, with the
 * on-dark copy of every one a hand-edit of the other. `lw-favicon.mjs` already
 * made the same argument for the favicon: the geometry is an autotrace of the
 * master art and must not be re-typed, so a variant is a SUBSTITUTION over the
 * source, driven by tokens.css, generated, committed and checked for staleness.
 * The ink file is the source because it is the one a light page paints, and a
 * light page is the default deployment.
 *
 * Every colour that changes hands here has a name in tokens.css. Two already
 * did (`--lw-brand-500` for the ink lattice stroke, `--lw-navy-700` /
 * `--lw-logo-cyan` / the `--lw-logo-*-ondark` pair for the lockup); v1.13.0
 * named the other five as `--lw-art-*`, artwork-only on the same terms as
 * `--lw-logo-cyan`. `logoStops()` in lw-contrast-check.mjs asserts every stop
 * and stroke in all six files against those tokens, so this generator and that
 * gate read the same source of truth and neither can drift alone.
 *
 * ONE DELIBERATE DIFFERENCE from the hand-made file it replaces: the on-dark
 * lockup used to carry `aria-hidden="true"` where the light lockup carries
 * `role="img" aria-label="LeanWise AI"`. Same wordmark, same meaning, one of
 * them announced and the other invisible — whichever ground a visitor was on
 * decided whether the logo existed for a screen reader. The generated file
 * keeps the source's `role="img" aria-label`; an on-dark logo is still the logo.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { generated } from "./_generated.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = join(ROOT, "assets");
const tokensCss = readFileSync(join(ROOT, "tokens.css"), "utf8");

/** Read an `--lw-<name>-c: H S% L%;` channel triple out of tokens.css. */
export function channel(name) {
  const m = tokensCss.match(new RegExp(`--lw-${name}-c:\\s*([\\d.]+)\\s+([\\d.]+)%\\s+([\\d.]+)%`));
  if (!m) throw new Error(`--lw-${name}-c not found in tokens.css`);
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

/* Same conversion as lw-favicon.mjs, and it must stay so: the contrast gate
   compares the hex these files carry against the same triples resolved its own
   way, and the `--lw-art-*` triples were chosen at one decimal precisely so this
   rounding lands on the original hex. */
export function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const [r, g, b] = [
    [c, x, 0], [x, c, 0], [0, c, x], [0, x, c], [x, 0, c], [c, 0, x],
  ][Math.floor(h / 60) % 6];
  return "#" + [r, g, b]
    .map((v) => Math.round((v + m) * 255).toString(16).padStart(2, "0").toUpperCase())
    .join("");
}

const hex = (name) => hslToHex(...channel(name));

/**
 * Each job: a source, an output, and a list of literal substitutions. `from`
 * is built from the token the SOURCE is asserted against (so a source that has
 * drifted from its token fails here, not silently in the gate), and `count` is
 * how many times it must occur — a substitution that matches nothing is the
 * favicon's "silent letterbox" defect again, so it throws.
 */
const JOBS = [
  {
    src: "hex-lattice-ink.svg", out: "hex-lattice.svg",
    subs: [
      { from: `stroke="${hex("brand-500")}"`, to: `stroke="${hex("art-lattice-ondark")}"`, count: 1 },
      // The lighter stroke on navy carries slightly more alpha than the darker
      // one on white; both values are in the marketing.css ground comments.
      { from: 'stroke-opacity="0.55"', to: 'stroke-opacity="0.6"', count: 1 },
    ],
  },
  {
    src: "hero-mark-ink.svg", out: "hero-mark.svg",
    subs: [
      { from: `<stop offset="0" stop-color="${hex("art-mark-navy")}">`, to: `<stop offset="0" stop-color="${hex("art-mark-navy-ondark")}">`, count: 1 },
      // The middle stop is --lw-logo-cyan on BOTH grounds and is left alone.
      { from: `<stop offset="1" stop-color="${hex("art-mark-cyan")}">`, to: `<stop offset="1" stop-color="${hex("art-mark-cyan-ondark")}">`, count: 1 },
    ],
  },
  {
    src: "logo-lockup.svg", out: "logo-lockup-ondark.svg",
    subs: [
      // Two gradients (mark and wordmark sweep separately), so each stop twice.
      { from: `<stop offset="0" stop-color="${hex("navy-700")}">`, to: `<stop offset="0" stop-color="${hex("logo-navy-ondark")}">`, count: 2 },
      { from: `<stop offset="1" stop-color="${hex("logo-cyan")}">`, to: `<stop offset="1" stop-color="${hex("logo-cyan-ondark")}">`, count: 2 },
      // NOT substituted: role="img" aria-label="LeanWise AI" — see the header.
    ],
  },
];

function build({ src, out, subs }) {
  let svg = readFileSync(join(ASSETS, src), "utf8");
  for (const { from, to, count } of subs) {
    const n = svg.split(from).length - 1;
    if (n !== count) {
      throw new Error(
        `assets/${src}: expected ${count} occurrence(s) of ${from}, found ${n} — ` +
          "the source no longer matches its token, or its shape changed. Re-derive the substitution.",
      );
    }
    svg = svg.split(from).join(to);
  }
  if (out.startsWith("logo-lockup") && !svg.includes('role="img" aria-label="LeanWise AI"')) {
    throw new Error(`assets/${out}: the accessible name was lost in generation`);
  }
  return svg;
}

const files = new Map(JOBS.map((j) => [join(ASSETS, j.out), build(j)]));
const check = process.argv.includes("--check");

const stale = await generated({
  name: "lw-assets", files, check,
  hint: "run `node tools/lw-assets.mjs` and commit the result",
});
if (stale) process.exit(1);
if (check) {
  console.log(`✓ lw-assets: ${JOBS.length} generated on-dark assets are current`);
} else {
  for (const j of JOBS) {
    console.log(`  ${j.src} → ${j.out}  ${j.subs.map((s) => s.to.match(/#[0-9A-F]{6}|[\d.]+"$/)?.[0] ?? s.to).join(", ")}`);
  }
}
