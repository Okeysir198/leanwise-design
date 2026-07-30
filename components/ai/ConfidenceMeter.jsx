const cx = (...a) => a.filter(Boolean).join(" ");


/** A retrieval score. Mono number plus a bar: a bar alone is unquotable, a
 *  number alone is unscannable. Below 60% it drops to neutral ink — a low
 *  score painted brand-cyan reads as endorsement. */
export function ConfidenceMeter({ value = 0, label = "match", className, style, ...rest }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <span className={cx("lw-confidence", pct < 60 && "low", className)}
      style={{ "--lw-confidence": pct + "%", ...style }}
      role="meter" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label} {...rest}>
      <span className="rail" aria-hidden="true"><i /></span>
      <span>{pct}%</span>
    </span>
  );
}
