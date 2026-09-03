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

  /* ⚠️ A PLAIN CHILD IS WIRED TOO, not only the render-prop form.
     Until v1.10.0 the non-function branch was a bare `: children` — so
     `<Field error="…"><Input/></Field>`, which is the usage `Input.d.ts`
     recommends and by far the most common one, rendered a `<label for>` and an
     `id`'d message that pointed at NOTHING. The error was visible, announced by
     its own `role="alert"` once, and then unreachable: no `aria-describedby`
     tied it to the control, and no `aria-invalid` marked the control at all, so
     a screen-reader user tabbing back through the form found a field that gave
     no indication it was the one that failed.

     Cloned rather than context-passed because the child is an unknown component
     and this must work for a bare `<input>` too. Only ONE element is cloned —
     with several children there is no way to know which is the control, so the
     old behaviour stands and the render-prop form is the documented escape.

     Nothing already set is overwritten: a caller's own `id` wins and the label
     follows it, and an existing `aria-describedby` is appended to, not replaced,
     because a control may already point at something of its own. */
  const single = React.Children.count(children) === 1 && React.isValidElement(children)
    ? children
    : null;
  const id = htmlFor || single?.props?.id || auto;
  const msgId = id + "-msg";
  const describedBy = (error || help)
    ? [single?.props?.["aria-describedby"], msgId].filter(Boolean).join(" ")
    : single?.props?.["aria-describedby"];
  const wired = single
    ? React.cloneElement(single, {
        id,
        "aria-describedby": describedBy,
        "aria-invalid": single.props["aria-invalid"] ?? (error ? "true" : undefined),
        required: single.props.required ?? (required || undefined),
      })
    : children;
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
        : wired}
      {error ? <span className="lw-error" id={msgId} role="alert">{error}</span>
             : help ? <span className="lw-help" id={msgId}>{help}</span> : null}
    </div>
  );
}
