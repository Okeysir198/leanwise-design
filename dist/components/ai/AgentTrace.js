import { jsx, jsxs } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function AgentTrace({ steps = [], className, ...rest }) {
  return /* @__PURE__ */ jsx("ol", { className: cx("lw-trace", className), ...rest, children: steps.map((s, i) => /* @__PURE__ */ jsxs("li", { "data-state": s.state || "pending", children: [
    /* @__PURE__ */ jsx("span", { className: "step", children: s.label }),
    s.meta && /* @__PURE__ */ jsx("span", { className: "meta", children: s.meta })
  ] }, i)) });
}
export {
  AgentTrace
};
