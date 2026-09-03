import * as React from "react";

export interface SidebarItem {
  /** A section heading instead of a link. */
  group?: string;
  /** React key for the row. Read by the component; falls back to the index. */
  id?: string;
  href?: string;
  label?: React.ReactNode;
  /**
   * ⚠️ REQUIRED IN PRACTICE IF THE RAIL EVER COLLAPSES. A collapsed rail hides
   * the label and the badge, so a row with no icon has nothing left to show.
   * It keeps a `min-height` floor so it is not an invisible clickable strip,
   * but it is still a nameless one.
   */
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  current?: boolean;
}
export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  items?: SidebarItem[];
  /**
   * The rail's accessible name — `aria-label` on the `<nav>`. Defaults to
   * "Sections".
   *
   * ⚠️ Declared because `React.HTMLAttributes` does NOT carry `label` (it lives
   * on `AllHTMLAttributes`), so `<Sidebar label="Navigation">` was a type error
   * against a prop the component has always defaulted and used. Name it: an app
   * with a rail and a bottom bar has two navigation landmarks, and "Sections"
   * describes neither.
   */
  label?: string;
  /** Collapses to a 60px icon rail. Pair with `useRailCollapsed` to persist it. */
  collapsed?: boolean;
  /**
   * `"hide"` hides the rail below 768px, so the app can show a `Drawer` there
   * instead. Opt-in: without it the rail keeps its old always-visible
   * behaviour, and `flex: none` means it never yields.
   *
   * There is deliberately no `"collapse"` value. A collapsed rail leans on the
   * native `title` for its labels and `title` does not exist on touch, so
   * auto-collapsing at the mobile breakpoint gives unnamed glyphs to exactly
   * the devices that cannot read them.
   */
  "data-responsive"?: "hide";
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
export declare function NavItem(props: SidebarItem & {
  collapsed?: boolean;
  linkAs?: React.ElementType;
  /** The `<button>` type for a row with no `href`. Defaults to `"button"`;
   *  `HTMLAttributes<HTMLElement>` omits it, so it did not compile before v1.3.1. */
  type?: "button" | "submit" | "reset";
} & React.HTMLAttributes<HTMLElement>): React.JSX.Element;