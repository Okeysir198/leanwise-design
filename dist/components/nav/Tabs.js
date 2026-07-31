"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
function Tabs({ tabs = [], value, onChange, label, className, ...rest }) {
  const ref = React.useRef(null);
  const move = (next) => {
    onChange && onChange(tabs[next].value);
    const el = ref.current && ref.current.querySelectorAll('[role="tab"]')[next];
    if (el) el.focus({ preventScroll: true });
  };
  const onKeyDown = (e) => {
    const found = tabs.findIndex((t) => t.value === value);
    const i = found < 0 ? 0 : found;
    const k = e.key;
    if (k === "Home") {
      e.preventDefault();
      return move(0);
    }
    if (k === "End") {
      e.preventDefault();
      return move(tabs.length - 1);
    }
    const d = k === "ArrowRight" ? 1 : k === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    move((i + d + tabs.length) % tabs.length);
  };
  return /* @__PURE__ */ jsx("div", { ref, className: cx("lw-tabs", className), role: "tablist", "aria-label": label, onKeyDown, ...rest, children: tabs.map((t) => /* @__PURE__ */ jsxs(
    "button",
    {
      role: "tab",
      type: "button",
      "aria-selected": t.value === value,
      "aria-controls": t.controls,
      id: t.id,
      tabIndex: t.value === value ? 0 : -1,
      onClick: () => onChange && onChange(t.value),
      children: [
        t.label,
        t.count != null && /* @__PURE__ */ jsx("span", { className: "count", children: t.count })
      ]
    },
    t.value
  )) });
}
export {
  Tabs
};
