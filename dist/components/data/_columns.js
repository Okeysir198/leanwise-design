function colHeader(component, c) {
  return c.header;
}
function emitSort(onSort, key, dir) {
  if (!onSort) return;
  onSort({ key, dir });
}
export {
  colHeader,
  emitSort
};
