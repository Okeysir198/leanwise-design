"use client";
import * as React from "react";
import { Tooltip as RT } from "radix-ui";
import { Layer, useLayer } from "./_layer.js";
const cx = (...a) => a.filter(Boolean).join(" ");

/* Matches OverlayProvider's budget, for the no-provider fallback below. A
   token cannot be read here (see OverlayProvider.jsx); move one, move both. */
const TOOLTIP_DELAY_MS = 300;
const TOOLTIP_SKIP_DELAY_MS = 500;

/**
 * Radix Tooltip since v2.0.0. Until then this was a `data-tip` attribute painted
 * by `::after` — text that no assistive technology could reach. Radix renders
 * the content with `role="tooltip"` and wires `aria-describedby` on the trigger,
 * so the hint is now READ, not only seen.
 *
 * PROVIDER. `Tooltip.Root` throws without a `Tooltip.Provider` above it, and
 * `OverlayProvider` supplies one together with the layer container. There is no
 * flag for "a Radix provider exists"; `useLayer()` is the proxy — it is non-null
 * exactly when an OverlayProvider is above. Outside one, every Tooltip wraps
 * itself in its own Provider (correct, but each has its own delay budget: no
 * skip-delay across siblings). Put an OverlayProvider at the app root.
 *
 * The trigger is rendered `asChild`, so `children` MUST be a single element
 * that forwards its ref (every primitive here does since v2.0.0).
 */
export function Tooltip({
  tip, side = "top", open, defaultOpen, onOpenChange, delayDuration,
  className, children, ...rest
}) {
  const layer = useLayer();
  // STATE, not a ref: `mirrorScope` runs at render time, and a ref is null on
  // the first render (the same rule _layer.js states for its container).
  const [trigger, setTrigger] = React.useState(null);
  const root = (
    <RT.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} delayDuration={delayDuration}>
      <RT.Trigger asChild ref={setTrigger}>{children}</RT.Trigger>
      <RT.Portal container={layer ? layer.container : undefined}>
        <Layer from={trigger}>
          <RT.Content className={cx("lw-tooltip", className)} side={side} sideOffset={6} {...rest}>
            {tip}
          </RT.Content>
        </Layer>
      </RT.Portal>
    </RT.Root>
  );
  return layer ? root : (
    <RT.Provider delayDuration={TOOLTIP_DELAY_MS} skipDelayDuration={TOOLTIP_SKIP_DELAY_MS}>{root}</RT.Provider>
  );
}
