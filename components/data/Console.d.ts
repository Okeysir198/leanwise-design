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
/** Note the `Omit`: this component gives `title` a richer meaning than the DOM
 *  attribute of the same name, so the inherited one has to be removed or the
 *  interface does not extend cleanly. Invisible until v1.2 — there was no
 *  tsconfig, so `tsc` had never run over these declarations. */
export interface ConsoleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  url?: string;
  title?: React.ReactNode;
  lines?: ConsoleLine[];
  foot?: React.ReactNode;
}
export declare function Console(props: ConsoleProps): React.JSX.Element;