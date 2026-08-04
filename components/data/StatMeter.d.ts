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
  /* --- Display text. Every user-visible string this component renders is a
     prop, because a component library cannot hold display text (v1.3.1). --- */
  interactive?: boolean;
  /** The bar's `aria-valuetext`. Only rendered when `target` is set. */
  formatValueText?(percent: number, target: number): string;
}
export declare function StatMeter(props: StatMeterProps): React.JSX.Element;
