"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function Dialog({ open, onClose, title, description, footer, width, className, children, ...rest }) {
  const ref = React.useRef(null);
  const uid = React.useId();
  const titleId = title ? uid + "-t" : void 0;
  const descId = description ? uid + "-d" : void 0;
  const w = width == null || width === "" ? null : /^\d+(\.\d+)?$/.test(String(width)) ? String(width) + "px" : String(width);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);
  return /* @__PURE__ */ jsxs(
    "dialog",
    {
      ref,
      className: cx("lw-dialog", className),
      style: w ? { "--lw-dialog-w": w } : void 0,
      onClose,
      onCancel: (e) => {
        e.preventDefault();
        onClose && onClose(e);
      },
      "aria-labelledby": titleId,
      "aria-describedby": descId,
      ...rest,
      children: [
        title && /* @__PURE__ */ jsxs("div", { className: "lw-dialog-head", children: [
          /* @__PURE__ */ jsx("h2", { className: "lw-dialog-title", id: titleId, children: title }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "lw-icon-btn lw-dialog-close", "aria-label": "Close", title: "Close", onClick: onClose, children: /* @__PURE__ */ jsx(Icon, { name: "close", size: 17 }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "lw-dialog-body", children: [
          description && /* @__PURE__ */ jsx("div", { id: descId, children: description }),
          children
        ] }),
        footer && /* @__PURE__ */ jsx("div", { className: "lw-dialog-foot", children: footer })
      ]
    }
  );
}
export {
  Dialog
};
