import * as React from "react";

export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  gap?: 4 | 8 | 12 | 16 | 20 | 24 | 32 | 48 | 64;
  as?: string;
}
/**
 * Vertical rhythm. `gap` is a spacing TOKEN, not a free number, so the vertical scale
 * of a page is drawn from the same nine values everywhere and a review can quote the
 * one that is wrong. Prefer a Stack over margins on the children: margin collapse and
 * last-child resets are where vertical spacing bugs live.
 */
export declare function Stack(props: StackProps): JSX.Element;