#!/usr/bin/env node
/**
 * Generate the on-dark twin of each two-ground artwork asset from its ink source.
 *
 * Run: node scripts/assets.mjs         (writes)
 *      node scripts/assets.mjs --check (fails if a generated file on disk is stale)
 *
 *   assets/hex-lattice-ink.svg  ->  assets/hex-lattice.svg          (stroke, opacity)
 *   assets/hero-mark-ink.svg    ->  assets/hero-mark.svg            (gradient stops 0 and 1)
 *   assets/logo-lockup.svg      ->  assets/logo-lockup-ondark.svg   (both gradients' stops)
 *
 * The geometry is shared; a variant is a literal colour substitution over the
 * source. Colours come from src/palette.mjs (the anchors) and ART below, the
 * artwork-only values that exist nowhere in the UI palette. A substitution that
 * matches the wrong number of times throws.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { generated } from "./lib/generated.mjs";
import { ANCHORS, ramp } from "../src/palette.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = join(ROOT, "assets");

const ART = {
  latticeInk: ANCHORS.cyan,
  latticeOnDark: "#5FD7E4",
  markNavy: "#023E6B",
  markNavyOnDark: "#1E6FA8",
  markCyan: "#19C7D8",
  markCyanOnDark: "#9AEDF6",
  logoNavy: ANCHORS.navy,
  logoCyan: ramp[500],
  logoNavyOnDark: "#4FA8D8",
  logoCyanOnDark: "#8FEAF4",
};

/**
 * Each job: a source, an output, and a list of literal substitutions. `from`
 * is the colour the source must carry and `count` how many times it must occur.
 */
const JOBS = [
  {
    src: "hex-lattice-ink.svg", out: "hex-lattice.svg",
    subs: [
      { from: `stroke="${ART.latticeInk}"`, to: `stroke="${ART.latticeOnDark}"`, count: 1 },
      { from: 'stroke-opacity="0.55"', to: 'stroke-opacity="0.6"', count: 1 },
    ],
  },
  {
    src: "hero-mark-ink.svg", out: "hero-mark.svg",
    subs: [
      { from: `<stop offset="0" stop-color="${ART.markNavy}">`, to: `<stop offset="0" stop-color="${ART.markNavyOnDark}">`, count: 1 },
      { from: `<stop offset="1" stop-color="${ART.markCyan}">`, to: `<stop offset="1" stop-color="${ART.markCyanOnDark}">`, count: 1 },
    ],
  },
  {
    src: "logo-lockup.svg", out: "logo-lockup-ondark.svg",
    subs: [
      // Two gradients (mark and wordmark sweep separately), so each stop twice.
      { from: `<stop offset="0" stop-color="${ART.logoNavy}">`, to: `<stop offset="0" stop-color="${ART.logoNavyOnDark}">`, count: 2 },
      { from: `<stop offset="1" stop-color="${ART.logoCyan}">`, to: `<stop offset="1" stop-color="${ART.logoCyanOnDark}">`, count: 2 },
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
          "the source no longer matches its colour, or its shape changed. Re-derive the substitution.",
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
  name: "assets", files, check,
  hint: "run `node scripts/assets.mjs` and commit the result",
});
if (stale) process.exit(1);
if (check) {
  console.log(`✓ assets: ${JOBS.length} generated on-dark assets are current`);
} else {
  for (const j of JOBS) {
    console.log(`  ${j.src} → ${j.out}  ${j.subs.map((s) => s.to.match(/#[0-9A-F]{6}|[\d.]+"$/)?.[0] ?? s.to).join(", ")}`);
  }
}
