import { jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
import { TopBar } from "./TopBar.js";
import { Breadcrumbs } from "./Breadcrumbs.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function AppBar({
  brand = "LeanWise AI",
  brandHref = "#",
  mark = true,
  crumbs = [],
  onMenuClick,
  menuExpanded,
  actions,
  linkAs = "a",
  collapseNavLabel = "Collapse navigation",
  expandNavLabel = "Expand navigation",
  homeLabel = "Home",
  formatBrandLabel = (b) => b + " \u2014 home",
  className,
  children,
  ...rest
}) {
  const Brand = brandHref ? linkAs : "span";
  return /* @__PURE__ */ jsxs(TopBar, { className, ...rest, children: [
    /* @__PURE__ */ jsxs("div", { className: "lw-appbar-lead", children: [
      onMenuClick && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "lw-icon-btn",
          onClick: onMenuClick,
          "aria-expanded": menuExpanded,
          "aria-label": menuExpanded ? collapseNavLabel : expandNavLabel,
          children: /* @__PURE__ */ jsx(Icon, { name: "sidebar", size: 21 })
        }
      ),
      /* @__PURE__ */ jsxs(
        Brand,
        {
          className: "lw-appbar-brand",
          href: brandHref || void 0,
          "aria-label": brandHref ? typeof brand === "string" ? formatBrandLabel(brand) : homeLabel : void 0,
          children: [
            mark && /* @__PURE__ */ jsx("span", { className: "brand-mark", "aria-hidden": "true" }),
            brand
          ]
        }
      ),
      crumbs.length > 0 && /* @__PURE__ */ jsx(Breadcrumbs, { items: crumbs, linkAs })
    ] }),
    actions,
    children
  ] });
}
export {
  AppBar
};
