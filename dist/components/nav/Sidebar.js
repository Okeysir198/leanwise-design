import { jsx, jsxs } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Sidebar({ items = [], collapsed = false, footer, linkAs, className, children, ...rest }) {
  return /* @__PURE__ */ jsxs("nav", { className: cx("lw-sidebar", className), "data-collapsed": collapsed ? "true" : void 0, "aria-label": "Sections", ...rest, children: [
    items.map(
      (it, i) => it.group ? /* @__PURE__ */ jsx("span", { className: "lw-nav-group", children: it.group }, "g" + i) : /* @__PURE__ */ jsx(NavItem, { linkAs, ...it, collapsed }, it.id ?? i)
    ),
    children,
    footer && /* @__PURE__ */ jsx("div", { className: "lw-sidebar-foot", children: footer })
  ] });
}
function NavItem({ href, label, icon, badge, current, collapsed, linkAs = "a", className, ...rest }) {
  const Tag = href ? linkAs : "button";
  const tip = collapsed && typeof label === "string" ? label : void 0;
  return /* @__PURE__ */ jsxs(
    Tag,
    {
      className: cx("lw-nav-item", className),
      href,
      type: href ? void 0 : "button",
      "aria-current": current ? "page" : void 0,
      title: tip,
      ...rest,
      children: [
        icon && /* @__PURE__ */ jsx("span", { className: "ic", "aria-hidden": "true", children: icon }),
        /* @__PURE__ */ jsx("span", { className: "lw-nav-text", children: label }),
        badge && /* @__PURE__ */ jsx("span", { className: "badge", children: badge })
      ]
    }
  );
}
export {
  NavItem,
  Sidebar
};
