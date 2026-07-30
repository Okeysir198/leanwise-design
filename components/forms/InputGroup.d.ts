import * as React from "react";

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}
/**
 * The wrapper draws the frame, so it also owns the invalid state: it selects on
 * `:has([aria-invalid="true"])` rather than a class, which is what stops an
 * invalid group announcing an error that nothing shows.
 */
export declare function InputGroup(props: InputGroupProps): JSX.Element;
