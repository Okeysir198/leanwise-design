const cx = (...a) => a.filter(Boolean).join(" ");


/** For a setting that applies immediately. A checkbox is for a value you
 *  submit; the two are not interchangeable and the shapes say which is which. */
export function Switch({ label, className, ...rest }) {
  return (
    <label className={cx("lw-switch", className)}>
      <input type="checkbox" role="switch" {...rest} />
      <span className="track" />
      {label && <span className="lw-switch-text">{label}</span>}
    </label>
  );
}
