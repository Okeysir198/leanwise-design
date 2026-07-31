import { jsx } from "react/jsx-runtime";
import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
const Select = React.forwardRef(function Select2({ options, invalid, className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx("select", { ref, className: cx("lw-select", className), "aria-invalid": invalid ? "true" : void 0, ...rest, children: options ? options.map((o) => {
    const v = typeof o === "string" ? o : o.value;
    const l = typeof o === "string" ? o : o.label;
    return /* @__PURE__ */ jsx("option", { value: v, children: l }, v);
  }) : children });
});
export {
  Select
};
