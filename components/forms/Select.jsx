import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");

/* forwardRef, because the ref must reach the DOM control. Without it
   react-hook-form's register(), a Controller's field.ref, an imperative
   .focus() on a validation error and every scroll-to-error silently do
   nothing — the single biggest API gap in a package whose job IS to be the
   consumer's control layer. The ref lands on the native element, not the
   wrapper label: that is what a form library expects to find. */


/** The chevron is drawn in CSS: the native arrow is the one control detail that
 *  gives the platform away and cannot be tokenised. */
export const Select = React.forwardRef(function Select({ options, invalid, className, children, ...rest }, ref) {
  return (
    <select ref={ref} className={cx("lw-select", className)} aria-invalid={invalid ? "true" : undefined} {...rest}>
      {options ? options.map(o => {
        const v = typeof o === "string" ? o : o.value;
        const l = typeof o === "string" ? o : o.label;
        return <option key={v} value={v}>{l}</option>;
      }) : children}
    </select>
  );
});
