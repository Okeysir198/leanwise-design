const cx = (...a) => a.filter(Boolean).join(" ");


/** Status atom. Reads a status family's soft tint + text tier, so it re-points
 *  on dark with no conditional. */
export function Chip({ tone = "brand", className, children, ...rest }) {
  // Chip's spelling was already the canonical one, so this changes nothing it
  // accepted before. It is here for what it REJECTED: a consumer who learned
  // `ok` from Toast and typed it here got `.lw-chip-ok`, which matches no rule,
  // so the chip rendered with no tint at all and nothing said why.
  return <span className={cx("lw-chip", tone !== "brand" && `lw-chip-${tone}`, className)} {...rest}>{children}</span>;
}
