import * as React from "react";

/**
 * The one vocabulary for "what judgement does this carry", shared by every
 * component that takes a `tone`-shaped prop.
 *
 * It is the spelling `tokens.css` already used: `.lw-toast.err` has always set
 * `var(--lw-danger-on)`, so the package knew these five things by their full
 * names in the layer that decides what they look like, and disagreed with itself
 * only in the layer you type. See `components/_tone.js`.
 *
 * A component's own union is a SUBSET of this — a Progress bar has no use for
 * `brand`, and there is no `.lw-chip-info`. What is forbidden is spelling a
 * judgement a component does support differently from the token behind it, which
 * `tools/lw-tone.mjs` enforces.
 */
export type Tone = "brand" | "success" | "warning" | "danger" | "neutral" | "info" | "cta";

/**
 * @deprecated Use the canonical spellings — `ok` → `success`, `warn` → `warning`,
 * `err` → `danger`, `pos` → `success`, `neg` → `danger`.
 *
 * Still accepted, and normalised at render with a one-time console warning.
 * Removed at the next MAJOR, per the deprecation policy in CHANGELOG.md. They
 * remain in the types because six consumers pin this package by exact git tag,
 * and a type error on upgrade day is a hard stop for a rename.
 */
export type LegacyTone = "ok" | "warn" | "err" | "pos" | "neg";

export declare const TONES: Tone[];
export declare function normTone<T extends string>(
  component: string,
  value: T | null | undefined,
  prop?: string,
): string | null | undefined;
export declare function normToneMap<T>(
  component: string,
  map: Partial<Record<string, T>> | undefined,
  prop?: string,
): Partial<Record<string, T>> | undefined;
