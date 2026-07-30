const cx = (...a) => a.filter(Boolean).join(" ");


/** The app-shell width (1400px) — wider than the reading column on purpose. */
export function Page({ className, children, ...rest }) {
  return <div className={cx("lw-page", className)} {...rest}>{children}</div>;
}
