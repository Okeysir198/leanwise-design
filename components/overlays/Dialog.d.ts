import * as React from "react";

/** Note the `Omit`: this component gives `title` a richer meaning than the DOM
 *  attribute of the same name, so the inherited one has to be removed or the
 *  interface does not extend cleanly. Invisible until v1.2 — there was no
 *  tsconfig, so `tsc` had never run over these declarations. */
export interface DialogProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  open?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Actions. Confirm last, on the right — the platform convention. */
  footer?: React.ReactNode;
  width?: string | number;
}
export declare function Dialog(props: DialogProps): React.JSX.Element;