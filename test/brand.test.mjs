/** brand.js — per-tenant theming: the clamp band, the ink rule, the var set. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { brandRamp, brandVars, parseHex, rgbToHsl, hslToRgb, contrast } from "../brand.js";

const WHITE = [255, 255, 255], NAVY = [11, 18, 32];

test("an achromatic pick falls through to LeanWise cyan (null)", () => {
  assert.equal(brandRamp("#888888"), null);
  assert.equal(brandRamp("not a colour"), null);
});

test("the anchor is clamped: L to [20,50], S to [26,92]", () => {
  const dark = brandRamp("#020a0c");      // L ≈ 2.7 → floored to 20
  assert.equal(dark.anchor[2], 20);
  const light = brandRamp("#ccf2ff");     // L ≈ 90 → capped at 50
  assert.equal(light.anchor[2], 50);
  const dull = brandRamp("#8a7a70");      // S ≈ 10 (> achromatic 8) → floored to 26
  assert.equal(dull.anchor[1], 26);
  const loud = brandRamp("#00ff00");      // S = 100 → capped at 92
  assert.equal(loud.anchor[1], 92);
  assert.deepEqual(loud.tiers[500], loud.anchor, "tier 500 IS the clamped anchor");
});

test("ink follows the fill's lightness: white on brand cyan, navy on the amber CTA", () => {
  assert.deepEqual(brandRamp("#0C727B").ink, WHITE);
  assert.deepEqual(brandRamp("#FCB603").ink, NAVY);
});

test("brandVars emits both the -c channel and the derived colour for every tier", () => {
  const vars = brandVars("#0C727B", "light");
  for (const k of [50, 100, 200, 300, 400, 500, 600, 700]) {
    assert.ok(vars[`--lw-brand-${k}-c`], `--lw-brand-${k}-c`);
    assert.equal(vars[`--lw-brand-${k}`], `hsl(${vars[`--lw-brand-${k}-c`]})`);
  }
  assert.equal(vars["--primary"], vars["--lw-brand-500-c"]);
  assert.equal(vars["--ring"], vars["--lw-brand-text-c"]);
  assert.equal(vars["--primary-foreground"], "0 0% 100%");
  assert.equal(brandVars("#0C727B", "dark")["--lw-brand-text-c"], vars["--lw-brand-400-c"], "dark reads text from tier 400");
  assert.deepEqual(brandVars(null), {});
  assert.doesNotMatch(JSON.stringify(vars), /--accent/, "a tenant never owns --accent");
});

test("hsl <-> rgb round-trips the brand hex", () => {
  const rgb = parseHex("#0C727B");
  assert.deepEqual(hslToRgb(rgbToHsl(rgb)), rgb);
  assert.ok(contrast(rgb, WHITE) > 5.6 && contrast(rgb, WHITE) < 5.7);
});
