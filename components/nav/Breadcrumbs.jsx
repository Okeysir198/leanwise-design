import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");


/**
 * Mono, so it reads as a path rather than as prose.
 *
 * A Fragment, not a wrapper span: the wrapper carried `display:contents`, which
 * makes it the element `.lw-crumbs > *` matches while contributing no box — so
 * the nowrap/ellipsis rule landed on nothing and the last crumb was clipped
 * mid-word instead of truncating. The separators and labels must be the flex
 * items themselves.
 *
 * `linkAs` replaces the anchor ELEMENT (default `"a"`) — pass a router's Link and
 * a crumb navigates client-side, carrying whatever prefix that Link applies.
 * It receives what the raw <a> would: `href` and `children`.
 */
export function Breadcrumbs({ items = [], linkAs = "a", className, ...rest }) {
  const Link = linkAs;
  return (
    <nav className={cx("lw-crumbs", className)} aria-label="Breadcrumb" {...rest}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="sep" aria-hidden="true">/</span>}
          {/* Only the LAST crumb is the current page. The condition used to be
              "has no href", so a non-linked intermediate crumb — an ancestor the
              user cannot navigate to — announced itself as current too. */}
          {it.href && i < items.length - 1
            ? <Link href={it.href}>{it.label}</Link>
            : <span aria-current={i === items.length - 1 ? "page" : undefined}>{it.label}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}
