import * as React from "react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  /** Renders a radio: round box, single choice. */
  radio?: boolean;
}
/** Forwards its ref to the underlying <input>, so
 *  react-hook-form and imperative .focus() reach the real control. */
export declare const Checkbox: React.ForwardRefExoticComponent<
  CheckboxProps & React.RefAttributes<HTMLInputElement>
>;
