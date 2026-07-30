const cx = (...a) => a.filter(Boolean).join(" ");


/** A page band. `dark` flips every descendant's ink via the band convention —
 *  never restyle children by hand for a dark ground. */
export function Section({ dark = false, tight = false, className, children, ...rest }) {
  return (
    <section className={cx("lw-section", tight && "tight", dark && "dark lw-band-dark", className)}
      data-band={dark ? "dark" : undefined} {...rest}>{children}</section>
  );
}
