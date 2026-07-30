import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
}
/**
 * `invalid` sets `aria-invalid`, and the colour is bound to that attribute rather
 * than to a class — the attribute is what a screen reader reads, so the two cannot
 * desync. Normally you do not pass it: wrap the input in a `Field` with `error` and
 * Field wires the attribute, the description and the ring together.
 */
export declare function Input(props: InputProps): JSX.Element;
