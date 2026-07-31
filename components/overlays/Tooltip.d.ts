import * as React from "react";

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  tip: string;
}
/**
 * HINTS ONLY. It does not exist on touch, so anything a user NEEDS — a label, an
 * error, a required instruction — must not live here; a tooltip is for the shortcut
 * key next to a button that is already labelled. `tip` is a string, not a node,
 * because a tooltip that can hold layout becomes a popover nobody can dismiss.
 */
export declare function Tooltip(props: TooltipProps): React.JSX.Element;