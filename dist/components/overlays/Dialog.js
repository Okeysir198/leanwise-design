"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Dialog as RD } from "radix-ui";
import { Icon } from "../primitives/Icon.js";
import { Layer, useLayer } from "./_layer.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function Dialog({
  open,
  onOpenChange,
  onClose,
  trigger,
  title,
  label,
  description,
  footer,
  width,
  closeLabel = "Close",
  className,
  children,
  onCloseAutoFocus: userCloseAutoFocus,
  ...rest
}) {
  const layer = useLayer();
  const [fromEl, setFromEl] = React.useState(null);
  const openerRef = React.useRef(null);
  const w = width == null || width === "" ? null : /^\d+(\.\d+)?$/.test(String(width)) ? String(width) + "px" : String(width);
  React.useLayoutEffect(() => {
    if (open) {
      const el = typeof document !== "undefined" ? document.activeElement : null;
      openerRef.current = el;
      setFromEl(el);
    } else setFromEl(null);
  }, [open]);
  const onCloseAutoFocus = (e) => {
    if (userCloseAutoFocus) userCloseAutoFocus(e);
    if (e.defaultPrevented) return;
    const el = openerRef.current;
    if (el && typeof el.focus === "function" && el.isConnected) {
      e.preventDefault();
      el.focus();
    }
  };
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
          className: cx("lw-dialog", className),
          tabIndex: -1,
          onCloseAutoFocus,
          style: w ? { "--lw-dialog-w": w } : void 0,
          ...rest,
          children: [
            title ? /* @__PURE__ */ jsxs("div", { className: "lw-dialog-head", children: [
              /* @__PURE__ */ jsx(RD.Title, { className: "lw-dialog-title", children: title }),
              /* @__PURE__ */ jsx(RD.Close, { asChild: true, children: /* @__PURE__ */ jsx("button", { type: "button", className: "lw-icon-btn lw-dialog-close lw-hit", "aria-label": closeLabel, title: closeLabel, children: /* @__PURE__ */ jsx(Icon, { name: "close", size: 17 }) }) })
            ] }) : (
              /* Radix names the dialog from its Title and logs an error when
                 there is none — a nameless dialog is the defect, not the
                 warning. `label` is the sr-only name for a title-less one. */
              label != null && /* @__PURE__ */ jsx(RD.Title, { className: "lw-sr-only", children: label })
            ),
            /* @__PURE__ */ jsxs("div", { className: "lw-dialog-body", children: [
              description && /* @__PURE__ */ jsx(RD.Description, { asChild: true, children: /* @__PURE__ */ jsx("div", { children: description }) }),
              children
            ] }),
            footer && /* @__PURE__ */ jsx("div", { className: "lw-dialog-foot", children: footer })
          ]
        }
      )
    ] }) }) })
  ] });
}
export {
  Dialog
};
