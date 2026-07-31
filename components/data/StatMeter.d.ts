import * as React from "react";

export interface StatMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  value: React.ReactNode;
  unit?: React.ReactNode;
  delta?: React.ReactNode;
  /** Drives the delta's tone. "watch" is amber. */
  direction?: "up" | "down" | "watch";
  /** 0-100. Omit for a bare stat with no bar. */
  percent?: number;
  /** 0-100. The marker a reader judges the value against. */
  target?: number;
  tone?: "warning" | "danger";
  foot?: React.ReactNode;
  interactive?: boolean;
}
export declare function StatMeter(props: StatMeterProps): React.JSX.Element;
