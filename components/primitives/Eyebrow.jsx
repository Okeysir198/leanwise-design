const cx = (...a) => a.filter(Boolean).join(" ");


/** The signature motif: mono, uppercase, wide-tracked, with a cyan dot. */
export function Eyebrow({ as: Tag = "p", className, children, ...rest }) {
  return <Tag className={cx("lw-eyebrow", className)} {...rest}>{children}</Tag>;
}
