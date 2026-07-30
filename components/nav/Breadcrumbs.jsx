const cx = (...a) => a.filter(Boolean).join(" ");


/**
 * Mono, so it reads as a path rather than as prose.
 *
 * A Fragment, not a wrapper span: the wrapper carried `display:contents`, which
 * makes it the element `.lw-crumbs > *` matches while contributing no box — so
 * the nowrap/ellipsis rule landed on nothing and the last crumb was clipped
 * mid-word instead of truncating. The separators and labels must be the flex
 * items themselves.
 */
export function Breadcrumbs({ items = [], className, ...rest }) {
  return (
    <nav className={cx("lw-crumbs", className)} aria-label="Breadcrumb" {...rest}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="sep" aria-hidden="true">/</span>}
          {it.href && i < items.length - 1
            ? <a href={it.href}>{it.label}</a>
            : <span aria-current="page">{it.label}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}
