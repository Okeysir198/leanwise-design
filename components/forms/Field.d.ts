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
  /* --- Display text. Every user-visible string this component renders is a
     prop, because a component library cannot hold display text (v1.3.1). --- */
  children?: React.ReactNode | ((a11y: Record<string, unknown>) => React.ReactNode);
  /** The `.lw-sr-only` word beside the asterisk. The asterisk is the convention;
   *  this is what a screen reader actually announces. */
  requiredLabel?: React.ReactNode;
  optionalLabel?: React.ReactNode;
}
export declare function Field(props: FieldProps): React.JSX.Element;