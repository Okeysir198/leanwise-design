const cx = (...a) => a.filter(Boolean).join(" ");


/** The citation atom. A numbered mono chip so a claim in the answer and the
 *  document behind it share one identifier the user can point at. */
export function SourceChip({
  n, title, as,
  formatLabel = (num, t) => (t ? `Source ${num}: ${t}` : `Source ${num}`),
  className, ...rest
}) {
  const Tag = as || (rest.href ? "a" : "button");
  return (
    <Tag className={cx("lw-source", className)} type={Tag === "button" ? "button" : undefined}
      aria-label={formatLabel(n, title)} {...rest}>{n}</Tag>
  );
}
