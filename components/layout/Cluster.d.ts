import * as React from "react";

export interface ClusterProps extends React.HTMLAttributes<HTMLElement> {
  gap?: 8 | 12 | 16 | 24;
  justify?: "start" | "between" | "end";
  align?: "center" | "baseline";
  /**
   * `false` for the ICON-AND-PROSE row: one fixed glyph beside a sentence that is
   * allowed to wrap *within its own box*. The default (`true`) is a wrapping row,
   * and for a chip or button group that is right — but a wrap container moves an
   * item that does not fit onto the NEXT LINE instead of shrinking it, so an
   * `<Icon/> + <span>a sentence</span>` pair drops the sentence under the glyph the
   * moment it runs past one line. Short labels look correct, which is why this
   * survives review; set `wrap={false}` for any row whose text is a sentence.
   */
  wrap?: boolean;
  as?: string;
}
/**
 * A row that WRAPS. Use it for anything whose count is not fixed — button groups,
 * chips, filters, breadcrumb tails — because the version that does not wrap fails the
 * first time someone adds a fourth item or translates the labels into German.
 * `align="baseline"` when the items have different type sizes; `center` otherwise.
 * `wrap={false}` for an icon beside a sentence — see the prop.
 */
export declare function Cluster(props: ClusterProps): React.JSX.Element;