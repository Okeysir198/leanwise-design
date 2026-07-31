"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function BottomNav({ items = [], value, onChange, label = "Main", className, ...rest }) {
  React.useEffect(() => {
    if (items.length <= 5 || typeof console === "undefined") return;
    console.warn("BottomNav: " + items.length + " items. Past five, labels truncate and the bar stops being scannable \u2014 use a sidebar or a More destination.");
  }, [items.length]);
  return /* @__PURE__ */ jsx("nav", { className: cx("lw-bottom-nav", className), "aria-label": label, ...rest, children: items.map((it) => {
    const on = it.value === value;
    const Tag = it.href ? "a" : "button";
    return /* @__PURE__ */ jsxs(
      Tag,
      {
        href: it.href || void 0,
        type: it.href ? void 0 : "button",
        "aria-current": on ? "page" : void 0,
        onClick: it.href ? void 0 : () => onChange && onChange(it.value),
        children: [
          /* @__PURE__ */ jsx(Icon, { name: it.icon, size: 21 }),
          /* @__PURE__ */ jsx("span", { className: "lw-bn-label", children: it.label }),
          it.badge != null && /* @__PURE__ */ jsx("span", { className: "lw-sr-only", children: it.badge + " unread" })
        ]
      },
      it.value
    );
  }) });
}
export {
  BottomNav
};
