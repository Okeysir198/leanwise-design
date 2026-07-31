import { jsx } from "react/jsx-runtime";
import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
const Textarea = React.forwardRef(function Textarea2({ invalid, className, ...rest }, ref) {
  return /* @__PURE__ */ jsx("textarea", { ref, className: cx("lw-textarea", className), "aria-invalid": invalid ? "true" : void 0, ...rest });
});
export {
  Textarea
};
