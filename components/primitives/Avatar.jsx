const cx = (...a) => a.filter(Boolean).join(" ");


/** Initials by default; an image only when there is one. Never a generated
 *  face — a placeholder person is a fabrication. */
export function Avatar({ name = "", src, size = "md", className, ...rest }) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map(w => w[0] || "").join("").toUpperCase();
  return (
    <span className={cx("lw-avatar", size === "sm" && "lw-avatar-sm", size === "lg" && "lw-avatar-lg", className)} title={name || undefined} {...rest}>
      {src ? <img src={src} alt={name} /> : initials}
    </span>
  );
}
