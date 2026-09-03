"use client";
import { jsx } from "react/jsx-runtime";
import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
const Button = React.forwardRef(function Button2({
  variant = "brand",
  size = "md",
  iconOnly = false,
  loading = false,
  disabled = false,
  as,
  type = "button",
  className,
  onClick,
  children,
  ...rest
}, ref) {
  const Tag = as || (rest.href ? "a" : "button");
  return /* @__PURE__ */ jsx(
    Tag,
    {
      ref,
      className: cx(
        "lw-btn",
        `lw-btn-${variant}`,
        size === "sm" && "lw-btn-sm",
        size === "lg" && "lw-btn-lg",
        iconOnly && "lw-btn-icon",
        className
      ),
      "data-loading": loading ? "true" : void 0,
      "aria-disabled": loading || disabled ? "true" : void 0,
      disabled: Tag === "button" ? disabled : void 0,
      type: Tag === "button" ? type : void 0,
      onClick: (e) => {
        if (loading || disabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        onClick && onClick(e);
      },
      ...rest,
      children
    }
  );
});
Button.displayName = "Button";
export {
  Button
};
