/** Contrast maths — brand.js today, tools/_color.mjs once WS1 lands it. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { contrast, hslToRgb } from "../brand.js";
import { ROOT, triple } from "./_root.mjs";

const WHITE = [255, 255, 255];
const near = (a, b, eps = 0.01) => assert.ok(Math.abs(a - b) <= eps, `${a} vs ${b} (±${eps})`);

test("white/black is 21:1, and a colour against itself is 1:1", () => {
  near(contrast(WHITE, [0, 0, 0]), 21, 1e-9);
  near(contrast(WHITE, WHITE), 1, 1e-9);
});

test("brand-500 on white measures 5.66 — the number tokens.css states", () => {
  const brand = hslToRgb(triple("brand-500"));
  near(contrast(brand, WHITE), 5.66);
});

test("cta-500 under its navy ink measures 10.54", () => {
  const cta = hslToRgb(triple("cta-500"));
  const ink = hslToRgb(triple("on-cta"));
  near(contrast(cta, ink), 10.54);
});

const colorPath = join(ROOT, "tools", "_color.mjs");
test("brand.js and tools/_color.mjs agree on contrast to 1e-6", { skip: !existsSync(colorPath) && "WS1's tools/_color.mjs not present yet" }, async () => {
  const c = await import(colorPath);
  const to255 = ({ r, g, b }) => [r, g, b].map((v) => Math.round(v * 255));
  for (const name of ["brand-500", "cta-500", "navy-700", "on-cta"]) {
    const [h, s, l] = triple(name);
    const theirs = c.hslToRgb(h, s, l);
    const ours = hslToRgb([h, s, l]);
    // brand.js rounds to 8-bit before measuring (what is painted); _color.mjs
    // keeps the float. Compare hslToRgb at the 8-bit boundary, and contrast on
    // the SAME 8-bit colour so the maths — not the rounding — is what is tested.
    assert.deepEqual(to255(theirs), ours, `${name}: hslToRgb`);
    const as1 = ([r, g, b]) => ({ r: r / 255, g: g / 255, b: b / 255 });
    near(c.contrast(as1(ours), as1(WHITE)), contrast(ours, WHITE), 1e-6);
  }
});
