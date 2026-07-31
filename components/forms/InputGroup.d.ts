import * as React from "react";

/** Note the `Omit`: this component gives `prefix` a richer meaning than the DOM
 *  attribute of the same name, so the inherited one has to be removed or the
 *  interface does not extend cleanly. Invisible until v1.2 — there was no
 *  tsconfig, so `tsc` had never run over these declarations. */
export interface InputGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "prefix"> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}
/**
 * The wrapper draws the frame, so it also owns the invalid state: it selects on
 * `:has([aria-invalid="true"])` rather than a class, which is what stops an
 * invalid group announcing an error that nothing shows.
 */
export declare function InputGroup(props: InputGroupProps): React.JSX.Element;
