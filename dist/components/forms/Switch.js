import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
const Switch = React.forwardRef(function Switch2({ label, className, ...rest }, ref) {
  return /* @__PURE__ */ jsxs("label", { className: cx("lw-switch", className), children: [
    /* @__PURE__ */ jsx("input", { ref, type: "checkbox", role: "switch", ...rest }),
    /* @__PURE__ */ jsx("span", { className: "track" }),
    label && /* @__PURE__ */ jsx("span", { className: "lw-switch-text", children: label })
  ] });
});
export {
  Switch
};
