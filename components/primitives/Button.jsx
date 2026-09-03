"use client";
import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * The LeanWise button. Renders the shipped `.lw-btn` CSS — no styling of its
 * own — so the React and vanilla consumers can never drift apart.
 *
 * `cta` is the amber. One per view; the token lint enforces it.
 *
 * forwardRef since v2.0.0: a Radix `Trigger asChild` clones its child and
 * needs the DOM node for positioning and focus return, so a Button that
 * swallowed its ref could not anchor a Popover, a Menu or a Tooltip.
 */
export const Button = React.forwardRef(function Button({
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
  return (
    <Tag
      ref={ref}
      className={cx(
        "lw-btn",
        `lw-btn-${variant}`,
        size === "sm" && "lw-btn-sm",
        size === "lg" && "lw-btn-lg",
        iconOnly && "lw-btn-icon",
        className
      )}
      // A loading button must stay focusable (so the ring is visible) but must
      // not fire twice — aria-disabled, not disabled.
      data-loading={loading ? "true" : undefined}
      aria-disabled={loading || disabled ? "true" : undefined}
      disabled={Tag === "button" ? disabled : undefined}
      // `type` is destructured out of `rest` and re-applied ONLY on a real
      // <button>, for the same reason `disabled` is: on an <a> or a router Link
      // it is either meaningless or a link MIME hint, and it used to ride
      // `{...rest}` onto whichever element `as` named. The DEFAULT is "button"
      // since v2.0.0 (REVIEW open item 9): HTML's `submit` default meant every
      // Cancel, Delete and toolbar Button inside a <form> submitted it. The
      // form's submit control says `type="submit"` explicitly — the one that
      // was not obvious in v1 and the one the v2.0 migration note greps for.
      type={Tag === "button" ? type : undefined}
      // aria-disabled keeps the ring but not the guard: an <a> or a loading
      // button still fires without this, which is how a double-submit ships.
      onClick={(e) => {
        if (loading || disabled) { e.preventDefault(); e.stopPropagation(); return; }
        onClick && onClick(e);
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
});
Button.displayName = "Button";
