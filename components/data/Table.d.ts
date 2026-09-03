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
/**
 * Everything a Table takes except the `collapse` group, which is a discriminated
 * union and so cannot be `extends`-ed. Declared separately so a consumer that
 * needs to widen the props still has an interface to extend.
 */
export interface TableBaseProps extends Omit<React.TableHTMLAttributes<HTMLTableElement>, "onSort"> {
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

/**
 * `collapse="cards"` — the phone form of a wide table.
 *
 * Below `--lw-bp-md` (768px) of the WRAPPER's width, every row paints as a card:
 * the first cell titles it, the next two are its meta line, and everything past
 * the third sits behind a native `<details>`. A container query, not a media
 * query — the thing that is too narrow is the table's track, not the screen, and
 * the same table is fine at 768px of page inside a 300px rail and unreadable at
 * 1280px of page inside a 318px one.
 *
 * **The DOM does not change.** One real `<table>` at every width, re-laid-out by
 * CSS. Nothing is measured, nothing re-renders at a breakpoint, and the server
 * and the client cannot disagree about which form to emit. Three consequences,
 * and they are the whole design:
 *
 * 1. `display: block` on a table element drops the table's IMPLICIT semantics in
 *    every engine, so `Table` emits explicit `role="table" / "rowgroup" / "row" /
 *    "columnheader" / "cell"` whenever `collapse` is set — and only then, so a
 *    table that does not collapse keeps the markup it has always had.
 * 2. The header row is `display: none` while collapsed, and each detail cell
 *    carries its column name in `data-label`, printed by a `::before`. The
 *    alternative — a visually-hidden thead — leaves the header in the
 *    accessibility tree AND in the prefix, so every detail cell announces its
 *    column twice.
 * 3. The `<details>` holds the CONTROL, not the cells. A `<details>` wrapping
 *    `<td>`s is not expressible: the HTML parser foster-parents any non-cell
 *    child of a `<tr>` out of the table, so a server-rendered page would ship
 *    broken markup and hydrate into a mismatch. The summary rides in the title
 *    cell and the detail cells are revealed by `tr:has(.lw-row-more[open])`.
 *    They follow the summary in DOM order, but they are its siblings rather than
 *    its subtree — the one honest cost of keeping a single DOM.
 *
 * Where `@container` is unsupported the entire block is dropped: the table
 * scrolls sideways as it always did, header row and sort buttons intact.
 *
 * @since 2.1.0
 */
export type TableCollapseProps =
  | {
      collapse?: undefined;
      detailsLabel?: never;
      sortLabel?: never;
    }
  | {
      collapse: "cards";
      /**
       * The disclosure's label — "Chi tiết", "Details", "Detalles". REQUIRED,
       * because this package holds no display text: every string a reader sees
       * belongs to the consumer, in the consumer's language. A missing one warns
       * once in development and leaves the disclosure unnamed.
       */
      detailsLabel: string;
      /**
       * The sort menu's trigger label — "Sắp xếp", "Sort". Collapsing hides the
       * header row and with it every sort button, so the sortable columns are
       * re-offered through `Menu`; without this label there is no menu and a
       * collapsed table cannot be sorted at all (warned once in development).
       * Optional because a table with no `sortable` column needs no such string.
       *
       * ⚠ `Menu` renders on `.lw-popover` / `.lw-menu`, which live in
       * **product.css**. A page that loads only base + marketing gets a correct
       * trigger and an unstyled panel.
       */
      sortLabel?: string;
    };

export type TableProps = TableBaseProps & TableCollapseProps;

export declare function Table(props: TableProps): React.JSX.Element;
