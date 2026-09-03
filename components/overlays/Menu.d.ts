import * as React from "react";
import type { PopoverPlacement } from "./Popover";

export interface MenuItem {
  value?: string | number;
  label?: React.ReactNode;
  /** A glyph NAME from the icon set — never a drawn path (README rule 8). */
  icon?: string;
  /** Rendered right-aligned in mono. Display only; you still bind the shortcut. */
  kbd?: string;
  /** Present (true or false) makes the row a `menuitemcheckbox`. */
  checked?: boolean;
  disabled?: boolean;
  /** Destructive ink. One per menu, at the bottom, behind a separator. */
  danger?: boolean;
  /** Renders the row as a link. Without it the row is a button. */
  href?: string;
  onSelect?(item: MenuItem): void;
  type?: "item" | "separator" | "label";
}
export interface MenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items: MenuItem[];
  /** Must forward its ref (a plain element or a `forwardRef` component) — it is the anchor. */
  trigger: React.ReactNode;
  /** Controlled open state. Omit for uncontrolled. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
  onSelect?(value: MenuItem["value"], item: MenuItem): void;
  label?: string;
  placement?: PopoverPlacement;
  matchWidth?: boolean;
  className?: string;
  /**
   * Replaces the anchor ELEMENT for rows that carry an `href`. Default `"a"`.
   * Pass a router's Link so a menu destination navigates client-side and keeps
   * any path prefix that Link applies. It receives what the raw `<a>` would:
   * `href`, `className`, the menuitem ARIA, `tabIndex`, `children` and a REF —
   * so it must forward unknown props and the ref to the element, or the row has
   * no keyboard. A row without an href is a `<div role="menuitem">` and is never
   * replaced.
   */
  linkAs?: React.ElementType;
}
/**
 * The action menu — Radix DropdownMenu (non-modal) on the Popover's surface
 * since v2.0.0. Arrows move focus, Home/End jump, typeahead jumps to a letter,
 * Esc closes and returns focus to the trigger. Focus moves WITH the highlight,
 * so a screen reader follows the sighted user. The trigger's theme/band scope
 * is mirrored onto the portal layer.
 */
export declare function Menu(props: MenuProps): React.JSX.Element;
