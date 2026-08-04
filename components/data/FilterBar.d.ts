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
  /* --- Display text. Every user-visible string this component renders is a
     prop, because a component library cannot hold display text (v1.3.1). --- */
  onClear?(): void;
  /** The `role="group"` accessible name. */
  label?: string;
  clearAllLabel?: React.ReactNode;
  formatRemoveLabel?(filterName: string): string;
}
/** Applied filters as removable chips. Renders nothing when there are none. */
export declare function FilterBar(props: FilterBarProps): React.JSX.Element;
export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {}
/** The row above a list: search, filters, actions. `.lw-toolbar-grow` on the
 *  child that should take the slack. */
export declare function Toolbar(props: ToolbarProps): React.JSX.Element;
