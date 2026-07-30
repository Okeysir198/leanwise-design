import * as React from "react";

export interface DrawerProps extends React.HTMLAttributes<HTMLDialogElement> {
  open?: boolean;
  onClose?(): void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  /** Which edge it enters from. `bottom` is the touch answer to a centred dialog. */
  side?: "start" | "end" | "bottom";
  /** Panel width for the side variants. A bare number means px. */
  width?: string | number;
}
/**
 * The side sheet — a modal that enters from an edge, on the native `<dialog>`
 * so the focus trap, Esc and background inertness stay the platform's.
 */
export declare function Drawer(props: DrawerProps): JSX.Element;
