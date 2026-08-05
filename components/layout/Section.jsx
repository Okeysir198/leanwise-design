const cx = (...a) => a.filter(Boolean).join(" ");


/** A page band. `dark` flips every descendant's ink via the band convention —
 *  never restyle children by hand for a dark ground. `rule` draws the hairline
 *  boundary ABOVE the band, which is how a page separates sections once it has
 *  one continuous ground and can no longer alternate fills. */
export function Section({ dark = false, tight = false, rule = false, className, children, ...rest }) {
  return (
    <section className={cx("lw-section", tight && "tight", dark && "dark lw-band-dark",
      rule === true || rule === "top" ? "lw-section-rule" : rule === "bottom" ? "lw-section-rule-b" : null, className)}
      data-band={dark ? "dark" : undefined} {...rest}>{children}</section>
  );
}
