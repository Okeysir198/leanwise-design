const cx = (...a) => a.filter(Boolean).join(" ");


/** The chevron is drawn in CSS: the native arrow is the one control detail that
 *  gives the platform away and cannot be tokenised. */
export function Select({ options, invalid, className, children, ...rest }) {
  return (
    <select className={cx("lw-select", className)} aria-invalid={invalid ? "true" : undefined} {...rest}>
      {options ? options.map(o => {
        const v = typeof o === "string" ? o : o.value;
        const l = typeof o === "string" ? o : o.label;
        return <option key={v} value={v}>{l}</option>;
      }) : children}
    </select>
  );
}
