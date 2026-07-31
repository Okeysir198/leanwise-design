import * as React from "react";
import type { DateRange } from "./Calendar";

export interface RangePreset { label: string; get(): DateRange }
/** Today · Last 7 · Last 30 · Last 90. Override with your own `presets`. */
export declare const RANGE_PRESETS: RangePreset[];

export interface DatePickerProps {
  value?: Date | DateRange | null;
  onChange?(value: Date | DateRange): void;
  /** Range mode: two dates, and the preset rail down the left. */
  range?: boolean;
  presets?: RangePreset[];
  min?: Date;
  max?: Date;
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  disabled?: boolean;
  placeholder?: string;
  locale?: string;
  label?: string;
  id?: string;
  className?: string;
}
/** The date field, on `Popover`. `range` adds the preset rail. */
/** forwardRef since v1.2 — the ref reaches the trigger button, so react-hook-form's
 *  register(), a Controller's field.ref and .focus()-on-error all work. */
export declare const DatePicker: React.ForwardRefExoticComponent<
  DatePickerProps & React.RefAttributes<HTMLButtonElement>
>;
