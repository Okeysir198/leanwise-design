"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../primitives/Icon.js";
import { colHeader, legacySortArgs, emitSort } from "./_columns.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function DataGrid({
  columns = [],
  rows = [],
  rowKey = (r, i) => r.id ?? i,
  sort,
  onSort,
  selectable,
  selected = [],
  onSelectionChange,
  height = 420,
  rowHeight = 44,
  virtualize,
  overscan = 8,
  onRowClick,
  empty = "No rows",
  selectionActions,
  label = "Data grid",
  className,
  ...rest
}) {
  const DEFAULT_W = 160, MIN_W = 72, SEL_W = 44;
  const legacyArgs = legacySortArgs("DataGrid", columns, onSort);
  const [widths, setWidths] = React.useState(() => columns.map((c) => c.width || DEFAULT_W));
  const [scrollTop, setScrollTop] = React.useState(0);
  const scrollRef = React.useRef(null);
  const drag = React.useRef(null);
  const colKeys = columns.map((c) => c.key).join("\0");
  React.useEffect(() => {
    setWidths((prev) => columns.map((c, i) => prev[i] || c.width || DEFAULT_W));
  }, [colKeys]);
  const selSet = React.useMemo(() => new Set(selected), [selected]);
  const allOn = rows.length > 0 && rows.every((r, i) => selSet.has(rowKey(r, i)));
  const someOn = !allOn && rows.some((r, i) => selSet.has(rowKey(r, i)));
  const toggleAll = () => onSelectionChange && onSelectionChange(allOn ? [] : rows.map(rowKey));
  const toggleRow = (k) => {
    if (!onSelectionChange) return;
    const next = new Set(selSet);
    next.has(k) ? next.delete(k) : next.add(k);
    onSelectionChange(Array.from(next));
  };
  const pinLefts = React.useMemo(() => {
    let acc = selectable ? SEL_W : 0;
    return columns.map((c, i) => {
      if (!c.pin) return null;
      const l = acc;
      acc += widths[i] || DEFAULT_W;
      return l;
    });
  }, [columns, widths, selectable]);
  const lastPin = columns.reduce((last, c, i) => c.pin ? i : last, -1);
  const onResizeDown = (i, e) => {
    e.preventDefault();
    drag.current = { i, x: e.clientX, w: widths[i] || DEFAULT_W };
    let frame = 0, latest = null;
    const flush = () => {
      frame = 0;
      const d = drag.current;
      if (!d || latest === null) return;
      const min = columns[d.i].minWidth || MIN_W;
      setWidths((w) => w.map((v, n) => n === d.i ? Math.max(min, d.w + latest - d.x) : v));
    };
    const move = (ev) => {
      if (!drag.current) return;
      latest = ev.clientX;
      if (!frame) frame = requestAnimationFrame(flush);
    };
    const up = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        flush();
      }
      drag.current = null;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  const onResizeKey = (i, e) => {
    const d = e.key === "ArrowRight" ? 16 : e.key === "ArrowLeft" ? -16 : 0;
    if (!d) return;
    e.preventDefault();
    const min = columns[i].minWidth || MIN_W;
    setWidths((w) => w.map((v, n) => n === i ? Math.max(min, (v || DEFAULT_W) + d) : v));
  };
  const win = virtualize && rows.length * rowHeight > height;
  const start = win ? Math.max(0, Math.floor(scrollTop / rowHeight) - overscan) : 0;
  const visibleCount = win ? Math.ceil(height / rowHeight) + overscan * 2 : rows.length;
  const slice = win ? rows.slice(start, start + visibleCount) : rows;
  const padTop = win ? start * rowHeight : 0;
  const padBottom = win ? Math.max(0, (rows.length - start - slice.length) * rowHeight) : 0;
  const total = (selectable ? SEL_W : 0) + widths.reduce((s, w) => s + (w || DEFAULT_W), 0);
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-dgrid", className), ...rest, children: [
    selectable && selSet.size > 0 && /* @__PURE__ */ jsxs("div", { className: "lw-dgrid-selbar", children: [
      /* @__PURE__ */ jsx("span", { className: "count", children: selSet.size }),
      /* @__PURE__ */ jsx("span", { children: "selected" }),
      /* @__PURE__ */ jsx("span", { className: "lw-spacer" }),
      selectionActions,
      /* @__PURE__ */ jsx("button", { type: "button", className: "lw-filter-clear", onClick: () => onSelectionChange && onSelectionChange([]), children: "Clear" })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: scrollRef,
        className: "lw-dgrid-scroll",
        style: { maxHeight: height },
        onScroll: win ? (e) => setScrollTop(e.currentTarget.scrollTop) : void 0,
        children: [
          /* @__PURE__ */ jsxs("table", { style: { minWidth: total }, "aria-label": label, "aria-rowcount": rows.length, children: [
            /* @__PURE__ */ jsxs("colgroup", { children: [
              selectable && /* @__PURE__ */ jsx("col", { style: { width: SEL_W } }),
              columns.map((c, i) => /* @__PURE__ */ jsx("col", { style: { width: widths[i] || DEFAULT_W } }, c.key))
            ] }),
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
              selectable && /* @__PURE__ */ jsx("th", { "data-pin": "true", style: { insetInlineStart: 0 }, scope: "col", children: /* @__PURE__ */ jsx("span", { className: "lw-dgrid-check", children: /* @__PURE__ */ jsxs("label", { className: "lw-check", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: allOn,
                    ref: (el) => {
                      if (el) el.indeterminate = someOn;
                    },
                    onChange: toggleAll,
                    "aria-label": allOn ? "Clear selection" : "Select all rows"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "box" })
              ] }) }) }),
              columns.map((c, i) => {
                const dir = sort && sort.key === c.key ? sort.dir : null;
                return /* @__PURE__ */ jsxs(
                  "th",
                  {
                    scope: "col",
                    className: cx(c.num && "num"),
                    "data-pin": c.pin ? "true" : void 0,
                    "data-pin-last": c.pin && i === lastPin ? "true" : void 0,
                    style: c.pin ? { insetInlineStart: pinLefts[i] } : void 0,
                    "aria-sort": dir ? dir === "asc" ? "ascending" : "descending" : void 0,
                    children: [
                      c.sortable && onSort ? /* @__PURE__ */ jsxs(
                        "button",
                        {
                          type: "button",
                          className: "lw-dgrid-sort",
                          onClick: () => emitSort(onSort, legacyArgs, c.key, dir === "asc" ? "desc" : "asc"),
                          children: [
                            colHeader("DataGrid", c),
                            /* @__PURE__ */ jsx(Icon, { name: dir === "asc" ? "sort-asc" : dir === "desc" ? "sort-desc" : "chevrons-up-down", size: 13 })
                          ]
                        }
                      ) : colHeader("DataGrid", c),
                      c.resizable !== false && /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          className: "lw-dgrid-resize",
                          "aria-label": "Resize " + (typeof colHeader("DataGrid", c) === "string" ? colHeader("DataGrid", c) : c.key),
                          onPointerDown: (e) => onResizeDown(i, e),
                          onKeyDown: (e) => onResizeKey(i, e)
                        }
                      )
                    ]
                  },
                  c.key
                );
              })
            ] }) }),
            /* @__PURE__ */ jsxs("tbody", { children: [
              padTop > 0 && /* @__PURE__ */ jsx("tr", { "aria-hidden": "true", className: "lw-dgrid-pad", style: { height: padTop }, children: /* @__PURE__ */ jsx("td", { colSpan: columns.length + (selectable ? 1 : 0) }) }),
              slice.map((r, n) => {
                const i = start + n;
                const k = rowKey(r, i);
                const on = selSet.has(k);
                return /* @__PURE__ */ jsxs(
                  "tr",
                  {
                    "aria-selected": on || void 0,
                    "aria-rowindex": i + 2,
                    "data-clickable": onRowClick ? "true" : void 0,
                    style: { height: rowHeight },
                    onClick: onRowClick ? () => onRowClick(r, i) : void 0,
                    children: [
                      selectable && /* @__PURE__ */ jsx("td", { "data-pin": "true", style: { insetInlineStart: 0 }, onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx("span", { className: "lw-dgrid-check", children: /* @__PURE__ */ jsxs("label", { className: "lw-check", children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: on,
                            onChange: () => toggleRow(k),
                            "aria-label": "Select row " + (i + 1)
                          }
                        ),
                        /* @__PURE__ */ jsx("span", { className: "box" })
                      ] }) }) }),
                      columns.map((c, ci) => /* @__PURE__ */ jsx(
                        "td",
                        {
                          className: cx(c.num && "num"),
                          "data-pin": c.pin ? "true" : void 0,
                          "data-pin-last": c.pin && ci === lastPin ? "true" : void 0,
                          style: c.pin ? { insetInlineStart: pinLefts[ci] } : void 0,
                          children: c.render ? c.render(r, i) : r[c.key]
                        },
                        c.key
                      ))
                    ]
                  },
                  k
                );
              }),
              padBottom > 0 && /* @__PURE__ */ jsx("tr", { "aria-hidden": "true", className: "lw-dgrid-pad", style: { height: padBottom }, children: /* @__PURE__ */ jsx("td", { colSpan: columns.length + (selectable ? 1 : 0) }) })
            ] })
          ] }),
          !rows.length && /* @__PURE__ */ jsx("div", { className: "lw-dgrid-empty", children: empty })
        ]
      }
    )
  ] });
}
export {
  DataGrid
};
