const cx = (...a) => a.filter(Boolean).join(" ");


export function Textarea({ invalid, className, ...rest }) {
  return <textarea className={cx("lw-textarea", className)} aria-invalid={invalid ? "true" : undefined} {...rest} />;
}
