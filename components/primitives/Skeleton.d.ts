import * as React from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  shape?: "block" | "text" | "circle";
  width?: string | number;
  height?: string | number;
  /** Renders N text bars, the last one short. */
  lines?: number;
}
export declare function Skeleton(props: SkeletonProps): React.JSX.Element;