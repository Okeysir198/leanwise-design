const cx = (...a) => a.filter(Boolean).join(" ");


export function Input({ size = "md", invalid, className, ...rest }) {
  return <input className={cx("lw-input", size === "sm" && "lw-input-sm", size === "lg" && "lw-input-lg", className)}
    aria-invalid={invalid ? "true" : undefined} {...rest} />;
}
