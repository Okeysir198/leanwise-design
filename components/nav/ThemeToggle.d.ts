import * as React from "react";

export type ThemeMode = "light" | "dark" | "system";
export interface ThemeToggleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Omit for uncontrolled (localStorage-backed). */
  value?: ThemeMode;
  onChange?: (mode: ThemeMode) => void;
  /** Which modes the control offers. Default all three; pass
   *  `["light","dark"]` for a product with no system-follow mode. */
    /** Which modes the control offers. Defaults to ["light","dark"] — add "system"
   *  wherever the product honours the OS preference. */
  modes?: ThemeMode[];
}
export declare function ThemeToggle(props: ThemeToggleProps): JSX.Element;