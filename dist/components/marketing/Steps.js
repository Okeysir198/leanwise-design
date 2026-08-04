import { jsx, jsxs } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Steps({ items = [], orientation = "vertical", linkAs = "a", className, ...rest }) {
  const Link = linkAs;
  return /* @__PURE__ */ jsx("ol", { className: cx("lw-steps", orientation === "horizontal" && "lw-steps-horizontal", className), ...rest, children: items.map((it, i) => /* @__PURE__ */ jsxs("li", { className: "lw-step", children: [
    /* @__PURE__ */ jsx("span", { className: "lw-step-marker", children: it.label ?? String(i + 1).padStart(2, "0") }),
    /* @__PURE__ */ jsxs("div", { children: [
      it.meta && /* @__PURE__ */ jsx("span", { className: "lw-step-meta", children: it.meta }),
      /* @__PURE__ */ jsx("h3", { className: "lw-step-title", children: it.title }),
      it.body && /* @__PURE__ */ jsx("p", { className: "lw-step-body", children: it.body }),
      it.href && /* @__PURE__ */ jsx("p", { className: "lw-step-body", children: /* @__PURE__ */ jsx(Link, { href: it.href, children: it.more || "Learn more" }) })
    ] })
  ] }, i)) });
}
export {
  Steps
};
