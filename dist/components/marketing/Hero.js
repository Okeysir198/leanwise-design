import { jsx, jsxs } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Hero({ eyebrow, title, lead, actions, aside, className, children, ...rest }) {
  return /* @__PURE__ */ jsx("section", { className: cx("lw-hero-dark", className), ...rest, children: /* @__PURE__ */ jsxs("div", { className: "lw-container", children: [
    eyebrow && /* @__PURE__ */ jsx("p", { className: "lw-eyebrow", children: eyebrow }),
    title && /* @__PURE__ */ jsx("h1", { className: "lw-h1", children: title }),
    lead && /* @__PURE__ */ jsx("p", { className: "lw-lead", children: lead }),
    actions && /* @__PURE__ */ jsx("div", { className: "lw-cluster lw-cluster-12 lw-hero-actions", children: actions }),
    aside,
    children
  ] }) });
}
export {
  Hero
};
