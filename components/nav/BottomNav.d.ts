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
/** Note the `Omit`: this component gives `onChange` a richer meaning than the DOM
 *  attribute of the same name, so the inherited one has to be removed or the
 *  interface does not extend cleanly. Invisible until v1.2 — there was no
 *  tsconfig, so `tsc` had never run over these declarations. */
export interface BottomNavProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /** Three to five DESTINATIONS. Never actions — warns past five. */
  items: BottomNavItem[];
  value?: string;
  onChange?(value: string): void;
  label?: string;
}
/** The mobile destination bar. Reserves the home indicator from `--lw-safe-bottom`. */
export declare function BottomNav(props: BottomNavProps): React.JSX.Element;
