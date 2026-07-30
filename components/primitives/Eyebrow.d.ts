import * as React from "react";

export interface EyebrowProps extends React.HTMLAttributes<HTMLElement> { as?: string }
/**
 * The signature mono/uppercase label, tipped with a hexagon node from the mark. It is
 * a LABEL, not a heading: it names the thing below it and carries no rank, so `as`
 * defaults to a span. Reach for a real `h2`/`h3` when the text belongs in the document
 * outline — an eyebrow styled as a heading breaks screen-reader navigation.
 */
export declare function Eyebrow(props: EyebrowProps): JSX.Element;