import * as React from "react";

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "brand" | "success" | "warning" | "danger" | "neutral";
}
/**
 * The status atom. `tone` names the JUDGEMENT, not the colour, so a status that
 * changes meaning changes one word here rather than a hex somewhere else. Every tone
 * pairs a dot glyph with its tint — a chip must not rely on colour alone, because
 * "passing" and "failed" have to survive a colour-blind reader and a greyscale print.
 */
export declare function Chip(props: ChipProps): React.JSX.Element;