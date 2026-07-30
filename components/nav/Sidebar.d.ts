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
}
export declare function Sidebar(props: SidebarProps): JSX.Element;
export declare function NavItem(props: SidebarItem & { collapsed?: boolean } & React.HTMLAttributes<HTMLElement>): JSX.Element;