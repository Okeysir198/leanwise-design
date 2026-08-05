import { jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
import { isChain, planGraph } from "./_flow-graph.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function Flow({
  nodes = [],
  edges,
  orientation = "horizontal",
  layout = "auto",
  label,
  tableLabels,
  as,
  className,
  ...rest
}) {
  const list = edges?.map((e) => Array.isArray(e) ? { from: e[0], to: e[1] } : e);
  const graph = layout !== "chain" && list?.length && (layout === "graph" || !isChain(nodes, list)) ? planGraph(nodes, list) : null;
  if (graph) {
    return /* @__PURE__ */ jsx(
      FlowGraph,
      {
        graph,
        label,
        tableLabels,
        className,
        ...rest
      }
    );
  }
  return /* @__PURE__ */ jsx(FlowChain, { nodes, edges, orientation, as, className, ...rest });
}
function FlowChain({ nodes = [], edges, orientation = "horizontal", as, className, ...rest }) {
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
function FlowGraph({ graph, label, tableLabels, className, ...rest }) {
  const index = new Map(graph.order.map((n, i) => [n.id, i]));
  const num = (id) => String(index.get(id) + 1).padStart(2, "0");
  warnOnce(!label, "Flow: a branching flow needs `label` \u2014 it names the diagram and captions its successors table.");
  warnOnce(
    !tableLabels,
    "Flow: a branching flow needs `tableLabels` \u2014 the successors table's headers are the consumer's words, in the consumer's locale, never a literal in this package."
  );
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-flow-wrap", className), ...rest, children: [
    /* @__PURE__ */ jsxs("table", { className: "lw-sr-only", children: [
      label && /* @__PURE__ */ jsx("caption", { children: label }),
      tableLabels && /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { scope: "col", children: tableLabels.step }),
        /* @__PURE__ */ jsx("th", { scope: "col", children: tableLabels.leadsTo })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: graph.order.map((n) => {
        const next = graph.successors.get(n.id) ?? [];
        return /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsxs("th", { scope: "row", children: [
            num(n.id),
            " ",
            n.label
          ] }),
          /* @__PURE__ */ jsx("td", { children: next.length ? next.map((e) => `${num(e.to)} ${nodeLabel(graph, e.to)}${e.label ? ` (${e.label})` : ""}`).join("; ") : (
            /* Never an empty cell: a screen reader skips one, so a
               terminal node would read as a row with a missing answer
               rather than as the end of the flow. */
            tableLabels?.none ?? "\u2014"
          ) })
        ] }, n.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxs(
      "ul",
      {
        className: "lw-flow lw-flow-graph",
        style: {
          "--lw-flow-tracks": graph.tracks,
          "--lw-flow-row-tracks": graph.rowTracks
        },
        children: [
          graph.order.map((n) => {
            const p = graph.place(n.id);
            return /* @__PURE__ */ jsxs(
              "li",
              {
                className: "lw-card lw-flow-node",
                "aria-current": n.current ? "step" : void 0,
                "data-kind": n.kind || void 0,
                style: { "--lw-flow-c": p.c, "--lw-flow-r": p.r, "--lw-flow-depth": graph.depth(n.id) },
                children: [
                  /* @__PURE__ */ jsxs("span", { className: "lw-flow-head", children: [
                    n.icon && /* @__PURE__ */ jsx(Icon, { name: n.icon, size: 16 }),
                    /* @__PURE__ */ jsx("span", { className: "lw-flow-label", children: num(n.id) })
                  ] }),
                  /* @__PURE__ */ jsx("h3", { className: "lw-flow-title", children: n.label }),
                  n.sub && /* @__PURE__ */ jsx("p", { className: "lw-flow-sub", children: n.sub }),
                  n.detail
                ]
              },
              n.id
            );
          }),
          graph.connectors.map((c) => /* @__PURE__ */ jsx(
            "li",
            {
              className: "lw-flow-cell",
              "data-edge": c.tokens,
              "data-edge-kind": c.kind === "back" ? "back" : void 0,
              "aria-hidden": "true",
              style: { "--lw-flow-c": c.c, "--lw-flow-r": c.r }
            },
            `e-${c.c}-${c.r}`
          ))
        ]
      }
    )
  ] });
}
function nodeLabel(graph, id) {
  return graph.order.find((n) => n.id === id)?.label;
}
const warned = /* @__PURE__ */ new Set();
function warnOnce(condition, message) {
  if (!condition || warned.has(message) || typeof console === "undefined") return;
  warned.add(message);
  console.warn(message);
}
export {
  Flow
};
