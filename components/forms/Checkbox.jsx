import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");

/* forwardRef, because the ref must reach the DOM control. Without it
   react-hook-form's register(), a Controller's field.ref, an imperative
   .focus() on a validation error and every scroll-to-error silently do
   nothing — the single biggest API gap in a package whose job IS to be the
   consumer's control layer. The ref lands on the native element, not the
   wrapper label: that is what a form library expects to find. */


export const Checkbox = React.forwardRef(function Checkbox({ label, radio = false, className, ...rest }, ref) {
  return (
    <label className={cx("lw-check", radio && "radio", className)}>
      <input ref={ref} type={radio ? "radio" : "checkbox"} {...rest} />
      <span className="box" />
      {label && <span className="lw-check-text">{label}</span>}
    </label>
  );
});
