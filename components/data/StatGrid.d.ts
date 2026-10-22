import * as React from "react";
import { GridProps } from "../layout/Grid";

/**
 * A `Grid` whose `StatMeter` tiles share their row tracks: eyebrow against
 * eyebrow, number against number, foot against foot — at any label length, in
 * any locale. On its own a tile is a flex column, so a label that wraps pushes
 * that tile's number below its siblings', and which label wraps depends on the
 * language, not the design. Inside this grid the tile subgrids its rows (three,
 * four with a bar); without subgrid support the tile stays the flex column it
 * always was.
 *
 * Takes every `Grid` prop (`min`, `gap`…); only the alignment is added.
 */
export declare function StatGrid(props: GridProps): React.JSX.Element;
