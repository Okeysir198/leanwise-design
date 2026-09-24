export type ThemeMode = "light" | "dark" | "system";
export interface ThemeState {
  mode: ThemeMode;
  resolved: "light" | "dark";
  /** Toggles `.dark` on <html> and persists to localStorage and the `lw-theme` cookie. */
  setMode(m: ThemeMode): void;
}
/** The localStorage key and the cookie name. */
export declare const THEME_KEY: "lw-theme";
export function useTheme(): ThemeState;
export function useReducedMotion(): boolean;
