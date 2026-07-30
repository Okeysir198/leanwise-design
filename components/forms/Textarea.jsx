import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");

/* forwardRef, because the ref must reach the DOM control. Without it
   react-hook-form's register(), a Controller's field.ref, an imperative
   .focus() on a validation error and every scroll-to-error silently do
   nothing — the single biggest API gap in a package whose job IS to be the
   consumer's control layer. The ref lands on the native element, not the
   wrapper label: that is what a form library expects to find. */


export const Textarea = React.forwardRef(function Textarea({ invalid, className, ...rest }, ref) {
  return <textarea ref={ref} className={cx("lw-textarea", className)} aria-invalid={invalid ? "true" : undefined} {...rest} />;
});
