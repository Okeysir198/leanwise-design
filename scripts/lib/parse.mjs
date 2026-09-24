/* A palette value (hex or `oklch(L C H)`) -> sRGB [r,g,b] 0..1, OKLCH or hex. */
import { hex2rgb, ok2rgb, rgb2ok, clampOk, rgb2hex } from "./oklch.mjs";

export function toRgb(v) {
  const s = String(v).trim();
  if (/^#[0-9a-f]{6}$/i.test(s)) return hex2rgb(s);
  const m = s.match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/i);
  if (m) return ok2rgb(clampOk(m.slice(1).map(Number)));
  throw new Error(`unparseable colour: ${v}`);
}
export const toOk = (v) => rgb2ok(toRgb(v));
export const toHex = (v) => rgb2hex(toRgb(v));
export const obj = ([r, g, b]) => ({ r, g, b });
