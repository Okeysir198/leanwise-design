import * as React from "react";

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  /** Minimum column width before the grid drops a column. Default 240px. */
  min?: string | number;
  gap?: 16 | 24;
  /**
   * Share row tracks between the `.lw-card` children (CSS subgrid), so the
   * same child sits at the same height in every card of a row — a two-card
   * comparison whose bullets sit against each other, at any text length, in
   * any locale. The count is how many rows each card spans: count the aligned
   * children in the TALLEST card, and make any wrapper between a card and
   * those children `display: contents` (a plain wrapper would be one row
   * holding all of them). Without subgrid support the card is an ordinary
   * grid stacking its children — the column it always was.
   */
  alignRows?: number;
  as?: string;
}
export declare function Grid(props: GridProps): React.JSX.Element;
