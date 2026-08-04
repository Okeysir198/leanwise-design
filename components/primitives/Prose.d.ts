import * as React from "react";

export interface ProseProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Reading width. "prose" is 68ch, "narrow" 46ch (the same measure as
   * `.lw-measure-sm`). A third width is `--lw-prose-max`, not an override.
   */
  measure?: "prose" | "narrow";
  /** Override the element. `article` and `section` are the usual two. */
  as?: React.ElementType;
  children?: React.ReactNode;
}
export declare function Prose(props: ProseProps): React.JSX.Element;
