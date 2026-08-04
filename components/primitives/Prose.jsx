const cx = (...a) => a.filter(Boolean).join(" ");

/** The read surface for HTML this system did not author — a markdown post, a
 *  docs page, a release note, whatever the consumer's sanitizer let through.
 *
 *  It carries no markup of its own on purpose: `.lw-prose` styles DESCENDANTS,
 *  so the component's whole job is to put one class on one wrapper. That is
 *  what lets it take `dangerouslySetInnerHTML` — the common case — without the
 *  styling having to know which elements the author used.
 *
 *  `measure` is the reading width. "prose" is 68ch; "narrow" is 46ch, the same
 *  value as `.lw-measure-sm`, for a column beside a rail. A consumer that needs
 *  a third width sets `--lw-prose-max` rather than overriding a rule.
 *
 *  Server-safe: no state, no effect, no browser global.
 */
export function Prose({ measure = "prose", as: Tag = "div", className, children, ...rest }) {
  const cls = cx("lw-prose", measure === "narrow" && "lw-prose-narrow", className);
  // Never both. React throws when `children` and `dangerouslySetInnerHTML` are
  // set together, and passing `children` as an explicit (undefined) expression
  // is close enough to that trap to be worth the branch rather than the comment.
  if (rest.dangerouslySetInnerHTML) return <Tag className={cls} {...rest} />;
  return <Tag className={cls} {...rest}>{children}</Tag>;
}
