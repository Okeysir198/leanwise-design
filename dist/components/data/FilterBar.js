"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function FilterBar({ filters = [], onRemove, onClear, className, children, ...rest }) {
  if (!filters.length && !children) return null;
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-filters", className), role: "group", "aria-label": "Applied filters", ...rest, children: [
    children,
    filters.map((f) => /* @__PURE__ */ jsxs("span", { className: "lw-filter-chip", children: [
      f.key && /* @__PURE__ */ jsx("span", { className: "k", children: f.key }),
      /* @__PURE__ */ jsx("span", { children: f.label ?? f.value }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": "Remove filter " + (f.key ? f.key + " " : "") + (f.label ?? f.value),
          onClick: () => onRemove && onRemove(f),
          children: /* @__PURE__ */ jsx(Icon, { name: "close", size: 11 })
        }
      )
    ] }, f.id ?? f.key + ":" + f.value)),
    filters.length > 1 && onClear && /* @__PURE__ */ jsx("button", { type: "button", className: "lw-filter-clear", onClick: onClear, children: "Clear all" })
  ] });
}
function Toolbar({ className, children, ...rest }) {
  return /* @__PURE__ */ jsx("div", { className: cx("lw-toolbar", className), ...rest, children });
}
export {
  FilterBar,
  Toolbar
};
