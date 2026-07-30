import { deprecate } from "../_deprecate.js";

/**
 * The ONE column contract, shared by `Table` and `DataGrid` — internal.
 *
 * The two components shipped two APIs for one concept: `columns[].label` +
 * `onSort(key, dir)` on `Table`, `columns[].header` + `onSort({key, dir})` on
 * `DataGrid`. A consumer moving between them rewrote every column definition,
 * and nothing failed until runtime.
 *
 * `header` and `onSort({key, dir})` are canonical:
 *   - `label` is the form-control sense of the word everywhere else in this
 *     package (`Field`, `Segmented`, `Progress`, and `DataGrid`'s own `label`,
 *     which is the grid's ACCESSIBLE NAME). Two meanings, one word, one file.
 *     `header` is also what the DOM calls the cell.
 *   - an object argument extends without breaking. A second sort key, a
 *     shift-click flag or a column index can be added to `{key, dir}`; a
 *     positional `(key, dir)` cannot grow a third argument without every
 *     existing handler having to be re-read to know what it now receives.
 *
 * Both legacy shapes still work through v1.x and are removed in v2.0.0.
 */

/** The header cell content. `header` wins; `label` warns once and works. */
export function colHeader(component, c) {
  if (c.header !== undefined) return c.header;
  if (c.label !== undefined) {
    deprecate(component, "columns[].label",
      "`columns[].label` is deprecated — rename it to `columns[].header`. " +
      "`label` is removed in v2.0.0.");
    return c.label;
  }
  return undefined;
}

/**
 * Which way to invoke `onSort`.
 *
 * There is no way to satisfy a positional and an object handler with one call,
 * so the shape has to be inferred. Two signals, either of which means legacy:
 *
 *   1. The COLUMNS are on the legacy shape (some `label`, no `header`). The two
 *      renames are one migration, and this is what makes them atomic: rename the
 *      columns and the callback flips with them.
 *   2. `onSort.length >= 2` — a handler declared `(key, dir) => …`. The canonical
 *      handler takes one argument, so an arity of two is only ever the old form.
 *
 * The one misfire is a canonical handler written with a meaningless second
 * parameter. It is named in the warning so it is greppable.
 */
export function legacySortArgs(component, columns, onSort) {
  if (!onSort) return false;
  const legacyCols = columns.some((c) => c.header === undefined && c.label !== undefined);
  const legacyArity = onSort.length >= 2;
  if (!legacyCols && !legacyArity) return false;
  deprecate(component, "onSort",
    "`onSort(key, direction)` is deprecated — take one argument, `onSort({ key, dir })`. " +
    "The positional form is removed in v2.0.0. " +
    "(Detected from " + (legacyCols ? "`columns[].label`" : "the handler's two parameters") + ".)");
  return true;
}

/** Call `onSort` in whichever shape this consumer is on. */
export function emitSort(onSort, legacy, key, dir) {
  if (!onSort) return;
  if (legacy) onSort(key, dir);
  else onSort({ key, dir });
}
