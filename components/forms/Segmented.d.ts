import * as React from "react";

export interface SegmentedProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options?: Array<string | { value: string; label: React.ReactNode }>;
  value?: string;
  onChange?: (value: string) => void;
  /** Accessible name for the group. Required in practice. */
  label?: string;
}
export declare function Segmented(props: SegmentedProps): JSX.Element;