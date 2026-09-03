"use client";
import { Icon } from "../primitives/Icon.jsx";
import { Menu } from "../overlays/Menu.jsx";
import { useOverflow } from "../_overflow.js";
import { colHeader, legacySortArgs, emitSort } from "./_columns.js";
import { warnOnce } from "../_deprecate.js";

const cx = (...a) => a.filter(Boolean).join(" ");

/* `data-label` is an ATTRIBUTE, so only a string can travel in it. A header
   that is an element (an icon, a tooltip trigger) leaves the attribute off and
   the collapsed cell prints its value with no prefix — which is correct, and
   the alternative (stringifying a React node) would print "[object Object]". */
const labelText = (h) => (typeof h === "string" ? h : typeof h === "number" ? String(h) : undefined);

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
 * `collapse="cards"` turns each row into a card below `--lw-bp-md` of CONTAINER
 * width — see base.css and Table.d.ts. The DOM is one `<table>` at every width;
 * only the CSS changes. Because `display: block` on a table element drops the
 * implicit table semantics, the explicit roles are emitted whenever `collapse`
 * is set, and only then: a table that does not collapse keeps the markup it
 * always had, byte for byte.
 *
 * The column contract is `DataGrid`'s, so the two are interchangeable:
 * `columns[].header`, a top-level `sort={{ key, dir }}`, and an object argument
 * to `onSort`. `columns[].label`, `columns[].sort` and `onSort(key, dir)` are the
 * pre-v1.1.7 spellings — still honoured, warned once each, removed in v2.0.0.
 * See `_columns.js` for why the convergence went this way.
 */
export function Table({
  columns, rows, hover = true, compact = false, caption, sort: sortState, onSort,
  collapse, detailsLabel, sortLabel,
  className, children, ...rest
}) {
  const legacyArgs = legacySortArgs("Table", columns || [], onSort);
  const cards = collapse === "cards";
  const wrapRef = useOverflow();

  /* Display text has no home in this package — every string a reader sees is
     the consumer's, in the consumer's language. The types make `detailsLabel`
     required alongside `collapse`, which covers the call sites TypeScript can
     see; these two cover the ones it cannot (a .jsx consumer, a spread props
     object) and say what the reader would otherwise silently lose. */
  if (cards && !detailsLabel) {
    warnOnce("Table", "detailsLabel",
      '`collapse="cards"` needs `detailsLabel` — the collapsed row\'s disclosure ' +
      "is rendered with no accessible name, so the columns behind it cannot be reached.");
  }

  /** The sort state a header cell should advertise. One reading, two callers. */
  const sortOf = (c) => {
    if (sortState && sortState.key === c.key) return sortState.dir === "desc" ? "descending" : "ascending";
    if (sortState) return undefined;
    return c.sort === "asc" ? "ascending" : c.sort === "desc" ? "descending" : c.sort;
  };
  const isSortable = (c) => Boolean((c.sortable || c.sort) && onSort);

  const head = columns && (
    <thead role={cards ? "rowgroup" : undefined}><tr role={cards ? "row" : undefined}>{columns.map(c => {
      const sortable = isSortable(c);
      /* Top-level `sort` is canonical (it is what DataGrid takes); the
         per-column `c.sort` is the legacy home for the same state. */
      const sort = sortOf(c);
      return (
        <th key={c.key} className={c.num ? "num" : undefined} scope="col" role={cards ? "columnheader" : undefined}
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

  /* The collapsed view hides the header row, and with it every sort button. A
     table whose only sort affordance is a row nobody can see is not sortable,
     so the columns are re-offered through the Menu — the component that already
     owns roving focus, typeahead and Esc in this package.
     ⚠ `Menu` renders on `.lw-popover` / `.lw-menu`, which live in product.css.
     A marketing page (base + marketing) gets a correct trigger and an unstyled
     panel; that is stated in Table.d.ts rather than fixed by duplicating the
     surface into base.css. */
  const sortableCols = cards && onSort && columns ? columns.filter(isSortable) : [];
  if (sortableCols.length > 0 && !sortLabel) {
    warnOnce("Table", "sortLabel",
      '`collapse="cards"` hides the header row, so a sortable column needs `sortLabel` ' +
      "to reach the sort menu. Without it the collapsed table cannot be sorted at all.");
  }
  const sortBar = sortableCols.length > 0 && sortLabel ? (
    <div className="lw-table-sort">
      <Menu
        label={sortLabel}
        placement="bottom-end"
        items={sortableCols.map(c => ({
          value: c.key,
          label: colHeader("Table", c),
          /* `checked` makes the row a menuitemcheckbox, so the column in force
             is announced as such instead of being a caret a screen reader
             never reaches. Choosing the active column flips its direction —
             the same gesture the header button performs. */
          checked: sortOf(c) !== undefined,
          icon: sortOf(c) === "descending" ? "chevron-down" : sortOf(c) === "ascending" ? "chevron-up" : undefined,
        }))}
        onSelect={(key) => {
          const c = sortableCols.find(x => x.key === key);
          emitSort(onSort, legacyArgs, key, sortOf(c) === "ascending" ? "desc" : "asc");
        }}
        trigger={
          <button type="button" className="lw-btn lw-btn-ghost lw-btn-sm">
            {sortLabel}
            <Icon name="chevron-down" size={14} />
          </button>
        }
      />
    </div>
  ) : null;

  /* First cell titles the card, the next two are its meta line, the rest go
     behind the disclosure. Three is not arbitrary: a card that has to be read
     at a glance can carry one strong line and one weak one, and everything
     past that is detail by definition. */
  const partOf = (i) => (i === 0 ? "title" : i <= 2 ? "meta" : "detail");
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
    <div
      ref={wrapRef}
      className="lw-table-wrap lw-scroll"
      data-collapse={cards ? "cards" : undefined}
      tabIndex={0}
      role="region"
      aria-label={typeof caption === "string" ? caption : undefined}
    >
      {sortBar}
      <table
        className={cx("lw-table", hover && "lw-table-hover", compact && "lw-table-compact", cards && "lw-table-collapse", className)}
        role={cards ? "table" : undefined}
        {...rest}
      >
        {caption && <caption className="lw-sr-only">{caption}</caption>}
        {head}
        {rows ? (
          <tbody role={cards ? "rowgroup" : undefined}>{rows.map((r, i) => (
            <tr key={r.id ?? i} role={cards ? "row" : undefined}>{columns.map((c, ci) => {
              const part = cards ? partOf(ci) : undefined;
              return (
                <td key={c.key} role={cards ? "cell" : undefined}
                  data-part={part}
                  data-label={part === "detail" ? labelText(colHeader("Table", c)) : undefined}
                  className={cx(c.num && "num", c.muted && "muted")}>
                  {r[c.key]}
                  {/* The disclosure rides in the TITLE cell rather than in a
                      column of its own: an extra column means an extra header
                      cell, which is either unnamed (an axe finding) or a named
                      empty column the wide table has to carry all day. */}
                  {part === "title" && hasDetails && (
                    <details className="lw-row-more">
                      <summary>
                        {detailsLabel}
                        <Icon name="chevron-down" size={12} />
                      </summary>
                    </details>
                  )}
                </td>
              );
            })}</tr>
          ))}</tbody>
        ) : children}
      </table>
    </div>
  );
}
