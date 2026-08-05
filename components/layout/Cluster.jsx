const cx = (...a) => a.filter(Boolean).join(" ");


/** Horizontal group that wraps. Toolbars, chip rows, action bars. Wrapping is
 *  the default because a row that cannot wrap will overflow a phone. */
export function Cluster({ gap = 8, justify, align, wrap = true, as: Tag = "div", className, children, ...rest }) {
  return (
    <Tag className={cx("lw-cluster", gap !== 8 && `lw-cluster-${gap}`,
      justify === "between" && "lw-cluster-between", justify === "end" && "lw-cluster-end",
      align === "baseline" && "lw-cluster-baseline", !wrap && "lw-cluster-nowrap",
      className)} {...rest}>{children}</Tag>
  );
}
