/**
 * Per-tenant theming — @leanwise/design/brand
 *
 *   import { brandVars } from "@leanwise/design/brand";
 *   <div style={brandVars(org?.accent, resolvedTheme)}>…</div>
 *
 * One hex in, the shadcn brand vars out: --primary, --primary-foreground,
 * --ring, their sidebar twins and the --brand-50..900 ramp. Scope the result to
 * the workspace element, not <html>. Returns {} when there is no usable colour,
 * so the LeanWise theme applies unchanged.
 *
 * Maths is OKLCH, the space theme.css is authored in. The tenant's hue is kept;
 * lightness is clamped into the band where white ink clears AA, and chroma is
 * floored so a muted pick still reads as a brand.
 */

const L_MIN = 0.38, L_MAX = 0.52, C_MIN = 0.04, C_ACHROMATIC = 0.02;
const DARK_L = 0.725;
const WHITE = "#FFFFFF", NAVY = "#152B45", DARK_BG = "#0E1E33";

/* Lightness of every ramp tier; 600 is the anchor. Chroma is a share of the anchor's. */
const LIGHT_TIERS = { 50: [0.982, 0.15], 100: [0.958, 0.33], 200: [0.915, 0.6], 300: [0.85, 0.9], 400: [0.76, 1.1] };
const DARK_TIERS = { 700: [-0.075, 0.9], 800: [-0.105, 0.9], 900: [-0.13, 1.1] };

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const delin = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

/** #rgb / #rrggbb / rrggbb → [r,g,b] in 0..1, or null. */
export function parseHex(hex) {
  if (typeof hex !== "string") return null;
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}

export const toHex = (rgb) =>
  "#" + rgb.map((c) => Math.round(clamp(c, 0, 1) * 255).toString(16).padStart(2, "0")).join("").toUpperCase();

export function rgbToOklch(rgb) {
  const [r, g, b] = rgb.map(lin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [L, Math.hypot(a, B), ((Math.atan2(B, a) * 180) / Math.PI + 360) % 360];
}

export function oklchToRgb([L, C, H]) {
  const a = C * Math.cos((H * Math.PI) / 180), b = C * Math.sin((H * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map(delin);
}

const inGamut = (rgb) => rgb.every((c) => c >= -1e-4 && c <= 1 + 1e-4);

/** OKLCH → hex, reducing chroma until the colour is displayable. */
function paint([L, C, H]) {
  let c = C;
  while (c > 0 && !inGamut(oklchToRgb([L, c, H]))) c -= 0.002;
  return toHex(oklchToRgb([L, Math.max(c, 0), H]));
}

export function luminance(rgb) {
  const [r, g, b] = rgb.map((c) => lin(clamp(c, 0, 1)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast between two colours given as hex or rgb (0..1). */
export function contrast(a, b) {
  const [x, y] = [a, b].map((c) => luminance(typeof c === "string" ? parseHex(c) : c));
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

const inkFor = (fill, light, dark) => (contrast(fill, light) >= contrast(fill, dark) ? light : dark);

/** The clamped anchor [L, C, H], or null for no/achromatic input. */
function anchorOf(hex) {
  const rgb = parseHex(hex);
  if (!rgb) return null;
  const [L, C, H] = rgbToOklch(rgb);
  if (C < C_ACHROMATIC) return null;
  return [clamp(L, L_MIN, L_MAX), Math.max(C, C_MIN), H];
}

/** The --brand-50..900 ramp as hex, 600 being the clamped anchor. */
export function brandRamp(hex) {
  const anchor = anchorOf(hex);
  if (!anchor) return null;
  const [L, C, H] = anchor;
  const out = {};
  for (const [k, [l, f]] of Object.entries(LIGHT_TIERS)) out[k] = paint([l, C * f, H]);
  out[500] = paint([L + 0.07, C * 1.1, H]);
  out[600] = paint(anchor);
  for (const [k, [dl, f]] of Object.entries(DARK_TIERS)) out[k] = paint([Math.max(L + dl, 0.25), C * f, H]);
  return out;
}

/** The hex actually painted as --primary in light mode. */
export function clampedHex(hex) {
  const anchor = anchorOf(hex);
  return anchor ? paint(anchor) : null;
}

/** True when the tenant's hex survives the clamp unchanged. */
export function isInBand(hex) {
  const rgb = parseHex(hex);
  if (!rgb) return false;
  const [L, C] = rgbToOklch(rgb);
  return L >= L_MIN && L <= L_MAX && C >= C_MIN;
}

/**
 * The style object. `scheme` is the resolved theme — pass useTheme().resolved so
 * it re-renders on change. A tenant owns --primary and --ring, never --accent.
 */
export function brandVars(hex, scheme = "light") {
  const anchor = anchorOf(hex);
  if (!anchor) return {};
  const ramp = brandRamp(hex);
  const primary = scheme === "dark" ? paint([DARK_L, anchor[1] * 1.3, anchor[2]]) : ramp[600];
  const ink = scheme === "dark" ? inkFor(primary, DARK_BG, WHITE) : inkFor(primary, WHITE, NAVY);
  const out = {};
  for (const [k, v] of Object.entries(ramp)) out[`--brand-${k}`] = v;
  out["--primary"] = primary;
  out["--primary-foreground"] = ink;
  out["--ring"] = primary;
  out["--sidebar-primary"] = primary;
  out["--sidebar-primary-foreground"] = ink;
  out["--sidebar-ring"] = primary;
  out["--chart-1"] = primary;
  return out;
}
