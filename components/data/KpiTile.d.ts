import * as React from "react";
import type { Tone, LegacyTone } from "../_tone";

export interface KpiTileProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  /** A glyph name marking the tile's subject. Sits opposite the label. */
  icon?: string;
  /** Semantic family for the icon's tint — the tile's SUBJECT, not its movement.
   *  Keep it distinct from `tone`, which judges the delta. Defaults to brand. */
  accent?: Extract<Tone, "brand" | "success" | "danger" | "warning" | "neutral"> | LegacyTone;
  delta?: React.ReactNode;
  /** Which way the number moved — draws the arrow glyph. */
  direction?: "up" | "down";
  /** Whether that movement is good — sets the ink. Defaults to `direction`.
   *  Pass explicitly wherever down is good (latency, cost, error count). */
  tone?: Extract<Tone, "success" | "danger"> | LegacyTone;
  /**
   * A few words beside the delta — "vs last week", a unit, a caveat. It sits in
   * the delta row, so keep it SHORT: a full sentence belongs under the tile, not
   * in it. It wraps (since v1.10.2) rather than overflowing, but a wrapped
   * sentence in a delta row still reads as a delta.
   */
  note?: React.ReactNode;
}
export declare function KpiTile(props: KpiTileProps): React.JSX.Element;
