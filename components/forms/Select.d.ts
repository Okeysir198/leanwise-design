import * as React from "react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: Array<string | { value: string; label: string }>;
  invalid?: boolean;
}
/**
 * The native `select`, with a CSS chevron rather than a JS listbox — the platform
 * control is keyboard-complete, screen-reader-correct and renders as the OS picker on
 * a phone, which no custom implementation matches. `options` takes bare strings when
 * the value and the label are the same, `{value,label}` when they are not.
 */
/** Forwards its ref to the underlying <select>, so
 *  react-hook-form and imperative .focus() reach the real control. */
export declare const Select: React.ForwardRefExoticComponent<
  SelectProps & React.RefAttributes<HTMLSelectElement>
>;
