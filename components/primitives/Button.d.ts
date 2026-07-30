import * as React from "react";

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** cta = the amber, max one per view. brand = the cyan default. */
  variant?: "brand" | "cta" | "ink" | "ghost" | "danger" | "link";
  size?: "sm" | "md" | "lg";
  /** Square button. Requires aria-label — there is no text. */
  iconOnly?: boolean;
  /** Hides the label and spins a ring. Stays focusable. */
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  /** Override the element (defaults to <a> when href is set, else <button>). */
  as?: string;
}

export declare function Button(props: ButtonProps): JSX.Element;
