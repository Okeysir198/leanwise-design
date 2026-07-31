import * as React from "react";

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  /** Minimum column width before the grid drops a column. Default 240px. */
  min?: string | number;
  gap?: 16 | 24;
  as?: string;
}
export declare function Grid(props: GridProps): React.JSX.Element;
