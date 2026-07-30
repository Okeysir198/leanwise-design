import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");

/* forwardRef, because the ref must reach the DOM control. Without it
   react-hook-form's register(), a Controller's field.ref, an imperative
   .focus() on a validation error and every scroll-to-error silently do
   nothing — the single biggest API gap in a package whose job IS to be the
   consumer's control layer. The ref lands on the native element, not the
   wrapper label: that is what a form library expects to find. */


/** For a setting that applies immediately. A checkbox is for a value you
 *  submit; the two are not interchangeable and the shapes say which is which. */
export const Switch = React.forwardRef(function Switch({ label, className, ...rest }, ref) {
  return (
    <label className={cx("lw-switch", className)}>
      <input ref={ref} type="checkbox" role="switch" {...rest} />
      <span className="track" />
      {label && <span className="lw-switch-text">{label}</span>}
    </label>
  );
});
