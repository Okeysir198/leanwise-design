/**
 * The one vocabulary for "what judgement does this carry", shared by every
 * component that takes a `tone`-shaped prop.
 *
 * It is the spelling `tokens.css` already used: `.lw-toast.danger` has always set
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

export declare const TONES: Tone[];
