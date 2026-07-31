import * as React from "react";

/** Note the `Omit`: this component gives `title` a richer meaning than the DOM
 *  attribute of the same name, so the inherited one has to be removed or the
 *  interface does not extend cleanly. Invisible until v1.2 — there was no
 *  tsconfig, so `tsc` had never run over these declarations. */
export interface StateViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
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
export declare function StateView(props: StateViewProps): React.JSX.Element;
