const cx = (...a) => a.filter(Boolean).join(" ");


/**
 * A standalone pull quote — a testimonial band, an article callout.
 *
 * `StoryCard` already renders a quote, and this is not a second treatment of it:
 * the two SHARE one spine declaration in marketing.css
 * (`.lw-quote, .lw-story .lw-story-quote`). StoryCard's quote is part of a
 * case-study card and only renders inside that composition, so a quote standing
 * on its own in a testimonial band cannot be expressed by it. Sharing the
 * drawing is what stops the class becoming a second treatment.
 *
 * The attribution follows StoryCard's no-fabrication rule: `name` is required
 * for the attribution line to render at all. An unattributable quote is an
 * invented one, and the component does not help you ship it.
 */
export function Quote({ children, name, role, className, ...rest }) {
  return (
    <blockquote className={cx("lw-quote", className)} {...rest}>
      {children}
      {name && (
        <cite className="lw-quote-attrib">
          <span className="name">{name}</span>{role ? " · " + role : ""}
        </cite>
      )}
    </blockquote>
  );
}
