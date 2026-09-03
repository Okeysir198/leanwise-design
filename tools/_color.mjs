/**
 * The colour maths the gates share.
 *
 * Extracted from lw-contrast-check.mjs in v1.13.0 so a second tool that needs
 * a luminance or a dE (a future palette generator, a card that prints ratios)
 * does not grow its own copy — the CSS reader in _css.mjs exists for the same
 * reason and the same lesson: three parsers, one of them stale, shipped a
 * gutted tokens.json.
 *
 * Every channel here is 0..1, NOT 0..255. `hslToRgb` returns normalised values
 * and `luminance` consumes them that way; dividing by 255 again collapses every
 * colour to near-black, which showed up as dE 0.2 between obviously different
 * hues the first time the chart-separation check ran.
 */

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

/** { r, g, b } in 0..1 -> `#RRGGBB`, upper-case. */
export function rgbToHex({ r, g, b }) {
  return "#" + [r, g, b].map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("").toUpperCase();
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
