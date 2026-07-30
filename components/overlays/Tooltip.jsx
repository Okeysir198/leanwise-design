const cx = (...a) => a.filter(Boolean).join(" ");


/** CSS-only, on a wrapper. For hints — never for content the user needs: it
 *  does not exist on touch and it cannot be read aloud on its own. */
export function Tooltip({ tip, className, children, ...rest }) {
  return <span className={cx("lw-tip", className)} data-tip={tip} {...rest}>{children}</span>;
}
