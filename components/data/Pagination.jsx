import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

/* First, last, the current page and one neighbour either side — with gaps for
   everything else. A strip that renders every page is unusable at 200 pages and
   a strip that renders only prev/next hides where you are. */
function pages(page, count) {
  const out = [];
  const push = (p) => { if (out[out.length - 1] !== p) out.push(p); };
  for (let p = 1; p <= count; p++) {
    if (p === 1 || p === count || Math.abs(p - page) <= 1) push(p);
    else if (out[out.length - 1] !== "gap") out.push("gap");
  }
  return out;
}

/**
 * Page navigation and the result count — one component, because the count is
 * what tells a user whether their filter did anything, and a strip of numbers
 * without it is a control with no feedback.
 *
 * `total` + `pageSize` drives the numbered mode. Pass `cursor` instead for an
 * API that cannot count: prev/next only, no page numbers, no total, because
 * inventing either would be a lie.
 */
export function Pagination({
  page = 1, pageSize = 25, total, onPageChange, onPageSizeChange,
  pageSizes = [25, 50, 100], cursor, hasNext, hasPrev, label = "Pagination", className, ...rest
}) {
  const count = total != null ? Math.max(1, Math.ceil(total / pageSize)) : 1;
  const from = total ? (page - 1) * pageSize + 1 : 0;
  const to = total ? Math.min(page * pageSize, total) : 0;
  const nf = new Intl.NumberFormat();
  const go = (p) => onPageChange && onPageChange(Math.min(Math.max(1, p), count));

  return (
    <nav className={cx("lw-pagination", className)} aria-label={label} {...rest}>
      <span className="lw-pag-info">
        {cursor ? "Page " + page : total ? nf.format(from) + "–" + nf.format(to) + " of " + nf.format(total) : ""}
      </span>
      <span className="lw-spacer" />
      {onPageSizeChange && !cursor && (
        <select className="lw-input lw-input-sm lw-pag-size" aria-label="Rows per page"
          value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
          {pageSizes.map(s => <option key={s} value={s}>{s} / page</option>)}
        </select>
      )}
      <button type="button" className="lw-pag-btn" aria-label="Previous page"
        disabled={cursor ? !hasPrev : page <= 1} onClick={() => go(page - 1)}>
        <Icon name="chevron-left" size={15} />
      </button>
      {!cursor && pages(page, count).map((p, i) => p === "gap"
        ? <span key={"g" + i} className="lw-pag-gap" aria-hidden="true">…</span>
        : <button key={p} type="button" className="lw-pag-btn" aria-label={"Page " + p}
            aria-current={p === page ? "page" : undefined} onClick={() => go(p)}>{p}</button>
      )}
      <button type="button" className="lw-pag-btn" aria-label="Next page"
        disabled={cursor ? !hasNext : page >= count} onClick={() => go(page + 1)}>
        <Icon name="chevron-right" size={15} />
      </button>
    </nav>
  );
}
