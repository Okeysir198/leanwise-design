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
  trigger: React.ReactNode;
  onSelect?(value: MenuItem["value"], item: MenuItem): void;
  label?: string;
  placement?: PopoverPlacement;
  matchWidth?: boolean;
  className?: string;
}
/**
 * The action menu, built on `Popover`. Arrows move focus, Home/End jump,
 * typeahead jumps to a letter, Esc closes and returns focus to the trigger.
 * Focus moves WITH the highlight, so a screen reader follows the sighted user.
 */
export declare function Menu(props: MenuProps): JSX.Element;
