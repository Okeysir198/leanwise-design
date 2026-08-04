import * as React from "react";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Renders a dismiss control. Opt-in — an auto-dismissing toast should not also carry an X. */
  onClose?: () => void;
  tone?: "info" | "ok" | "warn" | "err";
  /** Overrides the mono status word. */
  label?: string;
  /* --- Display text. Every user-visible string this component renders is a
     prop, because a component library cannot hold display text (v1.3.1). --- */
  /** The mono status word per tone, when `label` is not given. */
  toneLabels?: Partial<Record<"info" | "ok" | "warn" | "err", React.ReactNode>>;
  dismissLabel?: string;
}
export declare function Toast(props: ToastProps): React.JSX.Element;
export interface ToastRegionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Raises the live region to `assertive`. */
  urgent?: boolean;
  /** The live region's accessible name. */
  label?: string;
}
export declare function ToastRegion(props: ToastRegionProps): React.JSX.Element;