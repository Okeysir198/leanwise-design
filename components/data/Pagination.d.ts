import * as React from "react";

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  page?: number;
  pageSize?: number;
  /** Total ROWS, not pages. Omit only in `cursor` mode. */
  total?: number;
  onPageChange?(page: number): void;
  /** Omit to hide the rows-per-page control. */
  onPageSizeChange?(size: number): void;
  pageSizes?: number[];
  /**
   * Cursor mode: prev/next only, no page numbers and no total — for an API that
   * cannot count. Inventing either number would be a lie.
   */
  cursor?: boolean;
  /* --- Display text. Every user-visible string this component renders is a
     prop, because a component library cannot hold display text (v1.3.1). --- */
  hasNext?: boolean;
  hasPrev?: boolean;
  label?: string;
  prevLabel?: string;
  nextLabel?: string;
  pageSizeLabel?: string;
  /**
   * The result count — "1–25 of 1,284". `format` is the component's own
   * `Intl.NumberFormat`, passed in so a consumer reformats the words without
   * having to re-derive the number formatting.
   */
  formatCount?(from: number, to: number, total: number, format: (n: number) => string): React.ReactNode;
  /** Cursor mode has no total, so it states the page instead. */
  formatCursor?(page: number): React.ReactNode;
  formatPageLabel?(page: number): string;
  formatPageSize?(size: number): React.ReactNode;
}
/** Page navigation AND the result count — the count is the control's feedback. */
export declare function Pagination(props: PaginationProps): React.JSX.Element;
