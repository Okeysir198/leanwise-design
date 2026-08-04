import * as React from "react";

export type ThemeMode = "light" | "dark" | "system";
export interface ThemeToggleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement & HTMLButtonElement>, "onChange"> {
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
  /**
   * One button that CYCLES, instead of one segment per mode.
   *
   * For a bar too narrow to spend 144px on a setting — a phone top bar, where
   * the segmented form is the single item that pushes the row past the viewport.
   * The trade is real and deliberate: a cycle hides its destination behind a
   * press and costs up to `modes.length - 1` presses to reach a given mode, so
   * this is opt-in and a wide bar should keep the segmented control.
   *
   * Renders a plain `<button>` (`.lw-icon-btn.lw-hit.lw-theme-compact`), not a
   * radiogroup — one button is not a group.
   */
  compact?: boolean;
  /**
   * The compact button's accessible name, from `(label, currentMode, nextMode)`.
   *
   * It must carry BOTH: the current mode alone leaves a screen-reader user
   * unable to predict the press, and the next mode alone never says where they
   * are. Default: `"Colour theme: Dark. Auto"`. Supply your own to phrase the
   * second half as an action in your locale — the default keeps it a bare label
   * because the package holds no display text.
   */
  formatCompactLabel?: (label: string, currentMode: string, nextMode: string) => string;
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