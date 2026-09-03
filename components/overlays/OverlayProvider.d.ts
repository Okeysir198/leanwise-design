import * as React from "react";

export interface OverlayProviderProps {
  /**
   * Where the overlay layers portal into. Omit it and the provider renders its
   * own `.lw-layer-root` (display: contents) as the LAST child of the tree it
   * wraps. Pass a node to portal somewhere else — a per-tenant root, a
   * `.dark` island — the node must sit inside the brand/theme scope you want
   * the overlays to inherit.
   */
  container?: HTMLElement | null;
  children?: React.ReactNode;
}

/**
 * The portal root for every Radix-backed overlay (Popover, Menu, Tooltip,
 * Dialog, Drawer, CommandPalette), plus the shared tooltip delay budget.
 * One per app, or one per themed island.
 *
 * PLACEMENT.
 *  - Put it INSIDE the element that carries `brandVars()` and the `.dark` /
 *    `.lw-band-*` / `[data-theme]` scope. A portal inherits brand and theme
 *    from its CONTAINER, not from the control that opened it; a provider
 *    above the branded element portals every overlay into the default theme.
 *  - Never inside `.lw-topbar` (or any ancestor with `backdrop-filter`,
 *    `transform` or `filter`): those make the ancestor the containing block
 *    for `position: fixed`, and every layer is then clipped to that box. The
 *    layers ARE `position: fixed` (`.lw-layer`, product.css).
 *  - Without a provider the overlays still work — they portal to
 *    `document.body` and mirror the trigger's scope onto the layer — but
 *    per-tenant `brandVars()` set below `<body>` is not seen there.
 */
export declare function OverlayProvider(props: OverlayProviderProps): React.JSX.Element;
