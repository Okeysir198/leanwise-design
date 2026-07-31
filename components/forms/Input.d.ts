import * as React from "react";

/** Note the `Omit`: this component gives `size` a richer meaning than the DOM
 *  attribute of the same name, so the inherited one has to be removed or the
 *  interface does not extend cleanly. Invisible until v1.2 — there was no
 *  tsconfig, so `tsc` had never run over these declarations. */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
}
/**
 * `invalid` sets `aria-invalid`, and the colour is bound to that attribute rather
 * than to a class — the attribute is what a screen reader reads, so the two cannot
 * desync. Normally you do not pass it: wrap the input in a `Field` with `error` and
 * Field wires the attribute, the description and the ring together.
 */
/** Forwards its ref to the underlying <input>, so
 *  react-hook-form and imperative .focus() reach the real control. */
export declare const Input: React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
>;
