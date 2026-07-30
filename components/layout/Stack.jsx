const cx = (...a) => a.filter(Boolean).join(" ");


/** Vertical rhythm. The gap is the only thing it does. */
export function Stack({ gap = 16, as: Tag = "div", className, children, ...rest }) {
  return <Tag className={cx("lw-stack", gap !== 16 && `lw-stack-${gap}`, className)} {...rest}>{children}</Tag>;
}
