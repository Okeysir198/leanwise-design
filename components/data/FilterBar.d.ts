import * as React from "react";

export interface AppliedFilter {
  id?: string | number;
  /** The facet name, rendered in mono — "status", "owner". */
  key?: string;
  value: string | number;
  /** Display text when it differs from `value`. */
  label?: React.ReactNode;
}
export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  filters?: AppliedFilter[];
  onRemove?(filter: AppliedFilter): void;
  /** Clear-all appears from two filters up — with one, removing it IS clear all. */
  onClear?(): void;
}
/** Applied filters as removable chips. Renders nothing when there are none. */
export declare function FilterBar(props: FilterBarProps): JSX.Element;
export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {}
/** The row above a list: search, filters, actions. `.lw-toolbar-grow` on the
 *  child that should take the slack. */
export declare function Toolbar(props: ToolbarProps): JSX.Element;
