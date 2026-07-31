import * as React from "react";

export interface Logo { name: string; src?: string }
export interface LogoRailProps extends React.HTMLAttributes<HTMLDivElement> {
  logos?: Logo[];
  /** Slow 40s loop, paused on hover, static under reduced motion. */
  marquee?: boolean;
}
export declare function LogoRail(props: LogoRailProps): React.JSX.Element;