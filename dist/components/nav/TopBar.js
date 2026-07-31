import { jsx, jsxs } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function TopBar({ brand, brandHref, logo = false, links = [], actions, className, children, ...rest }) {
  const Brand = brandHref ? "a" : "span";
  const brandProps = brandHref ? { href: brandHref, "aria-label": typeof brand === "string" ? brand + " \u2014 home" : "Home" } : {};
  return /* @__PURE__ */ jsxs("header", { className: cx("lw-topbar", className), ...rest, children: [
    logo ? /* @__PURE__ */ jsxs(Brand, { className: "brand", ...brandProps, children: [
      /* @__PURE__ */ jsx("span", { className: "brand-mark", "aria-hidden": "true" }),
      brand
    ] }) : brand && /* @__PURE__ */ jsx(Brand, { className: "brand", ...brandProps, children: brand }),
    links.length > 0 && /* @__PURE__ */ jsx("nav", { "aria-label": "Primary", children: links.map((l, i) => /* @__PURE__ */ jsx("a", { href: l.href, "aria-current": l.current ? "page" : void 0, children: l.label }, l.id ?? i)) }),
    /* @__PURE__ */ jsx("span", { className: "spacer" }),
    actions,
    children
  ] });
}
export {
  TopBar
};
