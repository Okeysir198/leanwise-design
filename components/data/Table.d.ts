import * as React from "react";
import type { SortDirection, SortState } from "./_columns";

/** The canonical sort payload, shared with `DataGrid`. One home: `_columns.d.ts`. */
export type { SortDirection, SortState };

export interface TableColumn {
  key: string;
  /** The header cell's content. Same word `DataGrid` uses, and the same word the
   *  DOM uses — `label` is the form-control sense everywhere else here. */
  header?: React.ReactNode;
  /**
   * @deprecated Renamed to `header` in v1.1.7 to match `DataGrid` and to stop
   * colliding with the form-control / accessible-name sense of `label` used
   * throughout this package. Still honoured; warns once per component.
   * Removed in v2.0.0.
   */
  label?: React.ReactNode;
  /** Mono, tabular-nums, right-aligned. Use for every numeric column. */
  num?: boolean;
  muted?: boolean;
  /** Renders the header as a sort button. Requires `onSort` on the Table. */
  sortable?: boolean;
  /**
   * @deprecated Sort state moved to the top-level `sort={{ key, dir }}` prop in
   * v1.1.7, which is what `DataGrid` takes. Still honoured when `sort` is absent.
   * Removed in v2.0.0.
   *
   * The short forms are what the implementation reads; the ARIA forms are
   * accepted and mapped straight through.
   */
  sort?: "asc" | "desc" | "ascending" | "descending";
}
export interface TableProps extends Omit<React.TableHTMLAttributes<HTMLTableElement>, "onSort"> {
  columns?: TableColumn[];
  rows?: Array<Record<string, React.ReactNode> & { id?: string | number }>;
  hover?: boolean;
  compact?: boolean;
  /** Visually hidden caption. A data table without one is unnavigable. */
  caption?: string;
  /** Which column is sorted, and which way. Takes precedence over the legacy
   *  per-column `sort`. */
  sort?: SortState;
  /**
   * Called with the column and the direction to move to. Without it a `sortable`
   * column renders as plain text — `aria-sort` on a th nothing can focus is a
   * promise the keyboard cannot keep.
   *
   * The object form is canonical and is what `DataGrid` takes. A handler
   * declared with TWO parameters is read as the deprecated positional form
   * `(key, direction)` and called that way; so is any Table still using
   * `columns[].label`. Both are removed in v2.0.0.
   */
  onSort?: ((sort: SortState) => void) | ((key: string, direction: SortDirection) => void);
}
export declare function Table(props: TableProps): React.JSX.Element;
