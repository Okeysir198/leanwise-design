const cx = (...a) => a.filter(Boolean).join(" ");


/**
 * A customer outcome. `.lw-story` is a two-column grid — a 64px mark tile and a
 * body column — so the body must be ONE child, not four siblings, or the fields
 * alternate across the columns.
 *
 * The quote renders ONLY when quote, person and role are all present — the
 * no-fabrication rule, enforced at runtime rather than in a doc nobody reads.
 * A half-filled testimonial is an invented one.
 */
export function StoryCard({ logo, title, body, result, quote, person, role, href, className, ...rest }) {
  const Tag = href ? "a" : "div";
  const showQuote = Boolean(quote && person && role);
  const initials = String(title || "")
    .trim().split(/\s+/).slice(0, 2).map(w => w[0] || "").join("").toUpperCase();
  return (
    <Tag className={cx("lw-story", href && "lw-story-interactive", className)} href={href} {...rest}>
      {logo ? <span className="logo">{logo}</span> : <span className="logo lw-monogram">{initials}</span>}
      <div>
        {title && <h3>{title}</h3>}
        {body && <p>{body}</p>}
        {showQuote && (
          <blockquote className="lw-story-quote">
            {quote}
            <cite>{person} · {role}</cite>
          </blockquote>
        )}
        {result && <div className="meta"><span className="lw-story-result"><b>{result}</b></span></div>}
      </div>
    </Tag>
  );
}
