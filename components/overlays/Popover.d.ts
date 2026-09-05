import * as React from "react";

export type PopoverPlacement =
  | "top" | "top-start" | "top-end" | "top-center"
  | "bottom" | "bottom-start" | "bottom-end" | "bottom-center"
  | "left" | "left-start" | "left-end"
  | "right" | "right-start" | "right-end";

export interface PopoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  /**
   * The control that opens it. Receives the ref, the click handler and
   * `aria-expanded` through `asChild` — so it MUST forward its ref (a plain
   * element, or a component wrapped in `React.forwardRef`). A trigger that drops
   * the ref has no anchor, and the panel is never positioned.
   */
  trigger: React.ReactNode;
  /** Controlled open state. Omit for uncontrolled. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
  /** A bare side (`"bottom"`) aligns to the anchor's START edge, the system default. */
  placement?: PopoverPlacement;
  /** Gap between anchor and panel, px. Default 6. */
  offset?: number;
  /** Floor the panel's width to the anchor's — for comboboxes and selects. */
  matchWidth?: boolean;
  /** Accessible name. Required when the panel has no heading of its own. Ignored for `presentation`. */
  label?: string;
  /**
   * `dialog` (default), `menu` or `listbox` — sets the trigger's `aria-haspopup`
   * too. `presentation` for a wrapper whose child owns the role (a combobox's
   * `ul[role=listbox]`).
   */
  role?: "dialog" | "menu" | "listbox" | "presentation";
  /** Card padding rather than the menu gutter — for prose and form content. */
  padded?: boolean;
  /**
   * Render the trigger as a positioning ANCHOR only — no ARIA, no click-to-toggle,
   * and a click on it does not dismiss the panel. For a field that owns its own
   * semantics (a combobox input); the caller then drives `open`.
   */
  anchor?: boolean;
  /** Default true: focus moves into the panel on open. False keeps it on the field. */
  autoFocus?: boolean;
  /** Portal container. Default: the nearest `OverlayProvider` layer, else `document.body`. */
  container?: HTMLElement | null;
}
/**
 * The system's one floating surface: Menu, Combobox, DatePicker and every filter
 * panel are this plus contents. Radix Popover (non-modal) underneath since
 * v2.0.0 — positioning, collision flipping, dismissal and focus return are its;
 * the theme/band scope of the trigger is mirrored onto the portal layer, so a
 * panel opened from a dark band paints dark.
 */
export declare function Popover(props: PopoverProps): React.JSX.Element;
