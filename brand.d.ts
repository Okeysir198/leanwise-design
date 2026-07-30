import type { CSSProperties } from "react";

export type Rgb = [number, number, number];
export type Hsl = [number, number, number];
export type Scheme = "light" | "dark";
export interface BrandRamp { anchor: Hsl; ink: Rgb; tiers: Record<50|100|200|300|400|500|600|700, Hsl>; }
/** Tenant token overrides, or {} when there is no tenant colour. */
export function brandVars(hex?: string | null, scheme?: Scheme): CSSProperties;
export function brandRamp(hex?: string | null): BrandRamp | null;
export function clampedHex(hex?: string | null): string | null;
export function isInBand(hex?: string | null): boolean;
export function parseHex(hex?: string | null): Rgb | null;
export function luminance(rgb: Rgb): number;
export function contrast(a: Rgb, b: Rgb): number;
export function rgbToHsl(rgb: Rgb): Hsl;
export function hslToRgb(hsl: Hsl): Rgb;
