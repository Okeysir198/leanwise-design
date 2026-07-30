import * as React from "react";

export interface TraceStep {
  label: React.ReactNode;
  /** Tool call, duration, token count — whatever makes the step checkable. */
  meta?: React.ReactNode;
  state?: "pending" | "active" | "done" | "error";
}
export interface AgentTraceProps extends React.HTMLAttributes<HTMLOListElement> { steps?: TraceStep[] }
export declare function AgentTrace(props: AgentTraceProps): JSX.Element;