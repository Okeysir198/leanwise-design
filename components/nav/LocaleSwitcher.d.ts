import * as React from "react";

/* `onChange` here hands back a locale CODE, not a DOM event — the same trade
   `Segmented` makes, and for the same reason. */
export interface LocaleSwitcherProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /** The current locale code, e.g. `"vi"`. */
  value?: string;
  onChange?(locale: string): void;
  /** Codes to offer, in order. Falls back to the keys of `localeLabels`. */
  locales?: string[];
  /**
   * Code → the language's name IN THAT LANGUAGE. "Tiếng Việt", not
   * "Vietnamese": a reader looking for their own language looks for its endonym,
   * which is the one string they can definitely read on a screen they cannot
   * otherwise navigate. This package ships no language names — a list of
   * endonyms is a claim about which languages exist and how they are spelt.
   */
  localeLabels?: Record<string, React.ReactNode>;
  /** The control's accessible name. Default "Language". */
  label?: string;
  /**
   * Narrow form: a globe button that opens a MENU listing every language.
   *
   * Deliberately not `ThemeToggle compact`'s cycle. A reader who does not read
   * the current language cannot predict what the next press gives them, and
   * overshooting means cycling through languages they cannot read to get back.
   */
  compact?: boolean;
}
export declare function LocaleSwitcher(props: LocaleSwitcherProps): React.JSX.Element;
