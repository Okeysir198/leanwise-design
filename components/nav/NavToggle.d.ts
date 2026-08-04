import * as React from "react";

export interface NavToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "children"> {
  /** Accessible name while the panel is closed. */
  label?: string;
  /** Accessible name while it is open — the name states the ACTION, not the state. */
  closeLabel?: string;
  /** Panel id. Generated from `useId()` when omitted; set it only to link something else to the panel. */
  id?: string;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** The panel's contents — links, in their own `<nav>` with a label that is not the bar's "Primary". */
  children?: React.ReactNode;
}
export declare function NavToggle(props: NavToggleProps): React.JSX.Element;
