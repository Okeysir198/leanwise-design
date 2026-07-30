import * as React from "react";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Renders a dismiss control. Opt-in — an auto-dismissing toast should not also carry an X. */
  onClose?: () => void;
  tone?: "info" | "ok" | "warn" | "err";
  /** Overrides the mono status word. */
  label?: string;
}
export declare function Toast(props: ToastProps): JSX.Element;
export declare function ToastRegion(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;