import * as React from "react";

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** The hint. A string, or a small inline node (a `<kbd>`); never layout. */
  tip: React.ReactNode;
  /** Which side of the trigger it opens on; flips when it will not fit. Default `"top"`. */
  side?: "top" | "bottom" | "left" | "right";
  /** Controlled open state. The specimen cards use it to force a tooltip open. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Overrides the provider's delay for this one tooltip (ms). */
  delayDuration?: number;
  /**
   * EXACTLY ONE element that forwards its ref — the trigger is rendered
   * `asChild`, so Radix clones it with the ref, the pointer/focus handlers and
   * `aria-describedby`. Every primitive in this package forwards since v2.0.0;
   * a plain function component that does not will never open.
   */
  children: React.ReactElement;
}
/**
 * HINTS ONLY. It does not exist on touch, so anything a user NEEDS — a label, an
 * error, a required instruction — must not live here; a tooltip is for the shortcut
 * key next to a button that is already labelled.
 *
 * Radix-backed since v2.0.0: the content carries `role="tooltip"` and the trigger
 * `aria-describedby`, so screen readers read it — the old `data-tip` `::after`
 * text was invisible to them. Extra props land on the content element.
 *
 * PROVIDER. Radix requires a `Tooltip.Provider`; `OverlayProvider` supplies one
 * (and the portal container). Without an OverlayProvider above, each Tooltip
 * renders its own Provider — it works, but siblings do not share the skip-delay,
 * so hovering along a toolbar waits 300ms at every button. One `OverlayProvider`
 * at the app root is the intended setup.
 */
export declare function Tooltip(props: TooltipProps): React.JSX.Element;
