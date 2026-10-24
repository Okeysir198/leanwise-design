const cx = (...a) => a.filter(Boolean).join(" ");


/** Auto-fit columns. `min` is the only knob — the grid reflows on its own at
 *  every width, so the common case needs no breakpoint.
 *
 *  `alignRows` shares row tracks between the `.lw-card` children: the same
 *  child sits at the same height in every card of a row, at any text length.
 *  The count comes from the consumer because CSS cannot see how many children
 *  a card has.
 *
 *  `ruled` trades the gap for hairlines: the children sit flush and a rule
 *  runs between every pair, across and down, at whatever column count the
 *  width allows. A card child gives up its own surface inside it. */
export function Grid({ min, gap = 16, alignRows, ruled, as: Tag = "div", className, style, children, ...rest }) {
  return (
    <Tag className={cx("lw-grid", gap === 24 && "lw-grid-24", alignRows && "lw-grid-align", ruled && "lw-grid-ruled", className)}
      style={{
        ...(min ? { "--lw-grid-min": typeof min === "number" ? min + "px" : min } : null),
        ...(alignRows != null ? { "--lw-align-rows": String(alignRows) } : null),
        ...style,
      }} {...rest}>{children}</Tag>
  );
}
