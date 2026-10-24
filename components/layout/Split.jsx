const cx = (...a) => a.filter(Boolean).join(" ");


/** A main column and a rail, in source order. Collapses to one column at
 *  `--lw-bp-lg` (1024px) with no query of your own. */
export function Split({ rail = 320, side = "end", gap = 24, as: Tag = "div", className, style, children, ...rest }) {
  return (
    <Tag className={cx("lw-split", side === "start" && "lw-split-start", gap !== 24 && `lw-split-${gap}`, className)}
      style={{ "--lw-split-rail": typeof rail === "number" ? rail + "px" : rail, ...style }} {...rest}>{children}</Tag>
  );
}
