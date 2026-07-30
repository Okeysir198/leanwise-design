const cx = (...a) => a.filter(Boolean).join(" ");


/** Auto-fit columns. `min` is the only knob — the grid reflows on its own at
 *  every width, so the common case needs no breakpoint. */
export function Grid({ min, gap = 16, as: Tag = "div", className, style, children, ...rest }) {
  return (
    <Tag className={cx("lw-grid", gap === 24 && "lw-grid-24", className)}
      style={min ? { "--lw-grid-min": typeof min === "number" ? min + "px" : min, ...style } : style} {...rest}>{children}</Tag>
  );
}
