import * as React from "react";

export interface ClusterProps extends React.HTMLAttributes<HTMLElement> {
  gap?: 8 | 12 | 16 | 24;
  justify?: "start" | "between" | "end";
  align?: "center" | "baseline";
  as?: string;
}
/**
 * A row that WRAPS. Use it for anything whose count is not fixed — button groups,
 * chips, filters, breadcrumb tails — because the version that does not wrap fails the
 * first time someone adds a fourth item or translates the labels into German.
 * `align="baseline"` when the items have different type sizes; `center` otherwise.
 */
export declare function Cluster(props: ClusterProps): JSX.Element;