/** _color.mjs — dichromatic simulation, and the ramp promise it protects. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { hslToRgb, deltaE76, simulateCvd, deltaE76Cvd, CVD_KINDS } from "../tools/_color.mjs";

const near = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol, `${msg}: ${a} vs ${b}`);

test("grey is a fixed point of every dichromacy", () => {
  // A dichromat loses a hue axis, not lightness — neutrals must come back unchanged.
  for (const kind of CVD_KINDS) {
    for (const v of [0, 0.25, 0.5, 0.75, 1]) {
      const out = simulateCvd({ r: v, g: v, b: v }, kind);
      for (const ch of ["r", "g", "b"]) near(out[ch], v, 0.02, `${kind} grey ${v}.${ch}`);
    }
  }
});

test("blue survives protan/deutan and is what tritan destroys", () => {
  const blue = { r: 0, g: 0, b: 1 };
  // The S cone is untouched by red-green dichromacy, so blue moves little...
  for (const kind of ["protan", "deutan"]) {
    assert.ok(deltaE76(blue, simulateCvd(blue, kind)) < 22, `${kind} should largely preserve blue`);
  }
  // ...and is exactly the cone tritanopia lacks.
  assert.ok(deltaE76(blue, simulateCvd(blue, "tritan")) > 40, "tritan should move blue hard");
});

test("red and green collapse together under deuteranopia", () => {
  const red = { r: 0.8, g: 0.2, b: 0.2 }, green = { r: 0.2, g: 0.8, b: 0.2 };
  assert.ok(deltaE76(red, green) > 60, "obviously different to normal vision");
  assert.ok(deltaE76Cvd(red, green).d < deltaE76(red, green) / 2, "much closer to a dichromat");
});

test("deltaE76Cvd reports the worst of the three, and names it", () => {
  const a = hslToRgb(205, 70, 55), b = hslToRgb(258, 62, 68);  // the v4.1.0 navy/violet pair
  const worst = deltaE76Cvd(a, b);
  const each = CVD_KINDS.map((k) => deltaE76(simulateCvd(a, k), simulateCvd(b, k)));
  near(worst.d, Math.min(...each), 1e-9, "returns the minimum");
  assert.ok(CVD_KINDS.includes(worst.kind), "names which dichromacy");
  // The regression this whole mechanism exists for: separable to normal vision,
  // the SAME COLOUR to a deuteranope. If this ever stops being true the fixture
  // is wrong, not the maths.
  assert.ok(deltaE76(a, b) > 35 && worst.d < 2, "the v4.1.0 collision reproduces");
});

test("the shipped ramp keeps its tiered promise in every scope", () => {
  // Parse tokens.css rather than a fixture: the point is that what SHIPS passes.
  const css = readFileSync(new URL("../tokens.css", import.meta.url), "utf8");
  const scopes = [...css.matchAll(/--lw-chart-(\d+):\s*hsl\(([\d.]+) ([\d.]+)% ([\d.]+)%\)/g)];
  assert.ok(scopes.length >= 48, `expected 4 scopes x 12 slots, saw ${scopes.length}`);
  // Group by position: every run of slots 1..12 in source order is one scope.
  const ramps = new Map();
  let cur = [];
  for (const [, slot, h, s, l] of scopes) {
    cur.push({ slot: Number(slot), rgb: hslToRgb(Number(h), Number(s), Number(l)) });
    if (Number(slot) === 12) { ramps.set(ramps.size, cur); cur = []; }
  }
  assert.equal(ramps.size, 4, "four chart scopes in tokens.css");
  for (const [idx, ramp] of ramps) {
    for (let i = 0; i < ramp.length; i++) {
      for (let j = i + 1; j < ramp.length; j++) {
        const inTier = ramp[i].slot <= 6 && ramp[j].slot <= 6;
        const floor = inTier ? 15 : 11;
        const { d, kind } = deltaE76Cvd(ramp[i].rgb, ramp[j].rgb);
        assert.ok(d >= floor,
          `scope ${idx}: chart-${ramp[i].slot} vs chart-${ramp[j].slot} — dE ${d.toFixed(1)} under ${kind}opia, floor ${floor}`);
      }
    }
  }
});
