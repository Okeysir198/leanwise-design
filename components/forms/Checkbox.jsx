const cx = (...a) => a.filter(Boolean).join(" ");


export function Checkbox({ label, radio = false, className, ...rest }) {
  return (
    <label className={cx("lw-check", radio && "radio", className)}>
      <input type={radio ? "radio" : "checkbox"} {...rest} />
      <span className="box" />
      {label && <span className="lw-check-text">{label}</span>}
    </label>
  );
}
