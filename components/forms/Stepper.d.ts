import * as React from "react";

export interface Step {
  key?: string | number;
  label: React.ReactNode;
  hint?: React.ReactNode;
  /** Override the state derived from `current`. `error` marks a step to go back to. */
  state?: "done" | "current" | "upcoming" | "error";
}
export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  current?: number;
  /** Omit to make the stepper display-only. Only done and error steps are clickable. */
  onStepChange?(index: number): void;
  vertical?: boolean;
  label?: string;
}
/** Wizard progress. The marker carries the state, so it survives greyscale. */
export declare function Stepper(props: StepperProps): React.JSX.Element;
