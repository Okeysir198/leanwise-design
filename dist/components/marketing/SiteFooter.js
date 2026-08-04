import { jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function SiteFooter({ brand, desc, columns = [], legal, bottom, dark = false, linkAs = "a", className, children, ...rest }) {
  const Link = linkAs;
  return /* @__PURE__ */ jsx("footer", { className: cx("lw-footer", className), "data-band": dark ? "dark" : void 0, ...rest, children: /* @__PURE__ */ jsxs("div", { className: "lw-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "lw-footer-grid", children: [
      /* @__PURE__ */ jsxs("div", { className: "lw-footer-brand", children: [
        brand,
        desc && /* @__PURE__ */ jsx("p", { className: "lw-footer-desc", children: desc })
      ] }),
      columns.map((col, i) => (
        /* Keyed by index, not heading: two columns may legitimately share a
           heading (or have none), and React treats duplicate keys as
           unsupported. Same reasoning as TopBar and Sidebar. */
        /* @__PURE__ */ jsxs("nav", { "aria-label": typeof col.heading === "string" ? col.heading : void 0, children: [
          col.heading && /* @__PURE__ */ jsx("h2", { className: "lw-footer-head", children: col.heading }),
          (col.links || []).map(
            (l, j) => l.href ? /* @__PURE__ */ jsxs(
              Link,
              {
                className: "lw-footer-link",
                href: l.href,
                "aria-current": l.current ? "page" : void 0,
                target: l.external ? "_blank" : void 0,
                rel: l.external ? "noreferrer noopener" : void 0,
                children: [
                  l.label,
                  l.external && /* @__PURE__ */ jsx(Icon, { name: "external", size: 12 })
                ]
              },
              j
            ) : /* @__PURE__ */ jsx("span", { className: "lw-footer-note", children: l.label }, j)
          )
        ] }, i)
      ))
    ] }),
    (legal || bottom || children) && /* @__PURE__ */ jsxs("div", { className: "lw-footer-bottom", children: [
      legal && /* @__PURE__ */ jsx("p", { className: "lw-measure", children: legal }),
      bottom,
      children
    ] })
  ] }) });
}
export {
  SiteFooter
};
