import * as React from "react";

export interface SourceChipProps extends React.HTMLAttributes<HTMLElement> {
  n: number | string;
  /** Used for the accessible name. */
  title?: string;
  href?: string;
  /**
   * Override the element (defaults to `<a>` when href is set, else `<button>`).
   * This IS the router escape hatch — `as={Link}` with an `href` renders the
   * consumer's Link, so there is deliberately no separate `linkAs` here.
   */
  as?: React.ElementType;
  /** The `<button>` type. Defaults to `"button"` at runtime; `HTMLAttributes<HTMLElement>`
   *  omits the prop, so before v1.3.1 it could not be overridden in TypeScript. */
  type?: "button" | "submit" | "reset";
  /* --- Display text (v1.3.1). --- */
  /** The chip's accessible name. Default `Source {n}: {title}`. */
  formatLabel?(n: number | string, title?: string): string;
}
export declare function SourceChip(props: SourceChipProps): React.JSX.Element;
