"use client";
import * as React from "react";
import { Popover as RadixPopover } from "radix-ui";
import { Layer, useLayer } from "./_layer.js";
const cx = (...a) => a.filter(Boolean).join(" ");

/* The DS placement vocabulary onto Radix's side + align. A bare side keeps the
   DS default of START alignment — Radix's own default is "center", and every
   menu, combobox and date panel in the system hangs from the anchor's start
   edge; "bottom" meaning "bottom-center" would move all of them at once. */
export function toSideAlign(placement) {
  const [side = "bottom", align = "start"] = String(placement || "bottom-start").split("-");
  return { side, align: align === "center" ? "center" : align === "end" ? "end" : "start" };
}

const HASPOPUP = { menu: "menu", listbox: "listbox", dialog: "dialog" };

/**
 * The floating surface. Menu, Combobox, DatePicker and the filter panels are all
 * this plus their own contents — there is one shadow, one radius and one
 * dismissal behaviour in the system, not five.
 *
 * Since v2.0.0 the positioning, dismissal and focus return are Radix Popover's
 * (non-modal): collision flipping, scroll and resize tracking, outside-press
 * and Escape, and focus back to the trigger. What stays ours is the SCOPE: the
 * panel portals into the nearest `OverlayProvider` layer and mounts a `Layer`
 * that mirrors the trigger's theme/band class, so a popover opened from a dark
 * band on a light page paints dark. That mirror is the reason a Radix Portal
 * alone was never enough here.
 *
 * Controlled (`open` + `onOpenChange`) or uncontrolled. The trigger receives
 * the ref, the click handler and `aria-expanded` through Radix's `asChild`, so
 * a caller passes an ordinary Button and gets correct semantics without wiring
 * them. A trigger that does not forward its ref has no anchor — and a panel
 * without an anchor is never positioned; the dev-only warning below is what
 * names that.
 *
 * `anchor` renders the trigger as a positioning anchor ONLY — no ARIA, no
 * click-to-toggle — for a field that owns its own semantics (a combobox input
 * carries role="combobox" and its own aria-expanded / aria-controls). The
 * caller then drives `open`.
 */
export function Popover({
  trigger, open, defaultOpen, onOpenChange,
  placement = "bottom-start", offset = 6, matchWidth,
  label, role = "dialog", padded, anchor = false, autoFocus = true, container,
  className, children, ...rest
}) {
  // The anchor element is STATE, not a ref: `Layer from` and the outside-press
  // guard read it during render, and a ref is null on the first one.
  const [anchorEl, setAnchorElState] = React.useState(null);
  // The ref twin exists for the effect below: a callback ref fires during the
  // same commit as the effect, so the STATE it sets is not visible there yet.
  const anchorRef = React.useRef(null);
  const setAnchorEl = React.useCallback((el) => { anchorRef.current = el; setAnchorElState(el); }, []);
  const layer = useLayer();
  const { side, align } = toSideAlign(placement);

  // A trigger that dropped its ref (a function component that does not forward
  // one) leaves Radix with no anchor rect: the panel is positioned against
  // nothing and painted off-screen, and nothing else reports it.
  React.useEffect(() => {
    if (typeof process !== "undefined" && process.env && process.env.NODE_ENV === "production") return;
    if (!open && !defaultOpen) return;
    const el = anchorRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      if (r.width || r.height) return;
    }
    if (typeof console !== "undefined") console.warn("[@leanwise/design] Popover: the anchor has no size — the trigger must forward its ref (React.forwardRef, or a plain element), or the panel cannot be positioned.");
  }, [open, defaultOpen, anchorEl]);

  const Wrap = anchor ? RadixPopover.Anchor : RadixPopover.Trigger;
  const wrapProps = anchor ? {} : { "aria-haspopup": HASPOPUP[role] || "dialog" };
  const isPresentational = role === "presentation" || role === "none";

  return (
    <RadixPopover.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} modal={false}>
      <Wrap asChild ref={setAnchorEl} {...wrapProps}>{trigger}</Wrap>
      <RadixPopover.Portal container={container ?? layer?.container ?? undefined}>
        <Layer from={anchorEl}>
          <RadixPopover.Content
            side={side} align={align} sideOffset={offset} collisionPadding={8}
            role={role} aria-label={isPresentational ? undefined : label}
            data-match-width={matchWidth ? "" : undefined}
            onOpenAutoFocus={autoFocus ? undefined : (e) => e.preventDefault()}
            // In anchor mode the field itself is "outside": a click on it would
            // close the panel here and the field's own focus/click handler would
            // reopen it — the close-then-reopen flicker the v1 dismissal existed
            // to avoid.
            onInteractOutside={anchor ? (e) => { if (anchorEl && anchorEl.contains(e.target)) e.preventDefault(); } : undefined}
            className={cx("lw-popover", padded && "lw-popover-pad", className)}
            {...rest}>
            {children}
          </RadixPopover.Content>
        </Layer>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}
