import * as React from "react";

export interface ToolCallProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The function name, rendered in mono — it is an identifier, not prose. */
  name: string;
  /** One line of what it did. Shown collapsed; keep it scannable. */
  summary?: React.ReactNode;
  /** Objects are JSON-formatted; strings are printed as given. */
  args?: unknown;
  result?: unknown;
  /** Present means failed, whatever `state` says. */
  error?: unknown;
  state?: "pending" | "running" | "ok" | "error";
  duration?: number;
  /* --- Display text. Every user-visible string this component renders is a
     prop, because a component library cannot hold display text (v1.3.1). --- */
  defaultOpen?: boolean;
  /** The `.lw-sr-only` state word — the dot is the sighted signal. */
  stateLabels?: Partial<Record<"pending" | "running" | "ok" | "error", string>>;
  argsLabel?: React.ReactNode;
  errorLabel?: React.ReactNode;
  resultLabel?: React.ReactNode;
  formatDuration?(ms: number): React.ReactNode;
}
/** One tool invocation — the evidence behind an `AgentTrace` step. */
export declare function ToolCall(props: ToolCallProps): React.JSX.Element;
