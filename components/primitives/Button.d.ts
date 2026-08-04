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
  /**
   * The `<button>` type, forwarded ONLY when a `<button>` is what renders.
   *
   * `React.HTMLAttributes<HTMLElement>` — the base every polymorphic component
   * here extends — does **not** carry `type`; it is on `ButtonHTMLAttributes`.
   * So through v1.3.0 this prop did not compile, and a Cancel or Delete
   * `<Button>` inside a `<form>` took HTML's default of `submit` and submitted
   * the form. The flagship consumer's admin console worked around it with a raw
   * `<button className="lw-btn">`, which defeats the component.
   *
   * The DEFAULT is deliberately still undefined (so: `submit`), matching the
   * platform. Flipping it would silently stop `<form onSubmit>` +
   * `<Button>Save</Button>` from submitting — a no-op is a worse failure than a
   * wrong-op, and a default change is not a patch-release move. Recorded as a
   * v2.0.0 candidate in REVIEW.md.
   */
  type?: "button" | "submit" | "reset";
}

export declare function Button(props: ButtonProps): React.JSX.Element;
