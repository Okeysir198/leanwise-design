import * as React from "react";

export interface ProgressProps extends React.HTMLAttributes<HTMLSpanElement> {
  value?: number;
  /** Default 100. `value`/`max` is clamped to 0–100. */
  max?: number;
  /** Accessible name. Required when nothing beside it names the bar. */
  label?: string;
  /** `ok` / `warn` / `err` for a bar that has to carry a judgement too. */
  tone?: "ok" | "warn" | "err";
}
/**
 * Determinate progress with real `role="progressbar"` values. For work with no
 * known extent use `Skeleton` — a bar that moves without knowing how far along
 * it is reports a number it does not have.
 */
export declare function Progress(props: ProgressProps): JSX.Element;
