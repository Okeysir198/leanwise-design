import * as React from "react";

export interface StateViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * `error` and `offline` announce with `role="alert"`; `loading` uses
   * `role="status"` + `aria-busy` — an interruption and a progress report are
   * not the same announcement.
   */
  variant?: "empty" | "loading" | "error" | "offline" | "denied";
  /** A glyph NAME. Overrides the preset for the variant. */
  icon?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Your own control. Exactly one — a dead end with three buttons is three guesses. */
  action?: React.ReactNode;
  actionLabel?: string;
  onAction?(): void;
  /** Skeleton line count for `loading`. */
  lines?: number;
}
/** The five-state set: empty · loading · error · offline · denied. */
export declare function StateView(props: StateViewProps): JSX.Element;
