const cx = (...a) => a.filter(Boolean).join(" ");


/** The 1200px reading column — narrower than `Page` because prose and a shell
 *  do not want the same measure. */
export function Container({ className, children, ...rest }) {
  return <div className={cx("lw-container", className)} {...rest}>{children}</div>;
}
