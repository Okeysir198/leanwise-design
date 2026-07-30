const cx = (...a) => a.filter(Boolean).join(" ");


/**
 * The form unit: label, control, and ONE slot that holds help text or an error
 * — never both, because a field showing both is a field whose error is easy to
 * miss. Wires htmlFor/id and aria-describedby so the control does not have to.
 */
export function Field({ label, help, error, required, optional, htmlFor, className, children, ...rest }) {
  const id = htmlFor;
  const msgId = id ? id + "-msg" : undefined;
  return (
    <div className={cx("lw-field", className)} {...rest}>
      {label && (
        <label className="lw-label" htmlFor={id}>
          {label}
          {/* The asterisk is a convention sighted users read; it is not a word.
              The hidden text is what a screen reader announces, so "required"
              survives whether or not the control also carries the attribute. */}
          {required && <><span className="req" aria-hidden="true">*</span><span className="lw-sr-only">(required)</span></>}
          {optional && <span className="opt">optional</span>}
        </label>
      )}
      {typeof children === "function"
        ? children({ id, "aria-describedby": msgId, "aria-invalid": error ? "true" : undefined, required })
        : children}
      {error ? <span className="lw-error" id={msgId} role="alert">{error}</span>
             : help ? <span className="lw-help" id={msgId}>{help}</span> : null}
    </div>
  );
}
