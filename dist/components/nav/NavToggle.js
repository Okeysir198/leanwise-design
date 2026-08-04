"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function NavToggle({
  label = "Menu",
  closeLabel = "Close menu",
  id,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ...rest
}) {
  const auto = React.useId();
  const panelId = id || "lw-nav-panel-" + auto;
  const [open, setOpen] = React.useState(defaultOpen);
  const btnRef = React.useRef(null);
  const set = (next) => {
    setOpen(next);
    onOpenChange?.(next);
  };
  const onKeyDown = (e) => {
    if (e.key !== "Escape" || !open) return;
    e.stopPropagation();
    set(false);
    btnRef.current?.focus();
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        ref: btnRef,
        className: cx("lw-topbar-toggle", "lw-icon-btn", "lw-hit", className),
        "aria-expanded": open,
        "aria-controls": panelId,
        "aria-label": open ? closeLabel : label,
        onClick: () => set(!open),
        onKeyDown,
        ...rest,
        children: /* @__PURE__ */ jsx(Icon, { name: open ? "close" : "menu", size: 20 })
      }
    ),
    /* @__PURE__ */ jsx("div", { id: panelId, className: "lw-topbar-panel", hidden: !open, onKeyDown, children })
  ] });
}
export {
  NavToggle
};
