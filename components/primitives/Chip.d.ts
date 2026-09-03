import * as React from "react";
import type { Tone, LegacyTone } from "../_tone";

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Extract<Tone, "brand" | "success" | "warning" | "danger" | "neutral"> | LegacyTone;
}
/**
 * The status atom. `tone` names the JUDGEMENT, not the colour, so a status that
 * changes meaning changes one word here rather than a hex somewhere else. Every tone
 * pairs a dot glyph with its tint — a chip must not rely on colour alone, because
 * "passing" and "failed" have to survive a colour-blind reader and a greyscale print.
 */
export declare function Chip(props: ChipProps): React.JSX.Element;