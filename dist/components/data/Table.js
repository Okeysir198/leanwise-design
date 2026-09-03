"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
import { Menu } from "../overlays/Menu.js";
import { useOverflow } from "../_overflow.js";
import { colHeader, legacySortArgs, emitSort } from "./_columns.js";
import { warnOnce } from "../_deprecate.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const labelText = (h) => typeof h === "string" ? h : typeof h === "number" ? String(h) : void 0;
function Table({
  columns,
  rows,
  hover = true,
  compact = false,
  caption,
  sort: sortState,
  onSort,
  collapse,
  detailsLabel,
  sortLabel,
  className,
  children,
  ...rest
}) {
  const legacyArgs = legacySortArgs("Table", columns || [], onSort);
  const cards = collapse === "cards";
  const wrapRef = useOverflow();
  if (cards && !detailsLabel) {
    warnOnce(
      "Table",
      "detailsLabel",
      '`collapse="cards"` needs `detailsLabel` \u2014 the collapsed row\'s disclosure is rendered with no accessible name, so the columns behind it cannot be reached.'
    );
  }
  const sortOf = (c) => {
    if (sortState && sortState.key === c.key) return sortState.dir === "desc" ? "descending" : "ascending";
    if (sortState) return void 0;
    return c.sort === "asc" ? "ascending" : c.sort === "desc" ? "descending" : c.sort;
  };
  const isSortable = (c) => Boolean((c.sortable || c.sort) && onSort);
  const head = columns && /* @__PURE__ */ jsx("thead", { role: cards ? "rowgroup" : void 0, children: /* @__PURE__ */ jsx("tr", { role: cards ? "row" : void 0, children: columns.map((c) => {
    const sortable = isSortable(c);
    const sort = sortOf(c);
    return /* @__PURE__ */ jsx(
      "th",
      {
        className: c.num ? "num" : void 0,
        scope: "col",
        role: cards ? "columnheader" : void 0,
        "aria-sort": sortable ? sort || "none" : sort || void 0,
        children: sortable ? /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => emitSort(onSort, legacyArgs, c.key, sort === "ascending" ? "desc" : "asc"), children: [
          colHeader("Table", c),
          /* @__PURE__ */ jsx(Icon, { name: sort === "descending" ? "chevron-down" : "chevron-up", size: 12 })
        ] }) : colHeader("Table", c)
      },
      c.key
    );
  }) }) });
  const sortableCols = cards && onSort && columns ? columns.filter(isSortable) : [];
  if (sortableCols.length > 0 && !sortLabel) {
    warnOnce(
      "Table",
      "sortLabel",
      '`collapse="cards"` hides the header row, so a sortable column needs `sortLabel` to reach the sort menu. Without it the collapsed table cannot be sorted at all.'
    );
  }
  const sortBar = sortableCols.length > 0 && sortLabel ? /* @__PURE__ */ jsx("div", { className: "lw-table-sort", children: /* @__PURE__ */ jsx(
    Menu,
    {
      label: sortLabel,
      placement: "bottom-end",
      items: sortableCols.map((c) => ({
        value: c.key,
        label: colHeader("Table", c),
        /* `checked` makes the row a menuitemcheckbox, so the column in force
           is announced as such instead of being a caret a screen reader
           never reaches. Choosing the active column flips its direction —
           the same gesture the header button performs. */
        checked: sortOf(c) !== void 0,
        icon: sortOf(c) === "descending" ? "chevron-down" : sortOf(c) === "ascending" ? "chevron-up" : void 0
      })),
      onSelect: (key) => {
        const c = sortableCols.find((x) => x.key === key);
        emitSort(onSort, legacyArgs, key, sortOf(c) === "ascending" ? "desc" : "asc");
      },
      trigger: /* @__PURE__ */ jsxs("button", { type: "button", className: "lw-btn lw-btn-ghost lw-btn-sm", children: [
        sortLabel,
        /* @__PURE__ */ jsx(Icon, { name: "chevron-down", size: 14 })
      ] })
    }
  ) }) : null;
  const partOf = (i) => i === 0 ? "title" : i <= 2 ? "meta" : "detail";
  const hasDetails = cards && columns && columns.length > 3;
  return (
    /* The wrapper SCROLLS, so it must be reachable by keyboard — a region a
       mouse can pan and a keyboard cannot is `scrollable-region-focusable`, an
       axe SERIOUS violation, and the only way to read the right-hand columns
       without a pointer. `CompareTable` was given exactly this treatment in
       v1.3.3; `Table` never was, because until v1.7.0 promoted `.lw-table-wrap`
       out of product.css the rule that makes it scroll was not loaded on any
       page axe scanned. The overflow was always in the component's intent — it
       just could not be observed. `role="region"` + the caption as its label is
       what stops a bare tabindex from announcing an unnamed stop. */
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: wrapRef,
        className: "lw-table-wrap lw-scroll",
        "data-collapse": cards ? "cards" : void 0,
        tabIndex: 0,
        role: "region",
        "aria-label": typeof caption === "string" ? caption : void 0,
        children: [
          sortBar,
          /* @__PURE__ */ jsxs(
            "table",
            {
              className: cx("lw-table", hover && "lw-table-hover", compact && "lw-table-compact", cards && "lw-table-collapse", className),
              role: cards ? "table" : void 0,
              ...rest,
              children: [
                caption && /* @__PURE__ */ jsx("caption", { className: "lw-sr-only", children: caption }),
                head,
                rows ? /* @__PURE__ */ jsx("tbody", { role: cards ? "rowgroup" : void 0, children: rows.map((r, i) => /* @__PURE__ */ jsx("tr", { role: cards ? "row" : void 0, children: columns.map((c, ci) => {
                  const part = cards ? partOf(ci) : void 0;
                  return /* @__PURE__ */ jsxs(
                    "td",
                    {
                      role: cards ? "cell" : void 0,
                      "data-part": part,
                      "data-label": part === "detail" ? labelText(colHeader("Table", c)) : void 0,
                      className: cx(c.num && "num", c.muted && "muted"),
                      children: [
                        r[c.key],
                        part === "title" && hasDetails && /* @__PURE__ */ jsx("details", { className: "lw-row-more", children: /* @__PURE__ */ jsxs("summary", { children: [
                          detailsLabel,
                          /* @__PURE__ */ jsx(Icon, { name: "chevron-down", size: 12 })
                        ] }) })
                      ]
                    },
                    c.key
                  );
                }) }, r.id ?? i)) }) : children
              ]
            }
          )
        ]
      }
    )
  );
}
export {
  Table
};
