const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * The LeanWise button. Renders the shipped `.lw-btn` CSS — no styling of its
 * own — so the React and vanilla consumers can never drift apart.
 *
 * `cta` is the amber. One per view; the token lint enforces it.
 */
export function Button({
  variant = "brand",
  size = "md",
  iconOnly = false,
  loading = false,
  disabled = false,
  as,
  className,
  onClick,
  children,
  ...rest
}) {
  const Tag = as || (rest.href ? "a" : "button");
  return (
    <Tag
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
}
