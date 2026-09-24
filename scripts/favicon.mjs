#!/usr/bin/env node
/**
 * Generate assets/logo-favicon.svg from assets/logo-mark.svg.
 *
 * Run: node scripts/favicon.mjs        (writes)
 *      node scripts/favicon.mjs --check (fails if the file on disk is stale)
 *
 * A favicon is not just the mark at a small size — it is the mark in two contexts
 * the other assets never face, and each one breaks a different assumption:
 *
 *   1. THE SLOT IS SQUARE. The mark is 871.1 x 1000. Dropped into a square slot the
 *      browser letterboxes it, so the drawing renders smaller than the space allows
 *      and reads as mis-set beside every other favicon in the tab strip. Widening
 *      the viewBox to 1000 and shifting the origin to -64.45 centres the identical
 *      paths in a square box without touching a coordinate — the geometry stays an
 *      autotrace of the master art, which is the rule for every asset here.
 *
 *   2. THE GROUND IS THE BROWSER'S, NOT OURS. Every other logo asset is placed on a
 *      ground we chose, which is why there is a light variant and a dark one and a
 *      documented rule for picking between them. A tab strip gives you neither
 *      choice nor knowledge: the same file is painted on near-white in one OS theme
 *      and near-black in the other, and `#024576` at the gradient's dark end is
 *      effectively invisible on the second. So this is the one asset that must
 *      carry BOTH pairs and switch itself. Chrome and Firefox honour a
 *      `prefers-color-scheme` media query inside an SVG favicon; browsers that do
 *      not simply keep the light stops, which is the safer default of the two.
 *
 * The literal `stop-color` attributes stay as written so a renderer that drops
 * the <style> block still gets the light gradient.
 */
import { readFileSync } from "node:fs";
import { generated } from "./lib/generated.mjs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ANCHORS, ramp } from "../src/palette.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "assets", "logo-mark.svg");
const OUT = join(ROOT, "assets", "logo-favicon.svg");

/* Logo gradient: navy -> cyan on light, the lifted pair on dark. */
const LIGHT = [ANCHORS.navy, ramp[500]];
const DARK = ["#4FA8D8", "#8FEAF4"];

function build() {
  let svg = readFileSync(SRC, "utf8");

  const before = svg;
  svg = svg
    // 871.1 wide inside a 1000 box -> (1000 - 871.1) / 2 = 64.45 of bleed each side.
    .replace('viewBox="0 0 871.1 1000"', 'viewBox="-64.45 0 1000 1000"')
    .replace('width="871.1" height="1000"', 'width="1000" height="1000"')
    .replace(
      `<stop offset="0" stop-color="${LIGHT[0]}">`,
      `<stop offset="0" stop-color="${LIGHT[0]}" class="a">`,
    )
    .replace(
      `<stop offset="1" stop-color="${LIGHT[1]}">`,
      `<stop offset="1" stop-color="${LIGHT[1]}" class="b">`,
    )
    .replace(
      "<defs>",
      "<defs><style>" +
        `.a{stop-color:${LIGHT[0]}}.b{stop-color:${LIGHT[1]}}` +
        "@media(prefers-color-scheme:dark){" +
        `.a{stop-color:${DARK[0]}}.b{stop-color:${DARK[1]}}}` +
        "</style>",
    );

  // Each replacement is load-bearing. Silence here would ship a letterboxed icon
  // that vanishes on dark tab strips — a defect only ever visible in the one place
  // no gate screenshots, which is why this throws rather than warns.
  if (svg === before) {
    throw new Error(
      "logo-mark.svg no longer matches the shape favicon expects (viewBox 0 0 871.1 1000, " +
        `a two-stop ${LIGHT[0]}/${LIGHT[1]} gradient, a <defs> block). Re-derive the transform.`,
    );
  }
  for (const needle of ["prefers-color-scheme", 'viewBox="-64.45 0 1000 1000"', DARK[0], DARK[1]]) {
    if (!svg.includes(needle)) throw new Error(`generated favicon is missing ${needle}`);
  }
  return svg;
}

const built = build();
const check = process.argv.includes("--check");

const stale = await generated({
  name: "favicon", files: new Map([[OUT, built]]), check,
  hint: "run `node scripts/favicon.mjs` and commit the result",
});
if (stale) process.exit(1);
if (check) {
  console.log("✓ assets/logo-favicon.svg is current");
} else {
  console.log(
    `  ${(Buffer.byteLength(built) / 1024).toFixed(1)} KB  ` +
      `light ${LIGHT.join(" → ")}  dark ${DARK.join(" → ")}`,
  );
}
