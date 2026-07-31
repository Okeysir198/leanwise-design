import * as React from "react";

export interface KpiTileProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  /** A glyph name marking the tile's subject. Sits opposite the label. */
  icon?: string;
  /** Semantic family for the icon's tint — the tile's SUBJECT, not its movement.
   *  Keep it distinct from `tone`, which judges the delta. Defaults to brand. */
  accent?: "brand" | "pos" | "neg" | "warn" | "neutral";
  delta?: React.ReactNode;
  /** Which way the number moved — draws the arrow glyph. */
  direction?: "up" | "down";
  /** Whether that movement is good — sets the ink. Defaults to `direction`.
   *  Pass explicitly wherever down is good (latency, cost, error count). */
  tone?: "pos" | "neg";
  note?: React.ReactNode;
}
export declare function KpiTile(props: KpiTileProps): React.JSX.Element;
