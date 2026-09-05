const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * Determinate progress. A component rather than a styled span, for one reason:
 * the fill width is a live value, and a live value belongs in a component that
 * owns it — not in a template's style attribute, where nothing can paint until
 * the first number arrives.
 *
 * `role="progressbar"` with real values, so a screen reader gets the number and
 * not just a moving box. Indeterminate work is a `Skeleton`, not this: a bar
 * that animates without knowing how far along it is tells the user a number it
 * does not have.
 */
export function Progress({ value = 0, max = 100, label, tone, className, ...rest }) {
  const pct = Math.max(0, Math.min(100, (Number(value) / Number(max || 100)) * 100));
  return (
    <span className={cx("lw-progress", className)} data-tone={tone}
      role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}
      aria-label={label} {...rest}>
      <i style={{ width: pct + "%" }} />
    </span>
  );
}
