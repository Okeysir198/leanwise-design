import * as React from "react";

/** Note the `Omit`: this component gives `title` and `role` richer meanings than the DOM
 *  attribute of the same name, so the inherited one has to be removed or the
 *  interface does not extend cleanly. Invisible until v1.2 — there was no
 *  tsconfig, so `tsc` had never run over these declarations. */
export interface StoryCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "role"> {
  logo?: React.ReactNode;
  title?: React.ReactNode;
  body?: React.ReactNode;
  /** The headline number. One per story. */
  result?: React.ReactNode;
  /** All three of quote/person/role, or the quote does not render. */
  quote?: React.ReactNode;
  person?: React.ReactNode;
  role?: React.ReactNode;
  href?: string;
  /**
   * Replaces the anchor ELEMENT when `href` is set. Default `"a"`. Pass a
   * router's Link so the card navigates client-side and keeps any path prefix
   * that Link applies. It receives what the raw `<a>` would: `href`,
   * `className` and `children`. Without an `href` the card is a `<div>` and
   * this does nothing.
   */
  linkAs?: React.ElementType;
}
export declare function StoryCard(props: StoryCardProps): React.JSX.Element;