"use client";
import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");

/* Where the panel lands, given the anchor and the space actually available.
   Pure function of two rects so it can be reasoned about without a DOM. */
function place(anchorRect, panelRect, placement, offset) {
  const vw = window.innerWidth, vh = window.innerHeight, pad = 8;
  let [side, align = "start"] = String(placement).split("-");
  const fitsBelow = anchorRect.bottom + offset + panelRect.height <= vh - pad;
  const fitsAbove = anchorRect.top - offset - panelRect.height >= pad;
  // Flip only when the preferred side does NOT fit and the other one does.
  // Flipping whenever the other side has more room makes a panel near the middle
  // of the viewport jump sides as the page scrolls by a pixel.
  if (side === "bottom" && !fitsBelow && fitsAbove) side = "top";
  else if (side === "top" && !fitsAbove && fitsBelow) side = "bottom";

  let top, left;
  if (side === "top") top = anchorRect.top - offset - panelRect.height;
  else if (side === "bottom") top = anchorRect.bottom + offset;
  else top = align === "end" ? anchorRect.bottom - panelRect.height : anchorRect.top;

  if (side === "left") left = anchorRect.left - offset - panelRect.width;
  else if (side === "right") left = anchorRect.right + offset;
  else if (align === "end") left = anchorRect.right - panelRect.width;
  else if (align === "center") left = anchorRect.left + (anchorRect.width - panelRect.width) / 2;
  else left = anchorRect.left;

  // Clamp last, so a panel wider than its anchor stays on screen instead of
  // hanging off the edge in the name of alignment.
  left = Math.min(Math.max(pad, left), Math.max(pad, vw - panelRect.width - pad));
  top = Math.min(Math.max(pad, top), Math.max(pad, vh - panelRect.height - pad));
  return { top, left, side };
}

/**
 * The floating surface. Menu, Combobox, DatePicker and the filter panels are all
 * this plus their own contents — there is one shadow, one radius and one
 * dismissal behaviour in the system, not five.
 *
 * Controlled (`open` + `onOpenChange`) or uncontrolled. The trigger is cloned to
 * receive the ref, the click handler and `aria-expanded`, so a caller passes an
 * ordinary Button and gets correct semantics without wiring them.
 */
export function Popover({
  trigger, open: openProp, defaultOpen = false, onOpenChange,
  placement = "bottom-start", offset = 6, matchWidth,
  label, role = "dialog", padded, triggerAria = true, className, children, ...rest
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultOpen);
  const isControlled = openProp != null;
  const open = isControlled ? openProp : uncontrolled;
  const anchorRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const uid = React.useId();

  // .lw-popover-anchor is display:contents so it never disturbs the trigger's
  // layout — a wrapper with a box stretches inside a Stack and shrinks a Cluster.
  // The cost is that the WRAPPER has no box either: getBoundingClientRect() on it
  // returns all zeros, which silently pins every panel to the viewport corner. So
  // always measure the trigger's own element. (Cloning a ref onto the trigger is
  // not an option — the components passed in here are plain function components
  // and do not forward one.)
  const anchorEl = () => {
    const w = anchorRef.current;
    return (w && w.firstElementChild) || w;
  };

  const setOpen = React.useCallback((next) => {
    if (!isControlled) setUncontrolled(next);
    onOpenChange && onOpenChange(next);
  }, [isControlled, onOpenChange]);

  // Show/hide against the TOP LAYER. showPopover throws if the element is already
  // open, so both calls are guarded rather than fired optimistically.
  React.useEffect(() => {
    const el = panelRef.current;
    if (!el || typeof el.showPopover !== "function") return;
    const isOpen = el.matches(":popover-open");
    if (open && !isOpen) el.showPopover();
    if (!open && isOpen) el.hidePopover();
  }, [open]);

  // Position after paint, and again on any scroll or resize: a fixed panel does
  // not travel with an anchor inside a scrolling pane. Capture phase, because the
  // scroll may happen in an ancestor that does not bubble scroll events.
  React.useEffect(() => {
    if (!open) return;
    const reposition = () => {
      const anchor = anchorEl(), panel = panelRef.current;
      if (!anchor || !panel) return;
      const rect = anchor.getBoundingClientRect();
      // A zero-size anchor means the trigger has not laid out yet (or is display:none).
      // Positioning against it would clamp the panel to the viewport corner, so skip
      // this frame rather than paint the panel somewhere provably wrong.
      if (!rect.width && !rect.height) return;
      if (matchWidth) panel.style.minWidth = rect.width + "px";
      const pos = place(rect, panel.getBoundingClientRect(), placement, offset);
      panel.style.top = pos.top + "px";
      panel.style.left = pos.left + "px";
      panel.dataset.side = pos.side;
    };
    /* Coalesce to one reposition per frame. `capture: true` means every
       scrolling ancestor delivers, and reposition() reads two bounding rects
       then writes three styles — a read/write/read/write cycle at raw event
       rate, which on a trackpad runs well above 60Hz. useSpotlight in hooks.js
       already establishes this pattern. */
    let frame = 0;
    const onScrollOrResize = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = 0; reposition(); });
    };
    reposition();
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open, placement, offset, matchWidth]);

  // Dismissal is ours rather than popover="auto"'s, because auto light-dismisses
  // on pointerdown anywhere outside — including the trigger, which then reopens
  // the panel its own click just closed.
  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      const anchor = anchorRef.current, panel = panelRef.current;
      if (panel && panel.contains(e.target)) return;
      if (anchor && anchor.contains(e.target)) return;
      setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      setOpen(false);
      const t = anchorEl();
      if (t && t.focus) t.focus({ preventScroll: true });
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [open, setOpen]);

  const wasOpen = React.useRef(false);
  React.useEffect(() => {
    const closing = wasOpen.current && !open;
    wasOpen.current = open;
    if (!closing) return;
    // Only reclaim focus if the panel had it. If the user tabbed away or clicked
    // another control, yanking focus back to the trigger would be the bug.
    const active = document.activeElement;
    if (active && active !== document.body && !panelRef.current?.contains(active)) return;
    const t = anchorEl();
    if (t && t.focus) t.focus({ preventScroll: true });
  }, [open]);

  const HASPOPUP = { menu: "menu", listbox: "listbox", grid: "grid", dialog: "dialog" };
  const triggerEl = React.isValidElement(trigger)
    ? React.cloneElement(trigger, {
        // A combobox input carries role="combobox" and its own aria-expanded /
        // aria-controls / aria-activedescendant. Cloning a second set onto the
        // field wrapper would announce two controls where there is one.
        "aria-expanded": triggerAria ? open : undefined,
        "aria-haspopup": triggerAria ? (HASPOPUP[role] || "dialog") : undefined,
        "aria-controls": triggerAria && open ? uid : undefined,
        onClick: (e) => {
          trigger.props.onClick && trigger.props.onClick(e);
          if (!e.defaultPrevented) setOpen(!open);
        },
      })
    : trigger;

  return (
    <>
      <span className="lw-popover-anchor" ref={anchorRef}>{triggerEl}</span>
      <div ref={panelRef} id={uid} popover="manual"
        role={open ? role : undefined} aria-label={open ? label : undefined}
        aria-hidden={open ? undefined : true}
        tabIndex={-1} className={cx("lw-popover", padded && "lw-popover-pad", className)} {...rest}>
        {open && children}
      </div>
    </>
  );
}
