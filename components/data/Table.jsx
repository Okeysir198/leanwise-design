"use client";
import { Icon } from "../primitives/Icon.jsx";
import { colHeader, legacySortArgs, emitSort } from "./_columns.js";

const cx = (...a) => a.filter(Boolean).join(" ");


/**
 * Hairline rows, mono tabular numerics, a sticky head. Pass `columns` +
 * `rows` for the common case; children for anything else.
 *
 * A column with `num: true` gets tabular-nums and right alignment — which is
 * the whole reason a table reads as data rather than as text.
 *
 * Sorting: give a column `sortable` and pass `onSort({ key, dir })`. The header
 * then renders as a real button with a direction caret, because `aria-sort` on a
 * th nothing can focus is a promise the keyboard cannot keep.
 *
 * The column contract is `DataGrid`'s, so the two are interchangeable:
 * `columns[].header`, a top-level `sort={{ key, dir }}`, and an object argument
 * to `onSort`. `columns[].label`, `columns[].sort` and `onSort(key, dir)` are the
 * pre-v1.1.7 spellings — still honoured, warned once each, removed in v2.0.0.
 * See `_columns.js` for why the convergence went this way.
 */
export function Table({ columns, rows, hover = true, compact = false, caption, sort: sortState, onSort, className, children, ...rest }) {
  const legacyArgs = legacySortArgs("Table", columns || [], onSort);
  const head = columns && (
    <thead><tr>{columns.map(c => {
      const sortable = (c.sortable || c.sort) && onSort;
      /* Top-level `sort` is canonical (it is what DataGrid takes); the
         per-column `c.sort` is the legacy home for the same state. */
      let sort;
      if (sortState && sortState.key === c.key) {
        sort = sortState.dir === "desc" ? "descending" : "ascending";
      } else if (sortState) {
        sort = undefined;
      } else {
        sort = c.sort === "asc" ? "ascending" : c.sort === "desc" ? "descending" : c.sort;
      }
      return (
        <th key={c.key} className={c.num ? "num" : undefined} scope="col"
          aria-sort={sortable ? (sort || "none") : sort || undefined}>
          {sortable ? (
            <button type="button" onClick={() => emitSort(onSort, legacyArgs, c.key, sort === "ascending" ? "desc" : "asc")}>
              {colHeader("Table", c)}
              <Icon name={sort === "descending" ? "chevron-down" : "chevron-up"} size={12} />
            </button>
          ) : colHeader("Table", c)}
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
