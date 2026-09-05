"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Popover as RadixPopover } from "radix-ui";
import { Layer, useLayer } from "./_layer.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function toSideAlign(placement) {
  const [side = "bottom", align = "start"] = String(placement || "bottom-start").split("-");
  return { side, align: align === "center" ? "center" : align === "end" ? "end" : "start" };
}
const HASPOPUP = { menu: "menu", listbox: "listbox", dialog: "dialog" };
function Popover({
  trigger,
  open,
  defaultOpen,
  onOpenChange,
  placement = "bottom-start",
  offset = 6,
  matchWidth,
  label,
  role = "dialog",
  padded,
  anchor = false,
  autoFocus = true,
  container,
  className,
  children,
  ...rest
}) {
  const [anchorEl, setAnchorElState] = React.useState(null);
  const anchorRef = React.useRef(null);
  const setAnchorEl = React.useCallback((el) => {
    anchorRef.current = el;
    setAnchorElState(el);
  }, []);
  const layer = useLayer();
  const { side, align } = toSideAlign(placement);
  React.useEffect(() => {
    if (typeof process !== "undefined" && process.env && false) return;
    if (!open && !defaultOpen) return;
    const el = anchorRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      if (r.width || r.height) return;
    }
    if (typeof console !== "undefined") console.warn("[@leanwise/design] Popover: the anchor has no size \u2014 the trigger must forward its ref (React.forwardRef, or a plain element), or the panel cannot be positioned.");
  }, [open, defaultOpen, anchorEl]);
  const Wrap = anchor ? RadixPopover.Anchor : RadixPopover.Trigger;
  const wrapProps = anchor ? {} : { "aria-haspopup": HASPOPUP[role] || "dialog" };
  const isPresentational = role === "presentation" || role === "none";
  return /* @__PURE__ */ jsxs(RadixPopover.Root, { open, defaultOpen, onOpenChange, modal: false, children: [
    /* @__PURE__ */ jsx(Wrap, { asChild: true, ref: setAnchorEl, ...wrapProps, children: trigger }),
    /* @__PURE__ */ jsx(RadixPopover.Portal, { container: container ?? layer?.container ?? void 0, children: /* @__PURE__ */ jsx(Layer, { from: anchorEl, children: /* @__PURE__ */ jsx(
      RadixPopover.Content,
      {
        side,
        align,
        sideOffset: offset,
        collisionPadding: 8,
        role,
        "aria-label": isPresentational ? void 0 : label,
        "data-match-width": matchWidth ? "" : void 0,
        onOpenAutoFocus: autoFocus ? void 0 : (e) => e.preventDefault(),
        onInteractOutside: anchor ? (e) => {
          if (anchorEl && anchorEl.contains(e.target)) e.preventDefault();
        } : void 0,
        className: cx("lw-popover", padded && "lw-popover-pad", className),
        ...rest,
        children
      }
    ) }) })
  ] });
}
export {
  Popover,
  toSideAlign
};
