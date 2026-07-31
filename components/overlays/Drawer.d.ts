import * as React from "react";

/** Note the `Omit`: this component gives `title` a richer meaning than the DOM
 *  attribute of the same name, so the inherited one has to be removed or the
 *  interface does not extend cleanly. Invisible until v1.2 — there was no
 *  tsconfig, so `tsc` had never run over these declarations. */
export interface DrawerProps extends Omit<React.HTMLAttributes<HTMLDialogElement>, "title"> {
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
export declare function Drawer(props: DrawerProps): React.JSX.Element;
