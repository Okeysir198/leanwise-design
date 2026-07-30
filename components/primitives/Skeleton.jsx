const cx = (...a) => a.filter(Boolean).join(" ");


/** A placeholder shaped like the thing it replaces. Give it the real element's
 *  dimensions, or the page will jump when the content lands. */
export function Skeleton({ shape = "block", width, height, lines, className, style, ...rest }) {
  if (lines) {
    return (
      <span className="lw-stack-4" style={{ display: "flex", flexDirection: "column", ...style }} aria-hidden="true" {...rest}>
        {Array.from({ length: lines }, (_, i) => (
          <span key={i} className="lw-skeleton text" style={{ width: i === lines - 1 ? "62%" : "100%" }} />
        ))}
      </span>
    );
  }
  return <span className={cx("lw-skeleton", shape !== "block" && shape, className)} style={{ width, height, ...style }} aria-hidden="true" {...rest} />;
}
