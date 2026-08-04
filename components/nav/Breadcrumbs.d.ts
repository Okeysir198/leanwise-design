import * as React from "react";

export interface Crumb { label: React.ReactNode; href?: string }
export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items?: Crumb[];
  /**
   * Replaces the anchor ELEMENT for a linked crumb. Default `"a"`. Pass a
   * router's Link and the crumb navigates client-side, carrying whatever path
   * prefix that Link applies. It receives what the raw `<a>` would: `href` and
   * `children`. The last crumb is never a link, so `linkAs` does not reach it.
   */
  linkAs?: React.ElementType;
}
/**
 * Mono, so the trail reads as a PATH rather than as a sentence. The last crumb is the
 * current page: it is rendered as plain text with `aria-current`, not as a link to
 * where you already are. Pass the full ancestry — a truncated trail is the one thing
 * breadcrumbs exist to prevent.
 */
export declare function Breadcrumbs(props: BreadcrumbsProps): React.JSX.Element;