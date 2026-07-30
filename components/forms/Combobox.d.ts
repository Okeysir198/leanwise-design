import * as React from "react";

export interface ComboboxOption {
  value: string | number;
  label: React.ReactNode;
  /** Right-aligned mono detail — a count, a type, a key. */
  meta?: React.ReactNode;
  disabled?: boolean;
}
export interface ComboboxProps {
  /** Strings are accepted and normalised to `{ value, label }`. */
  options: (ComboboxOption | string | number)[];
  /** A single value, or an array when `multiple`. */
  value?: string | number | (string | number)[];
  onChange?(value: any): void;
  multiple?: boolean;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  disabled?: boolean;
  /** Show the searching state. Pair with `onSearch`. */
  loading?: boolean;
  emptyText?: string;
  /**
   * Async search. When present the component does NOT filter locally — the
   * options you pass ARE the result, and filtering them again would hide rows the
   * server deliberately returned.
   */
  onSearch?(query: string): void;
  id?: string;
  /** Accessible name. Omit when a `Field` labels it. */
  label?: string;
  className?: string;
}
/**
 * Single- and multi-select combobox on `Popover`. Focus stays in the input and
 * the active option is named by `aria-activedescendant` — the ARIA 1.2 pattern,
 * because moving real focus into the list takes it out of the field the user is
 * still typing in.
 */
export declare function Combobox(props: ComboboxProps): JSX.Element;
