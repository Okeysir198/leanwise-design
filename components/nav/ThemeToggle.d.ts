import * as React from "react";

export type ThemeMode = "light" | "dark" | "system";
export interface ThemeToggleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Omit for uncontrolled (localStorage-backed). */
  value?: ThemeMode;
  onChange?: (mode: ThemeMode) => void;
  /** Which modes the control offers. Defaults to `["light","dark"]` — add
   *  "system" wherever the product honours the OS preference. */
  /* --- Display text. Every user-visible string this component renders is a
     prop, because a component library cannot hold display text (v1.3.1). --- */
  modes?: ThemeMode[];
  /** The `role="radiogroup"` accessible name. */
  label?: string;
  /** Per-mode `aria-label` + tooltip. */
  modeLabels?: Partial<Record<ThemeMode, string>>;
}
/**
 * Light / dark (add `"system"` via `modes`). Uncontrolled by default — reads and
 * writes `document.documentElement` and localStorage.
 *
 * Renders as `role="radiogroup"` with `role="radio"` + `aria-checked` children
 * (v1.1.7 — it was `aria-pressed`), with a roving tabindex and arrow-key
 * navigation. Same contract as `Segmented`.
 */
export declare function ThemeToggle(props: ThemeToggleProps): React.JSX.Element;