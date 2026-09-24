/* Colour maths for the gates. Channels are 0..1 throughout. */

/** HSL (h in degrees, s and l in PERCENT) -> { r, g, b } in 0..1. */
export function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: f(0), g: f(8), b: f(4) };
}

/** `abc` or `aabbcc` (no leading #) -> { r, g, b } in 0..1. */
export function hexToRgb(hex) {
  const h = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
  return { r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255 };
}

/**
 * WCAG 2.1 relative luminance. Accepts `{ r, g, b }` or `[r, g, b]` — the
 * contrast gate composites alpha into a bare array before calling it.
 */
export function luminance(c) {
  const [r, g, b] = Array.isArray(c) ? c : [c.r, c.g, c.b];
  const lin = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/**
 * Contrast between a foreground and its background. If the foreground has alpha
 * (the --lw-on-dark* tier), it is composited OVER the background first — that is
 * the color the viewer actually perceives, and the only honest basis for the ratio.
 */
export function contrast(fg, bg) {
  const a = fg.a ?? 1;
  const eff = [
    a * fg.r + (1 - a) * bg.r,
    a * fg.g + (1 - a) * bg.g,
    a * fg.b + (1 - a) * bg.b,
  ];
  const [hi, lo] = [luminance(eff), luminance([bg.r, bg.g, bg.b])].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** sRGB { r, g, b } in 0..1 -> CIE L*a*b*, D65. */
export function toLab({ r, g, b }) {
  const lin = (v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const [R, G, B] = [lin(r), lin(g), lin(b)];
  const X = (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047;
  const Y = (R * 0.2126 + G * 0.7152 + B * 0.0722) / 1.0;
  const Z = (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883;
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const [fx, fy, fz] = [f(X), f(Y), f(Z)];
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

/** CIE76 colour difference — plain Euclidean distance in Lab. */
export const deltaE76 = (a, b) => {
  const [la, lb] = [toLab(a), toLab(b)];
  return Math.hypot(la[0] - lb[0], la[1] - lb[1], la[2] - lb[2]);
};

/* Dichromat simulation: Viénot, Brettel & Mollon (1999), in linear light. */
const RGB_TO_LMS = [[0.31399, 0.63951, 0.04649], [0.15537, 0.75789, 0.08670], [0.01775, 0.10944, 0.87259]];
const LMS_TO_RGB = [[5.47221, -4.64196, 0.16963], [-1.12524, 2.29317, -0.16789], [0.02980, -0.19318, 1.16364]];
const DICHROMAT = {
  protan: [[0, 1.05118294, -0.05116099], [0, 1, 0], [0, 0, 1]],
  deutan: [[1, 0, 0], [0.9513092, 0, 0.04866992], [0, 0, 1]],
  tritan: [[1, 0, 0], [0, 1, 0], [-0.86744736, 1.86727089, 0]],
};
export const CVD_KINDS = Object.keys(DICHROMAT);

/** Simulate dichromacy. `kind` is protan | deutan | tritan; { r, g, b } in 0..1. */
export function simulateCvd({ r, g, b }, kind) {
  const M = DICHROMAT[kind];
  if (!M) throw new Error(`unknown CVD kind: ${kind}`);
  const toLin = (v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const toSrgb = (v) => (v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1 / 2.4) - 0.055);
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const apply = (m, v) => m.map((row) => row[0] * v[0] + row[1] * v[1] + row[2] * v[2]);
  const out = apply(LMS_TO_RGB, apply(M, apply(RGB_TO_LMS, [toLin(r), toLin(g), toLin(b)])));
  return { r: clamp(toSrgb(clamp(out[0]))), g: clamp(toSrgb(clamp(out[1]))), b: clamp(toSrgb(clamp(out[2]))) };
}

/** Worst-case CIE76 between two colours across all three dichromacies. */
export function deltaE76Cvd(a, b) {
  let worst = { d: Infinity, kind: null };
  for (const kind of CVD_KINDS) {
    const d = deltaE76(simulateCvd(a, kind), simulateCvd(b, kind));
    if (d < worst.d) worst = { d, kind };
  }
  return worst;
}
