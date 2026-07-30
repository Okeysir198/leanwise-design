import * as React from "react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  /** Renders a radio: round box, single choice. */
  radio?: boolean;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;