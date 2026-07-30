import { Icon } from "../primitives/Icon.jsx";

const cx = (...a) => a.filter(Boolean).join(" ");


/**
 * Hairline rows, mono tabular numerics, a sticky head. Pass `columns` +
 * `rows` for the common case; children for anything else.
 *
 * A column with `num: true` gets tabular-nums and right alignment — which is
 * the whole reason a table reads as data rather than as text.
 *
 * Sorting: give a column `sortable` and pass `onSort(key, nextDirection)`. The
 * header then renders as a real button with a direction caret, because
 * `aria-sort` on a th nothing can focus is a promise the keyboard cannot keep.
 */
export function Table({ columns, rows, hover = true, compact = false, caption, onSort, className, children, ...rest }) {
  const head = columns && (
    <thead><tr>{columns.map(c => {
      const sortable = (c.sortable || c.sort) && onSort;
      const sort = c.sort === "asc" ? "ascending" : c.sort === "desc" ? "descending" : c.sort;
      return (
        <th key={c.key} className={c.num ? "num" : undefined} scope="col"
          aria-sort={sortable ? (sort || "none") : sort || undefined}>
          {sortable ? (
            <button type="button" onClick={() => onSort(c.key, sort === "ascending" ? "desc" : "asc")}>
              {c.label}
              <Icon name={sort === "descending" ? "chevron-down" : "chevron-up"} size={12} />
            </button>
          ) : c.label}
        </th>
      );
    })}</tr></thead>
  );
  return (
    <div className="lw-table-wrap lw-scroll">
      <table className={cx("lw-table", hover && "lw-table-hover", compact && "lw-table-compact", className)} {...rest}>
        {caption && <caption className="lw-sr-only">{caption}</caption>}
        {head}
        {rows ? (
          <tbody>{rows.map((r, i) => (
            <tr key={r.id ?? i}>{columns.map(c => (
              <td key={c.key} className={cx(c.num && "num", c.muted && "muted")}>{r[c.key]}</td>
            ))}</tr>
          ))}</tbody>
        ) : children}
      </table>
    </div>
  );
}
