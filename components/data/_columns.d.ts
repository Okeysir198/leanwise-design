/** The ONE column/sort contract shared by `Table` and `DataGrid`. See
 *  `_columns.js` for why the two APIs converged on `header` + `{ key, dir }`. */
export type SortDirection = "asc" | "desc";
export interface SortState {
  key: string;
  dir: SortDirection;
}
