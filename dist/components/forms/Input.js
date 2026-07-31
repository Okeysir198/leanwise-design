import { jsx } from "react/jsx-runtime";
import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
const Input = React.forwardRef(function Input2({ size = "md", invalid, className, ...rest }, ref) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      className: cx("lw-input", size === "sm" && "lw-input-sm", size === "lg" && "lw-input-lg", className),
      "aria-invalid": invalid ? "true" : void 0,
      ...rest
    }
  );
});
export {
  Input
};
