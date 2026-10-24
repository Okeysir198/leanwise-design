const cx = (...a) => a.filter(Boolean).join(" ");


/** The dark hero: deep-navy ground, masked hairline grid, radial brand wash.
 *  Descendants get on-dark ink automatically — never restyle them by hand.
 *
 *  `compact` is padding and artwork only — an inner page's hero, so a site does
 *  not open every page with its front door. The tokens, the ink and every child
 *  are identical.
 *
 *  `split` puts the title on the left and the lead and actions on the right,
 *  with the aside across the full width beneath them — for a wide artefact
 *  that is unreadable at half the column. One column again below 1024px. */
export function Hero({ eyebrow, title, lead, actions, aside, compact, split, className, children, ...rest }) {
  return (
    <section className={cx("lw-hero-dark", compact && "lw-hero-compact", split && "lw-hero-split", className)} {...rest}>
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
