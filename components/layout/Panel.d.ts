import * as React from "react";

export interface PanelProps extends React.HTMLAttributes<HTMLElement> {
  /** One tier lighter (the card surface) — for a panel set beside cards. */
  raised?: boolean;
  as?: string;
}
/**
 * The inset emphasis surface — the deepest neutral tier (`--lw-bg-inset`) as a
 * container, `--lw-radius-xl` (the token reserved for "panels, modals"), a
 * hairline, and NO lift shadow: an inset surface is recessed into the page, and
 * elevation would say the opposite. Emphasis by ground, not by tint or border
 * weight — the ground stays behind it, so it is never a dark band. The token
 * re-points per theme (surface-3 / navy-inset-2), which is the whole theming
 * story: the component has no theme branches of its own.
 *
 * The interior is yours — compose with Stack/Cluster. The panel owns only the
 * surface, the 32px pad and the 16px rhythm, the way Card owns 20px / 12px.
 */
export declare function Panel(props: PanelProps): React.JSX.Element;
