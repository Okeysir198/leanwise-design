const cx = (...a) => a.filter(Boolean).join(" ");


/** The dark hero: deep-navy ground, masked hairline grid, radial brand wash.
 *  Descendants get on-dark ink automatically — never restyle them by hand. */
export function Hero({ eyebrow, title, lead, actions, aside, className, children, ...rest }) {
  return (
    <section className={cx("lw-hero-dark", className)} {...rest}>
      <div className="lw-container">
        {eyebrow && <p className="lw-eyebrow">{eyebrow}</p>}
        {title && <h1 className="lw-h1">{title}</h1>}
        {lead && <p className="lw-lead">{lead}</p>}
        {actions && <div className="lw-cluster lw-cluster-12 lw-hero-actions">{actions}</div>}
        {aside}{children}
      </div>
    </section>
  );
}
