const cx = (...a) => a.filter(Boolean).join(" ");


/**
 * A numbered sequence: a company timeline, a product roadmap, a "how it works".
 * One component, because those three were three components in the consumer and
 * nothing rendered them side by side to show they were the same drawing.
 *
 * DELIBERATELY NO STATE AXIS. `Stepper` (product.css) owns wizard state — done /
 * current / upcoming, with the ARIA that goes with it. A company timeline has no
 * state: every entry already happened. The split is by MEANING (a sequence of
 * facts vs. a position in a flow), not by looks, which is what stops the two
 * becoming two treatments of one interaction.
 *
 * An <ol> because the order carries meaning; the marker text is real content in
 * the markup, never CSS `counter()`. Generated content is not selectable and is
 * announced inconsistently — same reasoning as `FeatureGrid`'s zero-padded
 * index, which this mirrors when an item supplies no `label`.
 *
 * `linkAs` replaces the anchor ELEMENT (default `"a"`) for items that carry an
 * `href`; it receives what the raw <a> would: `href`, `className` and
 * `children`. An item without an href renders no link at all.
 */
export function Steps({ items = [], orientation = "vertical", linkAs = "a", className, ...rest }) {
  const Link = linkAs;
  return (
    <ol className={cx("lw-steps", orientation === "horizontal" && "lw-steps-horizontal", className)} {...rest}>
      {items.map((it, i) => (
        <li className="lw-step" key={i}>
          <span className="lw-step-marker">{it.label ?? String(i + 1).padStart(2, "0")}</span>
          <div>
            {it.meta && <span className="lw-step-meta">{it.meta}</span>}
            <h3 className="lw-step-title">{it.title}</h3>
            {it.body && <p className="lw-step-body">{it.body}</p>}
            {it.href && <p className="lw-step-body"><Link href={it.href}>{it.more || "Learn more"}</Link></p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
