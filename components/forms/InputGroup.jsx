const cx = (...a) => a.filter(Boolean).join(" ");


/** An input with an affix. The BOX owns the border and the focus ring, so the
 *  ring wraps the whole control rather than a rectangle inside it — and the
 *  invalid state is selected with `:has([aria-invalid])`, so the attribute the
 *  screen reader reads is the same one that paints the border. */
export function InputGroup({ prefix, suffix, className, children, ...rest }) {
  return (
    <div className={cx("lw-input-group", className)} {...rest}>
      {prefix && <span className="affix">{prefix}</span>}
      {children}
      {suffix && <span className="affix mono">{suffix}</span>}
    </div>
  );
}
