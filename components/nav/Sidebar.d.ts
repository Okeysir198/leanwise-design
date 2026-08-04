import * as React from "react";

export interface SidebarItem {
  /** A section heading instead of a link. */
  group?: string;
  href?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  current?: boolean;
}
export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  items?: SidebarItem[];
  /** Collapses to a 60px icon rail. */
  collapsed?: boolean;
  footer?: React.ReactNode;
  /**
   * Replaces the anchor ELEMENT of every row that has an `href`, by forwarding
   * to `NavItem`. Default `"a"`. Pass a router's Link so the rail navigates
   * client-side and keeps any path prefix that Link applies. A row WITHOUT an
   * href is a `<button>` and is never replaced.
   */
  linkAs?: React.ElementType;
}
export declare function Sidebar(props: SidebarProps): React.JSX.Element;
export declare function NavItem(props: SidebarItem & { collapsed?: boolean; linkAs?: React.ElementType } & React.HTMLAttributes<HTMLElement>): React.JSX.Element;