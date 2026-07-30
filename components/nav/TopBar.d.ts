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
}
export declare function TopBar(props: TopBarProps): JSX.Element;
