import * as React from "react";

export interface DialogProps extends React.HTMLAttributes<HTMLElement> {
  open?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Actions. Confirm last, on the right — the platform convention. */
  footer?: React.ReactNode;
  width?: string | number;
}
export declare function Dialog(props: DialogProps): JSX.Element;