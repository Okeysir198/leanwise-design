import * as React from "react";

export type LogoRailMode = "mask" | "mono";
export interface Logo {
  name: string;
  /**
   * Under `mask` (the default) the image's ALPHA is the mark: supply a transparent,
   * single-colour silhouette — ink opaque, ground transparent. A JPEG, a mark on a
   * white card, or opaque-white lettering inside a filled shape all mask to one solid
   * blob. Re-cut the asset, or set `mode: "mono"` for that logo.
   */
  src?: string;
  /** Per-logo override of the rail's `mode`. */
  mode?: LogoRailMode;
}
export interface LogoRailProps extends React.HTMLAttributes<HTMLDivElement> {
  logos?: Logo[];
  /** Slow 40s loop, paused on hover, static under reduced motion. */
  marquee?: boolean;
  /**
   * `mask` (default) paints each mark as one ink through its alpha. `mono` draws the
   * image itself under `grayscale()` and the rail's opacity — for a multi-tone raster
   * that cannot be re-cut as a silhouette. Since v2.2.0.
   */
  mode?: LogoRailMode;
}
export declare function LogoRail(props: LogoRailProps): React.JSX.Element;
