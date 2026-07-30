import * as React from "react";

export interface TableColumn {
  key: string;
  label: React.ReactNode;
  /** Mono, tabular-nums, right-aligned. Use for every numeric column. */
  num?: boolean;
  muted?: boolean;
  sort?: "ascending" | "descending";
}
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  columns?: TableColumn[];
  rows?: Array<Record<string, React.ReactNode> & { id?: string | number }>;
  hover?: boolean;
  compact?: boolean;
  /** Visually hidden caption. A data table without one is unnavigable. */
  caption?: string;
}
export declare function Table(props: TableProps): JSX.Element;