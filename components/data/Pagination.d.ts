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
  hasNext?: boolean;
  hasPrev?: boolean;
  label?: string;
}
/** Page navigation AND the result count — the count is the control's feedback. */
export declare function Pagination(props: PaginationProps): React.JSX.Element;
