"use client";
import { jsx } from "react/jsx-runtime";
import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
const OtpInput = React.forwardRef(function OtpInput2({ length = 6, value, defaultValue = "", onChange, onComplete, invalid, className, ...rest }, ref) {
  const [internal, setInternal] = React.useState(defaultValue);
  const isControlled = value != null;
  const code = isControlled ? value : internal;
  const fired = React.useRef(null);
  const set = (next) => {
    const digits = String(next).replace(/\D+/g, "").slice(0, length);
    if (!isControlled) setInternal(digits);
    onChange?.(digits);
    if (digits.length === length) {
      if (fired.current !== digits) {
        fired.current = digits;
        onComplete?.(digits);
      }
    } else {
      fired.current = null;
    }
  };
  return /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      className: cx("lw-otp", className),
      type: "text",
      inputMode: "numeric",
      autoComplete: "one-time-code",
      autoCapitalize: "off",
      autoCorrect: "off",
      spellCheck: false,
      maxLength: length,
      value: code,
      "aria-invalid": invalid ? "true" : void 0,
      onChange: (e) => set(e.target.value),
      ...rest
    }
  );
});
export {
  OtpInput
};
