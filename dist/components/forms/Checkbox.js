import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
const Checkbox = React.forwardRef(function Checkbox2({ label, radio = false, className, ...rest }, ref) {
  return /* @__PURE__ */ jsxs("label", { className: cx("lw-check", radio && "radio", className), children: [
    /* @__PURE__ */ jsx("input", { ref, type: radio ? "radio" : "checkbox", ...rest }),
    /* @__PURE__ */ jsx("span", { className: "box" }),
    label && /* @__PURE__ */ jsx("span", { className: "lw-check-text", children: label })
  ] });
});
export {
  Checkbox
};
