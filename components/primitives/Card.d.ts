import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Adds pointer, focus ring and press state, and makes it a real control. */
  interactive?: boolean;
  /** Hover lift + brand halo. Opt-in; stands down under reduced motion. */
  glow?: boolean;
  selected?: boolean;
  href?: string;
  /**
   * Override the element (with `interactive`, defaults to `<a>` when href is
   * set, else `<button>`). This IS the router escape hatch — `as={Link}` with
   * an `href` renders the consumer's Link, so there is deliberately no separate
   * `linkAs` here (README rule 9: one control, one class). It is
   * `React.ElementType`, not `string`: typed as `string` the mechanism existed
   * at runtime and failed to compile.
   */
  as?: React.ElementType;
  /**
   * The `<button>` type. `interactive` without an `href` renders a real
   * `<button>`, which already defaults to `type="button"` here — but the prop
   * did not COMPILE before v1.3.1, because `React.HTMLAttributes<HTMLElement>`
   * omits `type` (it lives on `ButtonHTMLAttributes`). So an interactive card
   * that genuinely wanted to submit could not say so. Runtime behaviour is
   * unchanged: `{...rest}` has always overridden the default.
   */
  type?: "button" | "submit" | "reset";
}
export declare function Card(props: CardProps): React.JSX.Element;
export declare function CardHead(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
export declare function CardTitle(props: React.HTMLAttributes<HTMLElement> & { as?: string }): React.JSX.Element;
export declare function CardBody(props: React.HTMLAttributes<HTMLParagraphElement>): React.JSX.Element;
export declare function CardFoot(props: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;