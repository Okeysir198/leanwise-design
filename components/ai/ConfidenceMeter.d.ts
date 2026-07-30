import * as React from "react";

export interface ConfidenceMeterProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 0-100. */
  value?: number;
  label?: string;
}
export declare function ConfidenceMeter(props: ConfidenceMeterProps): JSX.Element;