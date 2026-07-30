const cx = (...a) => a.filter(Boolean).join(" ");


/**
 * The surface. `interactive` is not cosmetic — it adds the pointer, the focus
 * ring and the press state a clickable card legally needs, and switches the
 * element to a button unless you pass `href`.
 */
export function Card({ interactive = false, glow = false, selected, as, className, children, ...rest }) {
  const Tag = as || (interactive ? (rest.href ? "a" : "button") : "div");
  return (
    <Tag
      className={cx("lw-card", interactive && "lw-card-interactive", glow && "lw-card-glow", className)}
      aria-selected={selected}
      type={Tag === "button" ? "button" : undefined}
      {...rest}
    >{children}</Tag>
  );
}
export function CardHead({ className, children, ...rest }) { return <div className={cx("lw-card-head", className)} {...rest}>{children}</div>; }
export function CardTitle({ as: Tag = "h3", className, children, ...rest }) { return <Tag className={cx("lw-card-title", className)} {...rest}>{children}</Tag>; }
export function CardBody({ className, children, ...rest }) { return <p className={cx("lw-card-body", className)} {...rest}>{children}</p>; }
export function CardFoot({ className, children, ...rest }) { return <div className={cx("lw-card-foot", className)} {...rest}>{children}</div>; }
