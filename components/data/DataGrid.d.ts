import * as React from "react";

export interface DataGridColumn<R = any> {
  key: string;
  header: React.ReactNode;
  /** Starting width in px. The user can drag it; `minWidth` floors that. */
  width?: number;
  minWidth?: number;
  /** Mono, tabular, right-aligned — the same contract as `Table`'s `num`. */
  num?: boolean;
  /** Sticks to the left edge. Pinned columns stack in declaration order. */
  pin?: boolean;
  sortable?: boolean;
  /** Set false to remove the drag handle from this column. */
  resizable?: boolean;
  render?(row: R, index: number): React.ReactNode;
}
export interface DataGridProps<R = any> extends React.HTMLAttributes<HTMLDivElement> {
  columns: DataGridColumn<R>[];
  rows: R[];
  rowKey?(row: R, index: number): string | number;
  sort?: { key: string; dir: "asc" | "desc" };
  onSort?(sort: { key: string; dir: "asc" | "desc" }): void;
  selectable?: boolean;
  selected?: (string | number)[];
  onSelectionChange?(keys: (string | number)[]): void;
  /** Scroll-box height in px. */
  height?: number;
  /** Must match the rendered row height for windowing to line up. */
  rowHeight?: number;
  /** Window the rows. Only kicks in when the content is taller than the box. */
  virtualize?: boolean;
  overscan?: number;
  onRowClick?(row: R, index: number): void;
  empty?: React.ReactNode;
  /** Controls for the selection bar, which REPLACES the toolbar rather than
   *  stacking under it — two rows where one was jumps the table on every click. */
  selectionActions?: React.ReactNode;
  label?: string;
}
/**
 * Sticky header, resizable and pinnable columns, bulk selection, optional
 * windowing. Deliberately not an extension of `Table` — reach for `Table` first;
 * a static list should not pay for grid machinery.
 */
export declare function DataGrid<R = any>(props: DataGridProps<R>): JSX.Element;
