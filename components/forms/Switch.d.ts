import * as React from "react";

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}
/**
 * For a setting that applies IMMEDIATELY. If the change needs a Save button, it is a
 * Checkbox — a switch that does nothing until you submit tells the user their change
 * has already taken effect. `label` is part of the control (it is the `<label>`), so
 * the text is a hit target too and reaches 44px on a coarse pointer.
 */
/** Forwards its ref to the underlying <input>, so
 *  react-hook-form and imperative .focus() reach the real control. */
export declare const Switch: React.ForwardRefExoticComponent<
  SwitchProps & React.RefAttributes<HTMLInputElement>
>;
