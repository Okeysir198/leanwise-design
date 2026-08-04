import { jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function Flow({ nodes = [], edges, orientation = "horizontal", as, className, ...rest }) {
  const Tag = as || "ol";
  const Item = Tag === "ol" || Tag === "ul" ? "li" : "div";
  const linked = edges ? new Set(edges.map(([a, b]) => `${a}\0${b}`)) : null;
  const hasEdge = (a, b) => linked ? linked.has(`${a}\0${b}`) : true;
  const children = [];
  nodes.forEach((n, i) => {
    if (i > 0 && hasEdge(nodes[i - 1].id, n.id)) {
      children.push(/* @__PURE__ */ jsx(Item, { className: "lw-flow-edge", "aria-hidden": "true" }, `edge-${i}`));
    }
    children.push(
      /* @__PURE__ */ jsxs(
        Item,
        {
          className: "lw-card lw-flow-node",
          "aria-current": n.current ? "step" : void 0,
          children: [
            /* @__PURE__ */ jsxs("span", { className: "lw-flow-head", children: [
              n.icon && /* @__PURE__ */ jsx(Icon, { name: n.icon, size: 16 }),
              /* @__PURE__ */ jsx("span", { className: "lw-flow-label", children: String(i + 1).padStart(2, "0") })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "lw-flow-title", children: n.label }),
            n.sub && /* @__PURE__ */ jsx("p", { className: "lw-flow-sub", children: n.sub }),
            n.detail
          ]
        },
        n.id ?? i
      )
    );
  });
  return /* @__PURE__ */ jsx(Tag, { className: cx("lw-flow", orientation === "vertical" && "lw-flow-vertical", className), ...rest, children });
}
export {
  Flow
};
