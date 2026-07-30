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
}
/**
 * Brand + breadcrumbs + actions, on `TopBar`. Use this rather than hand-writing
 * the row: the holder is `flex: 0 1 auto` because TopBar already ships a
 * `flex: 1` spacer, and a second claimant splits the slack and truncates the
 * breadcrumbs with the row half empty.
 */
export declare function AppBar(props: AppBarProps): JSX.Element;
