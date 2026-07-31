import { deprecate } from "../_deprecate.js";
function colHeader(component, c) {
  if (c.header !== void 0) return c.header;
  if (c.label !== void 0) {
    deprecate(
      component,
      "columns[].label",
      "`columns[].label` is deprecated \u2014 rename it to `columns[].header`. `label` is removed in v2.0.0."
    );
    return c.label;
  }
  return void 0;
}
function legacySortArgs(component, columns, onSort) {
  if (!onSort) return false;
  const legacyCols = columns.some((c) => c.header === void 0 && c.label !== void 0);
  const legacyArity = onSort.length >= 2;
  if (!legacyCols && !legacyArity) return false;
  deprecate(
    component,
    "onSort",
    "`onSort(key, direction)` is deprecated \u2014 take one argument, `onSort({ key, dir })`. The positional form is removed in v2.0.0. (Detected from " + (legacyCols ? "`columns[].label`" : "the handler's two parameters") + ".)"
  );
  return true;
}
function emitSort(onSort, legacy, key, dir) {
  if (!onSort) return;
  if (legacy) onSort(key, dir);
  else onSort({ key, dir });
}
export {
  colHeader,
  emitSort,
  legacySortArgs
};
