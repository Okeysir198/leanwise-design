"use client";
import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");


/**
 * The form unit: label, control, and ONE slot that holds help text or an error
 * — never both, because a field showing both is a field whose error is easy to
 * miss. Wires htmlFor/id and aria-describedby so the control does not have to.
 */
export function Field({
  label, help, error, required, optional, htmlFor,
  requiredLabel = "(required)", optionalLabel = "optional",
  className, children, ...rest
}) {
  /* Both ids fall back to a generated one. Without `htmlFor`, msgId was
     undefined — so the error span carried no id and nothing pointed at it, and
     the render-prop branch handed out `aria-describedby: undefined`. The most
     common use, `<Field error="…"><Input/></Field>`, produced an error message
     the screen reader never connected to the control. */
  const auto = React.useId();
  const id = htmlFor || auto;
  const msgId = id + "-msg";
  return (
    <div className={cx("lw-field", className)} {...rest}>
      {label && (
        <label className="lw-label" htmlFor={id}>
          {label}
          {/* The asterisk is a convention sighted users read; it is not a word.
              The hidden text is what a screen reader announces, so "required"
              survives whether or not the control also carries the attribute. */}
          {required && <><span className="req" aria-hidden="true">*</span><span className="lw-sr-only">{requiredLabel}</span></>}
          {optional && <span className="opt">{optionalLabel}</span>}
        </label>
      )}
      {typeof children === "function"
        ? children({ id, "aria-describedby": (error || help) ? msgId : undefined, "aria-invalid": error ? "true" : undefined, required })
        : children}
      {error ? <span className="lw-error" id={msgId} role="alert">{error}</span>
             : help ? <span className="lw-help" id={msgId}>{help}</span> : null}
    </div>
  );
}
