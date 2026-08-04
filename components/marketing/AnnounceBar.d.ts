import * as React from "react";

export interface AnnounceBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Supply it and a dismiss control appears; the bar hides itself and then calls back. Omit it and there is no control. */
  onDismiss?: () => void;
  /** Accessible name for the dismiss control. */
  dismissLabel?: string;
}
/**
 * The sticky announcement strip. Render it as the immediate SIBLING before
 * `TopBar`: `.lw-announce + .lw-topbar` offsets the header by
 * `var(--lw-announce-h, 36px)`, which is the whole reason the component belongs
 * upstream — a sticky header under a sticky announcement otherwise scrolls up
 * underneath it. Set `--lw-announce-h` if your strip is taller than 36px.
 */
export declare function AnnounceBar(props: AnnounceBarProps): React.JSX.Element | null;
