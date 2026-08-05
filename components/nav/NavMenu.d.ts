import * as React from "react";

export interface NavMenuItem {
  href: string;
  label: React.ReactNode;
  /** One line saying what this destination is. The taxonomy is taught here. */
  description?: React.ReactNode;
  /** A short state word beside the name — "Available now", "Vision". */
  status?: React.ReactNode;
  current?: boolean;
  id?: string;
}
export interface NavMenuGroup {
  label?: React.ReactNode;
  items?: NavMenuItem[];
  id?: string;
}
export interface NavMenuProps extends React.HTMLAttributes<HTMLDetailsElement> {
  /** The trigger's visible text. */
  label: React.ReactNode;
  groups?: NavMenuGroup[];
  /** Replaces the anchor ELEMENT for every item. Default `"a"`. */
  linkAs?: React.ElementType;
  /** Maps to `<details name>` — an exclusive accordion group. */
  name?: string;
}
/**
 * A nav dropdown that teaches a taxonomy: named groups, one line of prose per
 * destination. A native `<details>`, so it works with JavaScript disabled and
 * stays server-safe.
 *
 * Put it FIRST in the bar's nav. The panel is start-anchored to its trigger, so
 * a first-position trigger has the whole bar to open into; anchored to a trigger
 * near the right edge it has nowhere to go and cannot be clamped in pure CSS.
 *
 * The consumer owns two behaviours a `<details>` cannot: **Escape to close**,
 * and **closing on a client-side route change** (a SPA navigation does not
 * unload the document, so the panel stays open). Neither is hidden here — a hook
 * would force a server-rendered header to become a client component.
 */
export declare function NavMenu(props: NavMenuProps): React.JSX.Element;
