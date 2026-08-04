import * as React from "react";

export interface TopBarLink { href: string; label: React.ReactNode; current?: boolean }
export interface TopBarProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode;
  /** Makes the brand a link (mark + name as one target). */
  brandHref?: string;
  /** Set the mark beside `brand`. `brand` stays live text — the combined lockup is too wide to read at bar height. */
  logo?: boolean;
  links?: TopBarLink[];
  actions?: React.ReactNode;
  /**
   * Replaces the anchor ELEMENT for the brand and every nav link. Default `"a"`.
   * Pass a router's Link so an in-app destination navigates client-side instead
   * of reloading the document — and, in a localised app, keeps its path prefix.
   * It receives exactly what the raw `<a>` would: `href`, `className`,
   * `children` and `aria-current`.
   */
  /* --- Display text. Every user-visible string this component renders is a
     prop, because a component library cannot hold display text (v1.3.1). --- */
  linkAs?: React.ElementType;
  /** The `<nav>` landmark's accessible name. */
  navLabel?: string;
  /** Used when `brand` is not a string, so it cannot be interpolated. */
  homeLabel?: string;
  formatBrandLabel?(brand: string): string;
}
export declare function TopBar(props: TopBarProps): React.JSX.Element;
