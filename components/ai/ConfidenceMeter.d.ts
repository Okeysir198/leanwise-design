import * as React from "react";

export interface ConfidenceMeterProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 0-100. */
  value?: number;
  label?: string;
}
/** @deprecated Unused by any consumer as of v2.0; candidate for removal in v3.0 — say so in an issue if you adopt it. */
export declare function ConfidenceMeter(props: ConfidenceMeterProps): React.JSX.Element;