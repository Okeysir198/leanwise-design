"use client";
import * as React from "react";
import { Tooltip } from "radix-ui";
import { LayerContext } from "./_layer.js";

/* Tooltip open delay. A token cannot be read here: this is a JS number handed
   to Radix at render time, and `--lw-dur-md` (200ms) lives in CSS — reading it
   would need getComputedStyle on a mounted node, i.e. an effect and a second
   render for every provider. So the value is ALIGNED with the token by hand:
   300 = --lw-dur-md + the 100ms hover-intent floor. Move one, move the other. */
const TOOLTIP_DELAY_MS = 300;
/* Once one tooltip has shown, a sibling opens without the wait — the reader
   has already committed to hovering the toolbar. Radix's own default is 300. */
const TOOLTIP_SKIP_DELAY_MS = 500;

/**
 * The root every Radix-backed overlay portals into.
 *
 * Renders a `.lw-layer-root` (display: contents — no box of its own) and
 * offers it through `LayerContext` as the portal container; wraps the tree in
 * Radix's `Tooltip.Provider` so tooltips share one delay budget.
 *
 * Place it INSIDE the element that carries `brandVars()` and the `.dark` /
 * `.lw-band-*` scope — a portal inherits brand and theme from its container,
 * not from its trigger. Never inside `.lw-topbar`: its `backdrop-filter`
 * makes it the containing block for every `position: fixed` descendant, and
 * every layer would then be clipped to the bar.
 */
export function OverlayProvider({ container, children }) {
  const [own, setOwn] = React.useState(null);
  const node = container || own;
  const value = React.useMemo(() => ({ container: node }), [node]);
  return (
    <LayerContext.Provider value={value}>
      <Tooltip.Provider delayDuration={TOOLTIP_DELAY_MS} skipDelayDuration={TOOLTIP_SKIP_DELAY_MS}>
        {children}
        {!container && <div className="lw-layer-root" ref={setOwn} />}
      </Tooltip.Provider>
    </LayerContext.Provider>
  );
}
