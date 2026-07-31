"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
import { colHeader, legacySortArgs, emitSort } from "./_columns.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function Table({ columns, rows, hover = true, compact = false, caption, sort: sortState, onSort, className, children, ...rest }) {
  const legacyArgs = legacySortArgs("Table", columns || [], onSort);
  const head = columns && /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: columns.map((c) => {
    const sortable = (c.sortable || c.sort) && onSort;
    let sort;
    if (sortState && sortState.key === c.key) {
      sort = sortState.dir === "desc" ? "descending" : "ascending";
    } else if (sortState) {
      sort = void 0;
    } else {
      sort = c.sort === "asc" ? "ascending" : c.sort === "desc" ? "descending" : c.sort;
    }
    return /* @__PURE__ */ jsx(
      "th",
      {
        className: c.num ? "num" : void 0,
        scope: "col",
        "aria-sort": sortable ? sort || "none" : sort || void 0,
        children: sortable ? /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => emitSort(onSort, legacyArgs, c.key, sort === "ascending" ? "desc" : "asc"), children: [
          colHeader("Table", c),
          /* @__PURE__ */ jsx(Icon, { name: sort === "descending" ? "chevron-down" : "chevron-up", size: 12 })
        ] }) : colHeader("Table", c)
      },
      c.key
    );
  }) }) });
  return /* @__PURE__ */ jsx("div", { className: "lw-table-wrap lw-scroll", children: /* @__PURE__ */ jsxs("table", { className: cx("lw-table", hover && "lw-table-hover", compact && "lw-table-compact", className), ...rest, children: [
    caption && /* @__PURE__ */ jsx("caption", { className: "lw-sr-only", children: caption }),
    head,
    rows ? /* @__PURE__ */ jsx("tbody", { children: rows.map((r, i) => /* @__PURE__ */ jsx("tr", { children: columns.map((c) => /* @__PURE__ */ jsx("td", { className: cx(c.num && "num", c.muted && "muted"), children: r[c.key] }, c.key)) }, r.id ?? i)) }) : children
  ] }) });
}
export {
  Table
};
