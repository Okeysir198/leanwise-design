import { jsx, jsxs } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function TopBar({
  brand,
  brandHref,
  logo = false,
  links = [],
  actions,
  linkAs = "a",
  navLabel = "Primary",
  homeLabel = "Home",
  formatBrandLabel = (b) => b + " \u2014 home",
  className,
  children,
  ...rest
}) {
  const Link = linkAs;
  const Brand = brandHref ? linkAs : "span";
  const brandProps = brandHref ? { href: brandHref, "aria-label": typeof brand === "string" ? formatBrandLabel(brand) : homeLabel } : {};
  return /* @__PURE__ */ jsxs("header", { className: cx("lw-topbar", className), ...rest, children: [
    logo ? /* @__PURE__ */ jsxs(Brand, { className: "brand", ...brandProps, children: [
      /* @__PURE__ */ jsx("span", { className: "brand-mark", "aria-hidden": "true" }),
      brand
    ] }) : brand && /* @__PURE__ */ jsx(Brand, { className: "brand", ...brandProps, children: brand }),
    links.length > 0 && /* @__PURE__ */ jsx("nav", { "aria-label": navLabel, children: links.map((l, i) => /* @__PURE__ */ jsx(Link, { href: l.href, "aria-current": l.current ? "page" : void 0, children: l.label }, l.id ?? i)) }),
    /* @__PURE__ */ jsx("span", { className: "spacer" }),
    actions,
    children
  ] });
}
export {
  TopBar
};
