/**
 * The ONE column contract, shared by `Table` and `DataGrid` — internal.
 *
 * The two components once shipped two APIs for one concept: `columns[].label` +
 * `onSort(key, dir)` on `Table`, `columns[].header` + `onSort({key, dir})` on
 * `DataGrid`. A consumer moving between them rewrote every column definition,
 * and nothing failed until runtime.
 *
 * `header` and `onSort({key, dir})` are canonical, and since v3.0.0 they are the
 * only shapes — the `label` / positional-`onSort` compatibility layer announced
 * for removal in v2.0.0 is gone:
 *   - `label` is the form-control sense of the word everywhere else in this
 *     package (`Field`, `Segmented`, `Progress`, and `DataGrid`'s own `label`,
 *     which is the grid's ACCESSIBLE NAME). Two meanings, one word, one file.
 *     `header` is also what the DOM calls the cell.
 *   - an object argument extends without breaking. A second sort key, a
 *     shift-click flag or a column index can be added to `{key, dir}`; a
 *     positional `(key, dir)` cannot grow a third argument without every
 *     existing handler having to be re-read to know what it now receives.
 */

/** The header cell content. */
export function colHeader(component, c) {
  return c.header;
}

/** Call `onSort` with the one canonical argument shape. */
export function emitSort(onSort, key, dir) {
  if (!onSort) return;
  onSort({ key, dir });
}
