import { test } from "node:test";
import assert from "node:assert/strict";
import { brandRamp, brandVars, clampedHex, isInBand, parseHex, contrast, rgbToOklch, oklchToRgb, toHex } from "../brand.js";

test("no usable colour returns {} so the theme applies unchanged", () => {
  assert.deepEqual(brandVars(null), {});
  assert.deepEqual(brandVars("nope"), {});
  assert.deepEqual(brandVars("#888888"), {}, "achromatic");
  assert.equal(brandRamp("#888888"), null);
});

test("oklch round-trips a hex", () => {
  for (const h of ["#0C727B", "#024576", "#FCB603"]) assert.equal(toHex(oklchToRgb(rgbToOklch(parseHex(h)))), h);
});

test("the LeanWise cyan is in band and paints itself", () => {
  assert.ok(isInBand("#0C727B"));
  assert.equal(clampedHex("#0C727B"), "#0C727B");
  const v = brandVars("#0C727B");
  assert.equal(v["--primary"], "#0C727B");
  assert.equal(v["--primary-foreground"], "#FFFFFF");
  assert.equal(v["--ring"], v["--primary"]);
  assert.equal(v["--brand-600"], "#0C727B");
});

test("lightness is clamped so primary ink clears AA in both schemes", () => {
  assert.ok(!isInBand("#CCF2FF"));
  for (const h of ["#CCF2FF", "#00FF00", "#FCB603", "#8A2BE2"]) {
    for (const s of ["light", "dark"]) {
      const v = brandVars(h, s);
      assert.ok(contrast(v["--primary"], v["--primary-foreground"]) >= 4.5, `${h} ${s}`);
    }
  }
});

test("the ramp has ten tiers, light to dark", () => {
  const r = brandRamp("#8A2BE2");
  const keys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  assert.deepEqual(Object.keys(r).map(Number), keys);
  const L = keys.map((k) => rgbToOklch(parseHex(r[k]))[0]);
  for (let i = 1; i < L.length; i++) assert.ok(L[i] < L[i - 1], `tier ${keys[i]}`);
});

test("a tenant never owns --accent, and emits only known vars", () => {
  const v = brandVars("#8A2BE2", "dark");
  for (const k of Object.keys(v)) {
    assert.match(k, /^--(brand-\d+|primary|primary-foreground|ring|sidebar-primary|sidebar-primary-foreground|sidebar-ring|chart-1)$/);
  }
});
