import * as React from "react";

export interface SplitProps extends React.HTMLAttributes<HTMLElement> {
  /** Rail width. Collapses to one column below 1024px (`--lw-bp-lg`). */
  rail?: string | number;
  side?: "start" | "end";
  /** The gutter between the columns. 96 for a marketing band whose two halves
   *  are a statement and its evidence rather than a page and its rail. */
  gap?: 24 | 48 | 96;
  as?: string;
}
/** A main column and a rail. Children in source order. */
export declare function Split(props: SplitProps): React.JSX.Element;
