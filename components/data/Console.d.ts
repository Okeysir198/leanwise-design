import * as React from "react";

export interface ConsoleCell {
  text?: React.ReactNode;
  /** Right-align and tabularise — for counts, sizes, durations. */
  num?: boolean;
  muted?: boolean;
}

export interface ConsoleLine {
  /** Timestamp or prefix, rendered faint. */
  t?: string;
  text: React.ReactNode;
  tone?: "ok" | "warn" | "err";
  /** Aligned fields. Prefer this over padding `text` with runs of spaces. */
  cells?: (string | ConsoleCell)[];
}
export interface ConsoleProps extends React.HTMLAttributes<HTMLDivElement> {
  url?: string;
  title?: React.ReactNode;
  lines?: ConsoleLine[];
  foot?: React.ReactNode;
}
export declare function Console(props: ConsoleProps): JSX.Element;