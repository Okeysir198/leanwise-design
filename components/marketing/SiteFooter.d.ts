import * as React from "react";

export interface FooterLink {
  /** Omit to render an inert `.lw-footer-note` — a date, a "coming soon". No pointer, no tab stop. */
  href?: string;
  label: React.ReactNode;
  /** Marks the current page: ink lift + weight step + a brand rule. Never colour alone. */
  current?: boolean;
  /** Opens in a new tab and says so with a named icon. */
  external?: boolean;
}
export interface FooterColumn {
  heading?: React.ReactNode;
  links?: FooterLink[];
}
export interface SiteFooterProps extends React.HTMLAttributes<HTMLElement> {
  /** The brand column's lockup / name. Any node. */
  brand?: React.ReactNode;
  /** One-line blurb under the brand, capped at 34ch by `.lw-footer-desc`. */
  desc?: React.ReactNode;
  columns?: FooterColumn[];
  /** The long legal disclaimer. Rendered in the bottom row, capped by `.lw-measure`. */
  legal?: React.ReactNode;
  /** The bottom row's right-hand content — a copyright line, a `.lw-cluster` of `.lw-icon-btn` social links. */
  bottom?: React.ReactNode;
  /**
   * Sets `data-band="dark"`, which re-points every role token on the element.
   * It does NOT paint a navy tier, and no child needs a dark variant.
   */
  dark?: boolean;
  /**
   * Replaces the anchor ELEMENT for every column link. Default `"a"`. Pass a
   * router's Link so a destination navigates client-side and keeps any path
   * prefix that Link applies — in a bilingual app a raw `<a>` drops the locale.
   * It receives what the raw `<a>` would: `href`, `className`, `children` and
   * `aria-current`.
   */
  linkAs?: React.ElementType;
}
/** The site footer. Named `SiteFooter`, not `Footer` — `CardFoot` exists and the browser bundle's namespace is flat. */
export declare function SiteFooter(props: SiteFooterProps): React.JSX.Element;
