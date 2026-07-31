const L_MIN = 20, L_MAX = 50, S_MIN = 26, S_MAX = 92;
const S_ACHROMATIC = 8;
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
const round = (n, p = 1) => Math.round(n * 10 ** p) / 10 ** p;
function parseHex(hex) {
  if (typeof hex !== "string") return null;
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function luminance([r, g, b]) {
  const f = (v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
function rgbToHsl([r, g, b]) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min, l = (max + min) / 2;
  let h = 0, s = 0;
  if (d) {
    s = d / (1 - Math.abs(2 * l - 1));
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h *= 60;
  }
  return [h, s * 100, l * 100];
}
function hslToRgb([h, s, l]) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)].map((v) => Math.round(v * 255));
}
const triple = ([h, s, l]) => `${round(h)} ${round(s)}% ${round(l)}%`;
const WHITE = [255, 255, 255], NAVY = [11, 18, 32];
function brandRamp(hex) {
  const rgb = parseHex(hex);
  if (!rgb) return null;
  const [h, s0, l0] = rgbToHsl(rgb);
  if (s0 < S_ACHROMATIC) return null;
  const s = clamp(s0, S_MIN, S_MAX);
  const l = clamp(l0, L_MIN, L_MAX);
  const anchor = [h, s, l];
  const tier = (dl, ds = 0) => [h, clamp(s + ds, 0, 100), clamp(l + dl, 4, 97)];
  return {
    anchor,
    ink: contrast(hslToRgb(anchor), WHITE) >= contrast(hslToRgb(anchor), NAVY) ? WHITE : NAVY,
    tiers: {
      50: tier(70 - l * 0.28, -14),
      100: tier(64 - l * 0.28, -16),
      200: tier(54 - l * 0.26, -18),
      300: tier(38 - l * 0.2, -22),
      400: tier(21, -20),
      500: anchor,
      600: tier(-5.5, 4),
      700: tier(-10, 6)
    }
  };
}
function brandVars(hex, scheme = "light") {
  const ramp = brandRamp(hex);
  if (!ramp) return {};
  const { tiers, ink } = ramp;
  const out = {};
  for (const [k, v] of Object.entries(tiers)) {
    out[`--lw-brand-${k}-c`] = triple(v);
    out[`--lw-brand-${k}`] = `hsl(${triple(v)})`;
  }
  const accent = triple(scheme === "dark" ? tiers[400] : tiers[500]);
  out["--lw-brand-text-c"] = accent;
  out["--lw-brand-text"] = `hsl(${accent})`;
  out["--primary"] = triple(tiers[500]);
  out["--primary-foreground"] = ink === WHITE ? "0 0% 100%" : "220.5 48.9% 8.4%";
  out["--ring"] = accent;
  out["--lw-focus-ring"] = `0 0 0 2px hsl(${accent})`;
  return out;
}
function clampedHex(hex) {
  const ramp = brandRamp(hex);
  if (!ramp) return null;
  return "#" + hslToRgb(ramp.anchor).map((v) => v.toString(16).padStart(2, "0")).join("");
}
function isInBand(hex) {
  const rgb = parseHex(hex);
  if (!rgb) return false;
  const [, s, l] = rgbToHsl(rgb);
  return s >= S_MIN && s <= S_MAX && l >= L_MIN && l <= L_MAX;
}
export {
  brandRamp,
  brandVars,
  clampedHex,
  contrast,
  hslToRgb,
  isInBand,
  luminance,
  parseHex,
  rgbToHsl
};
