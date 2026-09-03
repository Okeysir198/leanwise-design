import * as React from "react";

/* `size` and `type` are both Omitted: `size` carries a richer meaning here than
   the DOM attribute of the same name (Input.d.ts makes the same trade), and
   `type` is owned by the reveal toggle — a caller setting it would be setting
   the thing this component exists to control. */
export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  /** Fires with the Caps Lock state on every key while the field has focus. */
  onCapsLockChange?(on: boolean): void;
  /* --- Display text. Every user-visible string this component renders is a
     prop, because a component library cannot hold display text (v1.3.1). --- */
  /** Accessible name of the reveal button while the password is hidden. */
  revealLabel?: string;
  /** …and while it is visible. The label names the CURRENT state, not the next. */
  hideLabel?: string;
  capsLockLabel?: string;
}
export declare const PasswordInput: React.ForwardRefExoticComponent<
  PasswordInputProps & React.RefAttributes<HTMLInputElement>
>;
