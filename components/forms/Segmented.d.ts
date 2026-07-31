import * as React from "react";

export interface SegmentedProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options?: Array<string | { value: string; label: React.ReactNode }>;
  value?: string;
  onChange?: (value: string) => void;
  /** Accessible name for the group. Required in practice. */
  label?: string;
}
/**
 * 2-4 mutually exclusive views. Renders as `role="radiogroup"` with
 * `role="radio"` + `aria-checked` children (v1.1.7 — it was `aria-pressed`,
 * which describes N independent toggles). One tab stop for the whole set, with
 * Arrow / Home / End moving AND selecting, per the WAI-ARIA radio-group pattern.
 */
/** forwardRef since v1.2 — the ref reaches the radiogroup container, so react-hook-form's
 *  register(), a Controller's field.ref and .focus()-on-error all work. */
export declare const Segmented: React.ForwardRefExoticComponent<
  SegmentedProps & React.RefAttributes<HTMLDivElement>
>;