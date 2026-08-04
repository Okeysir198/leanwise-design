import * as React from "react";
import type { Crumb } from "./Breadcrumbs";

export interface AppBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Live text beside the mark, never the combined lockup artwork. */
  brand?: React.ReactNode;
  /** Omit or pass "" to render the brand as a span rather than a link. */
  brandHref?: string;
  /** Set false to drop the hexagon mark and keep the name. */
  mark?: boolean;
  crumbs?: Crumb[];
  /** Renders the sidebar toggle. Omit and no toggle appears. */
  onMenuClick?(): void;
  menuExpanded?: boolean;
  /** Right-hand controls — theme toggle, primary action, avatar. */
  actions?: React.ReactNode;
  /**
   * Replaces the anchor ELEMENT for the brand, and is forwarded to
   * `Breadcrumbs` — one prop covers every link this row renders. Default `"a"`.
   * Pass a router's Link so the chrome navigates client-side and keeps any path
   * prefix that Link applies.
   */
  /* --- Display text. Every user-visible string this component renders is a
     prop, because a component library cannot hold display text (v1.3.1). --- */
  linkAs?: React.ElementType;
  collapseNavLabel?: string;
  expandNavLabel?: string;
  /** Used when `brand` is not a string, so it cannot be interpolated. */
  homeLabel?: string;
  formatBrandLabel?(brand: string): string;
}
/**
 * Brand + breadcrumbs + actions, on `TopBar`. Use this rather than hand-writing
 * the row: the holder is `flex: 0 1 auto` because TopBar already ships a
 * `flex: 1` spacer, and a second claimant splits the slack and truncates the
 * breadcrumbs with the row half empty.
 */
export declare function AppBar(props: AppBarProps): React.JSX.Element;
