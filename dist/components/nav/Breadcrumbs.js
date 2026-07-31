import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
function Breadcrumbs({ items = [], className, ...rest }) {
  return /* @__PURE__ */ jsx("nav", { className: cx("lw-crumbs", className), "aria-label": "Breadcrumb", ...rest, children: items.map((it, i) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
    i > 0 && /* @__PURE__ */ jsx("span", { className: "sep", "aria-hidden": "true", children: "/" }),
    it.href && i < items.length - 1 ? /* @__PURE__ */ jsx("a", { href: it.href, children: it.label }) : /* @__PURE__ */ jsx("span", { "aria-current": i === items.length - 1 ? "page" : void 0, children: it.label })
  ] }, i)) });
}
export {
  Breadcrumbs
};
