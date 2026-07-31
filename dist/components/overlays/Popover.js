"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
function place(anchorRect, panelRect, placement, offset) {
  const vw = window.innerWidth, vh = window.innerHeight, pad = 8;
  let [side, align = "start"] = String(placement).split("-");
  const fitsBelow = anchorRect.bottom + offset + panelRect.height <= vh - pad;
  const fitsAbove = anchorRect.top - offset - panelRect.height >= pad;
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
  left = Math.min(Math.max(pad, left), Math.max(pad, vw - panelRect.width - pad));
  top = Math.min(Math.max(pad, top), Math.max(pad, vh - panelRect.height - pad));
  return { top, left, side };
}
function Popover({
  trigger,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom-start",
  offset = 6,
  matchWidth,
  label,
  role = "dialog",
  padded,
  triggerAria = true,
  className,
  children,
  ...rest
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultOpen);
  const isControlled = openProp != null;
  const open = isControlled ? openProp : uncontrolled;
  const anchorRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const uid = React.useId();
  const anchorEl = () => {
    const w = anchorRef.current;
    return w && w.firstElementChild || w;
  };
  const setOpen = React.useCallback((next) => {
    if (!isControlled) setUncontrolled(next);
    onOpenChange && onOpenChange(next);
  }, [isControlled, onOpenChange]);
  React.useEffect(() => {
    const el = panelRef.current;
    if (!el || typeof el.showPopover !== "function") return;
    const isOpen = el.matches(":popover-open");
    if (open && !isOpen) el.showPopover();
    if (!open && isOpen) el.hidePopover();
  }, [open]);
  React.useEffect(() => {
    if (!open) return;
    const reposition = () => {
      const anchor = anchorEl(), panel = panelRef.current;
      if (!anchor || !panel) return;
      const rect = anchor.getBoundingClientRect();
      if (!rect.width && !rect.height) return;
      if (matchWidth) panel.style.minWidth = rect.width + "px";
      const pos = place(rect, panel.getBoundingClientRect(), placement, offset);
      panel.style.top = pos.top + "px";
      panel.style.left = pos.left + "px";
      panel.dataset.side = pos.side;
    };
    let frame = 0;
    const onScrollOrResize = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        reposition();
      });
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
    const active = document.activeElement;
    if (active && active !== document.body && !panelRef.current?.contains(active)) return;
    const t = anchorEl();
    if (t && t.focus) t.focus({ preventScroll: true });
  }, [open]);
  const HASPOPUP = { menu: "menu", listbox: "listbox", grid: "grid", dialog: "dialog" };
  const triggerEl = React.isValidElement(trigger) ? React.cloneElement(trigger, {
    // A combobox input carries role="combobox" and its own aria-expanded /
    // aria-controls / aria-activedescendant. Cloning a second set onto the
    // field wrapper would announce two controls where there is one.
    "aria-expanded": triggerAria ? open : void 0,
    "aria-haspopup": triggerAria ? HASPOPUP[role] || "dialog" : void 0,
    "aria-controls": triggerAria && open ? uid : void 0,
    onClick: (e) => {
      trigger.props.onClick && trigger.props.onClick(e);
      if (!e.defaultPrevented) setOpen(!open);
    }
  }) : trigger;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("span", { className: "lw-popover-anchor", ref: anchorRef, children: triggerEl }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: panelRef,
        id: uid,
        popover: "manual",
        role: open ? role : void 0,
        "aria-label": open ? label : void 0,
        "aria-hidden": open ? void 0 : true,
        tabIndex: -1,
        className: cx("lw-popover", padded && "lw-popover-pad", className),
        ...rest,
        children: open && children
      }
    )
  ] });
}
export {
  Popover
};
