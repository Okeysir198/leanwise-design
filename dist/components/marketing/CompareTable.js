import { jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function CompareTable({
  columns = [],
  groups = [],
  caption,
  yesLabel = "Included",
  noLabel = "Not included",
  className,
  ...rest
}) {
  const cell = (v) => {
    if (v === true) {
      return /* @__PURE__ */ jsxs("span", { className: "lw-compare-yes", children: [
        /* @__PURE__ */ jsx(Icon, { name: "check", size: 16 }),
        /* @__PURE__ */ jsx("span", { className: "lw-sr-only", children: yesLabel })
      ] });
    }
    if (v === false || v == null) {
      return /* @__PURE__ */ jsxs("span", { className: "lw-compare-no", children: [
        /* @__PURE__ */ jsx(Icon, { name: "minus", size: 16 }),
        /* @__PURE__ */ jsx("span", { className: "lw-sr-only", children: noLabel })
      ] });
    }
    return v;
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "lw-compare-scroll",
      tabIndex: 0,
      role: "region",
      "aria-label": typeof caption === "string" ? caption : void 0,
      children: /* @__PURE__ */ jsxs("table", { className: cx("lw-compare", className), ...rest, children: [
        caption && /* @__PURE__ */ jsx("caption", { children: caption }),
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { className: "lw-compare-corner" }),
          columns.map((c) => /* @__PURE__ */ jsx("th", { scope: "col", "data-featured": c.featured || void 0, children: c.label }, c.key))
        ] }) }),
        groups.map((g, gi) => /* @__PURE__ */ jsxs("tbody", { children: [
          g.label && /* @__PURE__ */ jsx("tr", { className: "lw-compare-group", children: /* @__PURE__ */ jsx("th", { scope: "colgroup", colSpan: columns.length + 1, children: g.label }) }),
          g.rows.map((r, ri) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { scope: "row", children: r.label }),
            columns.map((c, ci) => /* @__PURE__ */ jsx("td", { "data-featured": c.featured || void 0, children: cell(r.values[ci]) }, c.key))
          ] }, ri))
        ] }, gi))
      ] })
    }
  );
}
export {
  CompareTable
};
