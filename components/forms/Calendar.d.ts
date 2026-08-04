import * as React from "react";

export interface DateRange { start?: Date | null; end?: Date | null }
export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** A `Date` normally; a `DateRange` when `range`. */
  value?: Date | DateRange | null;
  onChange?(value: Date | DateRange): void;
  range?: boolean;
  /** Controlled visible month. Omit to let the calendar own it. */
  month?: Date;
  onMonthChange?(month: Date): void;
  min?: Date;
  max?: Date;
  /** 0 = Sunday, 1 = Monday (default). */
  weekStart?: 0 | 1;
  /** BCP-47 tag for Intl. Omit to follow the browser. */
  /* --- Display text. Every user-visible string this component renders is a
     prop, because a component library cannot hold display text (v1.3.1). --- */
  locale?: string;
  prevMonthLabel?: string;
  nextMonthLabel?: string;
}
/**
 * The date grid — real buttons with a roving tabindex, so Tab enters and leaves
 * once instead of walking 42 days. Month and weekday names come from Intl.
 */
export declare function Calendar(props: CalendarProps): React.JSX.Element;
