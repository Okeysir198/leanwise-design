import * as React from "react";
import type { SortDirection, SortState } from "./_columns";

/** The canonical sort payload, shared with `Table`. One home: `_columns.d.ts`. */
export type { SortDirection, SortState };

export interface DataGridColumn<R = any> {
  key: string;
  /** The header cell's content. Canonical across `Table` and `DataGrid`. */
  header?: React.ReactNode;
  /**
   * @deprecated `Table`'s pre-v1.1.7 spelling of `header`, accepted here so a
   * column definition moves between the two components unedited. Warns once per
   * component. Removed in v2.0.0.
   */
  label?: React.ReactNode;
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
export interface DataGridProps<R = any> extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSort"> {
  columns: DataGridColumn<R>[];
  rows: R[];
  rowKey?(row: R, index: number): string | number;
  sort?: SortState;
  /**
   * Called with the column and the direction to move to. The object form is
   * canonical and is shared with `Table`. A handler declared with TWO parameters
   * is read as `Table`'s deprecated positional form `(key, direction)` and called
   * that way; so is any grid still using `columns[].label`. Both are removed in
   * v2.0.0.
   */
  onSort?: ((sort: SortState) => void) | ((key: string, direction: SortDirection) => void);
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
  /* --- Display text. Every user-visible string this component renders is a
     prop, because a component library cannot hold display text (v1.3.1). --- */
  selectionActions?: React.ReactNode;
  label?: string;
  /** The word after the count in the selection bar. */
  selectedLabel?: React.ReactNode;
  clearSelectionLabel?: React.ReactNode;
  selectAllLabel?: string;
  clearAllSelectionLabel?: string;
  formatResizeLabel?(header: string): string;
  formatRowSelectLabel?(rowNumber: number): string;
}
/**
 * Sticky header, resizable and pinnable columns, bulk selection, optional
 * windowing. Deliberately not an extension of `Table` — reach for `Table` first;
 * a static list should not pay for grid machinery.
 */
export declare function DataGrid<R = any>(props: DataGridProps<R>): React.JSX.Element;
