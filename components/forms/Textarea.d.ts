import * as React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { invalid?: boolean }
/**
 * Same invalid contract as `Input`: `invalid` sets `aria-invalid` and the colour
 * follows the attribute. No autogrow — a box that changes height while you type moves
 * the Save button out from under the cursor. Set `rows` for the size you expect.
 */
/** Forwards its ref to the underlying <textarea>, so
 *  react-hook-form and imperative .focus() reach the real control. */
export declare const Textarea: React.ForwardRefExoticComponent<
  TextareaProps & React.RefAttributes<HTMLTextAreaElement>
>;
