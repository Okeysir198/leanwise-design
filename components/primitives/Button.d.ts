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
  /**
   * Override the element (defaults to `<a>` when href is set, else `<button>`).
   * This IS the router escape hatch — `as={Link}` with an `href` renders the
   * consumer's Link, so there is deliberately no separate `linkAs` here (README
   * rule 9: one control, one class). It is `React.ElementType`, not `string`:
   * typed as `string` the mechanism existed at runtime and failed to compile.
   */
  as?: React.ElementType;
}

export declare function Button(props: ButtonProps): React.JSX.Element;
