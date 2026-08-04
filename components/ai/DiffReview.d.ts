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
  /* --- Display text. Every user-visible string this component renders is a
     prop, because a component library cannot hold display text (v1.3.1). --- */
  label?: string;
  acceptLabel?: React.ReactNode;
  rejectLabel?: React.ReactNode;
  undoLabel?: React.ReactNode;
  acceptAllLabel?: React.ReactNode;
  rejectAllLabel?: React.ReactNode;
  acceptedLabel?: React.ReactNode;
  rejectedLabel?: React.ReactNode;
  /** The `.lw-sr-only` prefix per diff line — what the gutter sign says in words. */
  kindLabels?: Record<"add" | "del" | "mod", string>;
  /** The `aria-live` progress summary. */
  formatProgress?(pending: number, total: number): React.ReactNode;
}
/** Per-hunk accept/reject. The gutter carries the sign, not just the ground. */
export declare function DiffReview(props: DiffReviewProps): React.JSX.Element;
