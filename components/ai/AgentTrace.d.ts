import * as React from "react";

export interface TraceStep {
  label: React.ReactNode;
  /** Tool call, duration, token count — whatever makes the step checkable. */
  meta?: React.ReactNode;
  state?: "pending" | "active" | "done" | "error";
}
export interface AgentTraceProps extends React.HTMLAttributes<HTMLOListElement> { steps?: TraceStep[] }
/** @deprecated Unused by any consumer as of v2.0; candidate for removal in v3.0 — say so in an issue if you adopt it. */
export declare function AgentTrace(props: AgentTraceProps): React.JSX.Element;