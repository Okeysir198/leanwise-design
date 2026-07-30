import * as React from "react";

export interface TableColumn {
  key: string;
  label: React.ReactNode;
  /** Mono, tabular-nums, right-aligned. Use for every numeric column. */
  num?: boolean;
  muted?: boolean;
  /** Renders the header as a sort button. Requires `onSort` on the Table. */
  sortable?: boolean;
  /** The short forms are what the implementation reads; the ARIA forms are
   *  accepted and mapped straight through. */
  sort?: "asc" | "desc" | "ascending" | "descending";
}
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  columns?: TableColumn[];
  rows?: Array<Record<string, React.ReactNode> & { id?: string | number }>;
  hover?: boolean;
  compact?: boolean;
  /** Visually hidden caption. A data table without one is unnavigable. */
  caption?: string;
  /** Called with the column key and the direction to move to. Without it a
   *  `sortable` column renders as plain text — `aria-sort` on a th nothing can
   *  focus is a promise the keyboard cannot keep. */
  onSort?: (key: string, direction: "asc" | "desc") => void;
}
export declare function Table(props: TableProps): JSX.Element;