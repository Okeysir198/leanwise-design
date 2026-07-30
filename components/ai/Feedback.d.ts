import * as React from "react";

export interface FeedbackProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: "up" | "down" | null;
  onChange?(value: "up" | "down" | null): void;
  /** Omit and the down state collects a number nobody can act on. */
  onComment?(text: string): void;
  commentPlaceholder?: string;
  note?: React.ReactNode;
}
/** Thumbs plus a correction path — what makes evals possible later. */
export declare function Feedback(props: FeedbackProps): JSX.Element;
