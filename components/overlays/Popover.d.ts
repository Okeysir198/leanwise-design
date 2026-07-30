import * as React from "react";

export type PopoverPlacement =
  | "top" | "top-start" | "top-end" | "top-center"
  | "bottom" | "bottom-start" | "bottom-end" | "bottom-center"
  | "left" | "left-start" | "left-end"
  | "right" | "right-start" | "right-end";

export interface PopoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  /** The control that opens it. Cloned to receive the ref, the click handler and `aria-expanded`. */
  trigger: React.ReactNode;
  /** Controlled open state. Omit for uncontrolled. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
  placement?: PopoverPlacement;
  /** Gap between anchor and panel, px. Default 6. */
  offset?: number;
  /** Floor the panel's width to the anchor's — for comboboxes and selects. */
  matchWidth?: boolean;
  /** Accessible name. Required when the panel has no heading of its own. */
  label?: string;
  /** `dialog` (default), `menu` or `listbox`. Sets the trigger's aria-haspopup too. */
  role?: "dialog" | "menu" | "listbox" | "grid";
  /** Card padding rather than the menu gutter — for prose and form content. */
  padded?: boolean;
  /**
   * Default true. Set false when the trigger owns its own ARIA — a combobox input
   * carries role="combobox" and aria-expanded itself, and a second set cloned onto
   * the field wrapper announces two controls where there is one.
   */
  triggerAria?: boolean;
}
/**
 * The system's one floating surface: Menu, Combobox, DatePicker and every filter
 * panel are this plus contents. Promoted to the top layer, so it escapes an
 * ancestor's `overflow: hidden` without a portal; dismissal is explicit rather
 * than `popover="auto"`'s, which cannot tell the trigger from the outside world.
 */
export declare function Popover(props: PopoverProps): JSX.Element;
