const cx = (...a) => a.filter(Boolean).join(" ");


/** Status atom. Reads a status family's soft tint + text tier, so it re-points
 *  on dark with no conditional. */
export function Chip({ tone = "brand", className, children, ...rest }) {
  return <span className={cx("lw-chip", tone !== "brand" && `lw-chip-${tone}`, className)} {...rest}>{children}</span>;
}
