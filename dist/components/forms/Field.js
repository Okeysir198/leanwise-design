"use client";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
function Field({
  label,
  help,
  error,
  required,
  optional,
  htmlFor,
  requiredLabel = "(required)",
  optionalLabel = "optional",
  className,
  children,
  ...rest
}) {
  const auto = React.useId();
  const id = htmlFor || auto;
  const msgId = id + "-msg";
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-field", className), ...rest, children: [
    label && /* @__PURE__ */ jsxs("label", { className: "lw-label", htmlFor: id, children: [
      label,
      required && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: "req", "aria-hidden": "true", children: "*" }),
        /* @__PURE__ */ jsx("span", { className: "lw-sr-only", children: requiredLabel })
      ] }),
      optional && /* @__PURE__ */ jsx("span", { className: "opt", children: optionalLabel })
    ] }),
    typeof children === "function" ? children({ id, "aria-describedby": error || help ? msgId : void 0, "aria-invalid": error ? "true" : void 0, required }) : children,
    error ? /* @__PURE__ */ jsx("span", { className: "lw-error", id: msgId, role: "alert", children: error }) : help ? /* @__PURE__ */ jsx("span", { className: "lw-help", id: msgId, children: help }) : null
  ] });
}
export {
  Field
};
