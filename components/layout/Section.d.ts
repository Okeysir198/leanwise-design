import * as React from "react";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  dark?: boolean;
  tight?: boolean;
  /**
   * Draw the hairline that separates this band from the one before it.
   * `true` and `"top"` are the same thing.
   *
   * The rule belongs to the boundary ABOVE by default, and that is the whole
   * design: a boundary has exactly one owner or it gets drawn twice. "The first
   * band has no rule above it" is then expressed by not setting the prop, and
   * two adjacent bands cannot both claim the same line.
   *
   * One weight — the package's only hairline, `1px solid var(--lw-line)` — with
   * `--lw-section-rule-w` as a local knob for a page that wants more.
   */
  rule?: boolean | "top" | "bottom";
}
/**
 * A page BAND: full-bleed background, a centred column inside. `dark` flips every
 * descendant's ink by setting the dark band scope, so nested components re-point their
 * own tokens instead of each one needing a prop — which is why a card inside a dark
 * section needs no `dark` of its own. Max two background treatments per page.
 */
export declare function Section(props: SectionProps): React.JSX.Element;