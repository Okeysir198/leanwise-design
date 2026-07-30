import * as React from "react";

export interface DiffLine {
  /** Line number in the target file. Omit for context that has none. */
  n?: number | string;
  /** Omit for unchanged context. */
  kind?: "add" | "del" | "mod";
  text: string;
}
export interface DiffHunk {
  id: string | number;
  file: string;
  /** "L120–L134" or similar. Display only. */
  range?: string;
  lines: DiffLine[];
  /** Why the model proposes this. Shown until a decision is made. */
  note?: React.ReactNode;
}
export type DiffDecision = "accepted" | "rejected" | null;
export interface DiffReviewProps extends React.HTMLAttributes<HTMLDivElement> {
  hunks: DiffHunk[];
  /** Keyed by hunk id. Absent means undecided. */
  decisions?: Record<string, DiffDecision>;
  onDecide?(id: string | number, decision: DiffDecision): void;
  onAcceptAll?(): void;
  onRejectAll?(): void;
  label?: string;
}
/** Per-hunk accept/reject. The gutter carries the sign, not just the ground. */
export declare function DiffReview(props: DiffReviewProps): JSX.Element;
