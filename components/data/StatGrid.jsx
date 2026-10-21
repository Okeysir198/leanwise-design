import { Grid } from "../layout/Grid.jsx";

const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * A `Grid` whose `StatMeter` tiles share their row tracks: eyebrow against
 * eyebrow, number against number, foot against foot — at any label length, in
 * any locale. On its own a tile is a flex column, so a label that wraps pushes
 * THAT tile's number below its siblings', and which label wraps depends on the
 * language, not the design; side by side, the strip reads as crooked numbers.
 * Inside this grid the tile subgrids its rows (three, four with a bar), so each
 * row becomes the height of its tallest sibling. Where subgrid is unsupported
 * the declarations fall back to the flex tile — exactly yesterday's rendering.
 *
 * Takes every `Grid` prop (`min`, `gap`…); only the alignment is added. Tiles
 * with fewer rows than the span (no `foot`, no bar) keep the border equal to
 * their siblings' and carry the slack inside, which is the right trade: an
 * unequal border is visible, slack is not.
 */
export function StatGrid({ className, ...rest }) {
  return <Grid className={cx("lw-stat-grid", className)} {...rest} />;
}
