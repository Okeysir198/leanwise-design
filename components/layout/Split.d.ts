import * as React from "react";

export interface SplitProps extends React.HTMLAttributes<HTMLElement> {
  /** Rail width. Collapses to one column below 1024px (`--lw-bp-lg`). */
  rail?: string | number;
  side?: "start" | "end";
  as?: string;
}
/** A main column and a rail. Children in source order. */
export declare function Split(props: SplitProps): JSX.Element;
