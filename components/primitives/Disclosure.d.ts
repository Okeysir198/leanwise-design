import * as React from "react";

export interface DisclosureProps extends React.DetailsHTMLAttributes<HTMLElement> {
  /** The always-visible row. Rendered inside the `<summary>`. */
  summary: React.ReactNode;
  /**
   * Open on first render. Applied once — this component is UNCONTROLLED, and
   * the browser owns the state. To observe it, use `onToggle`; to control it,
   * pass `open` instead (and then you own re-opening it on every render).
   */
  defaultOpen?: boolean;
  children?: React.ReactNode;
}
export declare function Disclosure(props: DisclosureProps): React.JSX.Element;
