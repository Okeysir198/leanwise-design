import * as React from "react";

/** Note the `Omit`: this component gives `onChange` a richer meaning than the DOM
 *  attribute of the same name, so the inherited one has to be removed or the
 *  interface does not extend cleanly. Invisible until v1.2 — there was no
 *  tsconfig, so `tsc` had never run over these declarations. */
export interface FeedbackProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: "up" | "down" | null;
  onChange?(value: "up" | "down" | null): void;
  /** Omit and the down state collects a number nobody can act on. */
  onComment?(text: string): void;
  commentPlaceholder?: string;
  note?: React.ReactNode;
}
/** Thumbs plus a correction path — what makes evals possible later. */
export declare function Feedback(props: FeedbackProps): React.JSX.Element;
