import type { CSSProperties } from "react";

export type Rgb = [number, number, number];
export type Oklch = [number, number, number];
export type Scheme = "light" | "dark";
export type BrandTier = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

/** Tenant overrides of --primary, --ring, their sidebar twins and --brand-*; {} when there is no usable colour. */
export function brandVars(hex?: string | null, scheme?: Scheme): CSSProperties;
/** The --brand-50..900 ramp as hex; 600 is the clamped anchor. */
export function brandRamp(hex?: string | null): Record<BrandTier, string> | null;
export function clampedHex(hex?: string | null): string | null;
export function isInBand(hex?: string | null): boolean;
/** Channels in 0..1. */
export function parseHex(hex?: string | null): Rgb | null;
export function toHex(rgb: Rgb): string;
export function rgbToOklch(rgb: Rgb): Oklch;
export function oklchToRgb(oklch: Oklch): Rgb;
export function luminance(rgb: Rgb): number;
export function contrast(a: Rgb | string, b: Rgb | string): number;
