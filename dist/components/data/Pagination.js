"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function pages(page, count) {
  const out = [];
  const push = (p) => {
    if (out[out.length - 1] !== p) out.push(p);
  };
  for (let p = 1; p <= count; p++) {
    if (p === 1 || p === count || Math.abs(p - page) <= 1) push(p);
    else if (out[out.length - 1] !== "gap") out.push("gap");
  }
  return out;
}
function Pagination({
  page = 1,
  pageSize = 25,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizes = [25, 50, 100],
  cursor,
  hasNext,
  hasPrev,
  label = "Pagination",
  prevLabel = "Previous page",
  nextLabel = "Next page",
  pageSizeLabel = "Rows per page",
  formatCount = (f, t, all, fmt) => fmt(f) + "\u2013" + fmt(t) + " of " + fmt(all),
  formatCursor = (p) => "Page " + p,
  formatPageLabel = (p) => "Page " + p,
  formatPageSize = (s) => s + " / page",
  className,
  ...rest
}) {
  const count = total != null ? Math.max(1, Math.ceil(total / pageSize)) : 1;
  const from = total ? (page - 1) * pageSize + 1 : 0;
  const to = total ? Math.min(page * pageSize, total) : 0;
  const nf = new Intl.NumberFormat();
  const go = (p) => onPageChange && onPageChange(Math.min(Math.max(1, p), count));
  return /* @__PURE__ */ jsxs("nav", { className: cx("lw-pagination", className), "aria-label": label, ...rest, children: [
    /* @__PURE__ */ jsx("span", { className: "lw-pag-info", children: cursor ? formatCursor(page) : total ? formatCount(from, to, total, (v) => nf.format(v)) : "" }),
    /* @__PURE__ */ jsx("span", { className: "lw-spacer" }),
    onPageSizeChange && !cursor && /* @__PURE__ */ jsx(
      "select",
      {
        className: "lw-input lw-input-sm lw-pag-size",
        "aria-label": pageSizeLabel,
        value: pageSize,
        onChange: (e) => onPageSizeChange(Number(e.target.value)),
        children: pageSizes.map((s) => /* @__PURE__ */ jsx("option", { value: s, children: formatPageSize(s) }, s))
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "lw-pag-btn",
        "aria-label": prevLabel,
        disabled: cursor ? !hasPrev : page <= 1,
        onClick: () => go(page - 1),
        children: /* @__PURE__ */ jsx(Icon, { name: "chevron-left", size: 15 })
      }
    ),
    !cursor && pages(page, count).map(
      (p, i) => p === "gap" ? /* @__PURE__ */ jsx("span", { className: "lw-pag-gap", "aria-hidden": "true", children: "\u2026" }, "g" + i) : /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "lw-pag-btn",
          "aria-label": formatPageLabel(p),
          "aria-current": p === page ? "page" : void 0,
          onClick: () => go(p),
          children: p
        },
        p
      )
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "lw-pag-btn",
        "aria-label": nextLabel,
        disabled: cursor ? !hasNext : page >= count,
        onClick: () => go(page + 1),
        children: /* @__PURE__ */ jsx(Icon, { name: "chevron-right", size: 15 })
      }
    )
  ] });
}
export {
  Pagination
};
