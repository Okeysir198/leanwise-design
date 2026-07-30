import * as React from "react";

export interface SourceChipProps extends React.HTMLAttributes<HTMLElement> {
  n: number | string;
  /** Used for the accessible name. */
  title?: string;
  href?: string;
  as?: string;
}
export declare function SourceChip(props: SourceChipProps): JSX.Element;
