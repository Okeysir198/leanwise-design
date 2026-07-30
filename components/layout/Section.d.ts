import * as React from "react";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  dark?: boolean;
  tight?: boolean;
}
/**
 * A page BAND: full-bleed background, a centred column inside. `dark` flips every
 * descendant's ink by setting the dark band scope, so nested components re-point their
 * own tokens instead of each one needing a prop — which is why a card inside a dark
 * section needs no `dark` of its own. Max two background treatments per page.
 */
export declare function Section(props: SectionProps): JSX.Element;