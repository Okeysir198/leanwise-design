import { test } from "node:test";
import assert from "node:assert/strict";
import { contrast, deltaE76, deltaE76Cvd, hexToRgb } from "../scripts/lib/color.mjs";
import { cr, hex2rgb } from "../scripts/lib/oklch.mjs";
import { toHex, toOk } from "../scripts/lib/parse.mjs";

test("WCAG contrast: known pairs, and both implementations agree", () => {
  assert.equal(contrast(hexToRgb("000000"), hexToRgb("ffffff")).toFixed(2), "21.00");
  assert.equal(cr(hex2rgb("#0C727B"), hex2rgb("#FFFFFF")).toFixed(2), "5.66");
  assert.equal(cr(hex2rgb("#024576"), hex2rgb("#FCB603")).toFixed(2), contrast(hexToRgb("024576"), hexToRgb("FCB603")).toFixed(2));
});

test("OKLCH parse round-trips hex, and white is white", () => {
  assert.equal(toHex("#0C727B"), "#0C727B");
  assert.equal(toHex("oklch(1 0 0)"), "#FFFFFF");
  const [L, C] = toOk("oklch(0.5 0.1 240)");
  assert.ok(Math.abs(L - 0.5) < 1e-3 && Math.abs(C - 0.1) < 1e-3);
});

test("CVD: a red/green pair collapses under deuteranopia, a light/dark pair does not", () => {
  const red = hexToRgb("d62728"), green = hexToRgb("2ca02c");
  assert.ok(deltaE76(red, green) > 60);
  assert.ok(deltaE76Cvd(red, green).d < 20);
  assert.ok(deltaE76Cvd(hexToRgb("0c727b"), hexToRgb("fcb603")).d > 30);
});
