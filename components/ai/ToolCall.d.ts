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
  defaultOpen?: boolean;
}
/** One tool invocation — the evidence behind an `AgentTrace` step. */
export declare function ToolCall(props: ToolCallProps): React.JSX.Element;
