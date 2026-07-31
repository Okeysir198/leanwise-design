import * as React from "react";

export interface FieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  label?: React.ReactNode;
  help?: React.ReactNode;
  /** When set, replaces help and marks the control invalid. */
  error?: React.ReactNode;
  required?: boolean;
  optional?: boolean;
  /** Id of the control inside. Also wires aria-describedby. */
  htmlFor?: string;
  /** A node, or a render fn receiving the a11y props to spread on the control. */
  children?: React.ReactNode | ((a11y: Record<string, unknown>) => React.ReactNode);
}
export declare function Field(props: FieldProps): React.JSX.Element;