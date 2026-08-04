import * as React from "react";

export interface Step {
  /** The marker text. Defaults to the zero-padded index, as `FeatureGrid` does. Real markup, never CSS `counter()`. */
  label?: React.ReactNode;
  title: React.ReactNode;
  body?: React.ReactNode;
  /** A date, a phase, a version — mono, above the title. */
  meta?: React.ReactNode;
  href?: string;
  /** Link text for `href`. Defaults to "Learn more". */
  more?: string;
}
export interface StepsProps extends Omit<React.OlHTMLAttributes<HTMLOListElement>, "type"> {
  items?: Step[];
  /** `horizontal` flows the steps as columns and rotates the spine; it reverts to the stack under `--lw-bp-md`. */
  orientation?: "vertical" | "horizontal";
  /**
   * Replaces the anchor ELEMENT for items that carry an `href`. Default `"a"`.
   * It receives what the raw `<a>` would: `href` and `children`.
   */
  linkAs?: React.ElementType;
}
/**
 * A numbered sequence — a company timeline, a roadmap, a "how it works".
 *
 * Deliberately has NO state axis: `Stepper` owns wizard state (done / current /
 * upcoming) and the ARIA that goes with it. A timeline has no state, because
 * every entry already happened. The split is by meaning, not by looks.
 */
export declare function Steps(props: StepsProps): React.JSX.Element;
