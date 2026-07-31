import { Fragment, jsx, jsxs } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function LogoRail({ logos = [], marquee = false, className, ...rest }) {
  const cells = logos.map(
    (l, i) => l.src ? /* @__PURE__ */ jsx("span", { className: "lw-logo-item", style: { "--lw-logo-src": `url("${l.src}")` }, role: "img", "aria-label": l.name }, i) : /* @__PURE__ */ jsx("span", { className: "lw-logo-item is-text", children: l.name }, i)
  );
  return /* @__PURE__ */ jsx("div", { className: cx("lw-logo-rail", marquee && "marquee", className), ...rest, children: marquee ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "lw-logo-track", children: cells }),
    /* @__PURE__ */ jsx("div", { className: "lw-logo-track", "aria-hidden": "true", children: cells })
  ] }) : cells });
}
export {
  LogoRail
};
