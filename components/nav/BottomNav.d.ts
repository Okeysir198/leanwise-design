import * as React from "react";

export interface BottomNavItem {
  value: string;
  label: string;
  /** A glyph NAME from the icon set. */
  icon: string;
  /** Renders as a link instead of a button. */
  href?: string;
  /** Announced to a screen reader; show your own visual dot if you need one. */
  badge?: number;
}
export interface BottomNavProps extends React.HTMLAttributes<HTMLElement> {
  /** Three to five DESTINATIONS. Never actions — warns past five. */
  items: BottomNavItem[];
  value?: string;
  onChange?(value: string): void;
  label?: string;
}
/** The mobile destination bar. Reserves the home indicator from `--lw-safe-bottom`. */
export declare function BottomNav(props: BottomNavProps): JSX.Element;
