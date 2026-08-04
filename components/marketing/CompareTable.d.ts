import * as React from "react";

export interface CompareColumn {
  key: string;
  label: React.ReactNode;
  /**
   * Tints the column with `--lw-bg-subtle` and edges it with
   * `--lw-brand-line`. Deliberately not `--lw-brand-soft`: `--lw-fg` on
   * `--lw-brand-soft` is a pair nothing composes today, so it would enter the
   * derived contrast manifest as a new measurement in three scopes for a
   * decorative tint.
   */
  featured?: boolean;
}

export interface CompareRow {
  label: React.ReactNode;
  /**
   * One entry per column, in `columns` order. `true` renders the `check`
   * glyph, `false`/`null`/missing the `minus` glyph, anything else renders as
   * given.
   */
  values: (boolean | string | null | undefined)[];
}

export interface CompareGroup {
  /** A section-label row spanning every column. Omit for an ungrouped block. */
  label?: React.ReactNode;
  rows: CompareRow[];
}

export interface CompareTableProps extends Omit<React.TableHTMLAttributes<HTMLTableElement>, "children"> {
  columns?: CompareColumn[];
  groups?: CompareGroup[];
  caption?: React.ReactNode;
  /** `.lw-sr-only` word paired with the `check` glyph. Default `"Included"`. */
  yesLabel?: string;
  /** `.lw-sr-only` word paired with the `minus` glyph. Default `"Not included"`. */
  noLabel?: string;
}

/**
 * A feature matrix. Distinct from `Table` by MEANING: `Table` is a data table
 * (records, values, sorting, pagination); this never sorts and has one repeated
 * cell type.
 *
 * Wraps itself in `.lw-compare-scroll`, so the matrix scrolls inline while the
 * page never does. Headers are sticky on both axes via `--lw-z-local-1/2/3`.
 */
export declare function CompareTable(props: CompareTableProps): React.JSX.Element;
