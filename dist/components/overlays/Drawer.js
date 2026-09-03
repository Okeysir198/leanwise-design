"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Dialog as RD } from "radix-ui";
import { Icon } from "../primitives/Icon.js";
import { Layer, useLayer } from "./_layer.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function Drawer({
  open,
  onOpenChange,
  onClose,
  trigger,
  title,
  label,
  description,
  footer,
  side = "end",
  width,
  closeLabel = "Close",
  className,
  children,
  ...rest
}) {
  const layer = useLayer();
  const [fromEl, setFromEl] = React.useState(null);
  const w = width == null || width === "" ? null : /^\d+(\.\d+)?$/.test(String(width)) ? String(width) + "px" : String(width);
  React.useLayoutEffect(() => {
    if (open) setFromEl(typeof document !== "undefined" ? document.activeElement : null);
    else setFromEl(null);
  }, [open]);
  const handleOpenChange = (next) => {
    onOpenChange && onOpenChange(next);
    if (!next && onClose) onClose();
  };
  return /* @__PURE__ */ jsxs(RD.Root, { open: !!open, onOpenChange: handleOpenChange, modal: true, children: [
    trigger && /* @__PURE__ */ jsx(RD.Trigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsx(RD.Portal, { container: layer ? layer.container : void 0, children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Layer, { modal: true, from: fromEl, children: [
      /* @__PURE__ */ jsx(RD.Overlay, { className: "lw-backdrop" }),
      /* @__PURE__ */ jsxs(
        RD.Content,
        {
          className: cx("lw-drawer", className),
          "data-side": side,
          tabIndex: -1,
          style: w ? { "--lw-drawer-w": w } : void 0,
          ...rest,
          children: [
            title ? /* @__PURE__ */ jsxs("div", { className: "lw-drawer-head", children: [
              /* @__PURE__ */ jsx(RD.Title, { className: "lw-drawer-title", children: title }),
              /* @__PURE__ */ jsx(RD.Close, { asChild: true, children: /* @__PURE__ */ jsx("button", { type: "button", className: "lw-icon-btn", "aria-label": closeLabel, title: closeLabel, children: /* @__PURE__ */ jsx(Icon, { name: "close", size: 17 }) }) })
            ] }) : label != null && /* @__PURE__ */ jsx(RD.Title, { className: "lw-sr-only", children: label }),
            /* @__PURE__ */ jsxs("div", { className: "lw-drawer-body", children: [
              description && /* @__PURE__ */ jsx(RD.Description, { asChild: true, children: /* @__PURE__ */ jsx("div", { children: description }) }),
              children
            ] }),
            footer && /* @__PURE__ */ jsx("div", { className: "lw-drawer-foot", children: footer })
          ]
        }
      )
    ] }) }) })
  ] });
}
export {
  Drawer
};
