const cx = (...a) => a.filter(Boolean).join(" ");


/** App chrome. Sticky, hairline, never a shadow: a shadow under a 1px bar reads
 *  as a rendering bug on a light ground.
 *
 *  `logo` sets the MARK beside `brand` as live text, rather than dropping in the
 *  combined lockup artwork. The lockup is 2775:1000, so at bar height its
 *  wordmark caps land near 6px — illegible at any bar size worth having. The
 *  mark is a background image (per-ground artwork; its navy end vanishes on a
 *  dark bar) and the name stays real text, so it sets in the DS font at the DS
 *  size and remains editable.
 *
 *  `brandHref` makes the lockup a real <a> — the mark and the name are one link,
 *  not two, so there is a single tab stop and no dead gap between them.
 *
 *  `linkAs` replaces the anchor ELEMENT for the brand and every nav link — a
 *  router's Link, so an in-app destination navigates client-side instead of
 *  reloading the document (and, in a localised app, keeps its path prefix). It
 *  receives exactly what the raw <a> would: `href`, `className`, `children` and
 *  `aria-current`. Default `"a"`, which is the unchanged behaviour.
 */
export function TopBar({ brand, brandHref, logo = false, links = [], actions, linkAs = "a", className, children, ...rest }) {
  const Link = linkAs;
  const Brand = brandHref ? linkAs : "span";
  const brandProps = brandHref ? { href: brandHref, "aria-label": typeof brand === "string" ? brand + " — home" : "Home" } : {};
  return (
    <header className={cx("lw-topbar", className)} {...rest}>
      {logo
        ? <Brand className="brand" {...brandProps}><span className="brand-mark" aria-hidden="true" />{brand}</Brand>
        : brand && <Brand className="brand" {...brandProps}>{brand}</Brand>}
      {links.length > 0 && (
        <nav aria-label="Primary">
          {/* Keyed by index, not href: nav links routinely share a placeholder
             destination, and React treats duplicate keys as unsupported. Same
             reasoning as Sidebar — an href is a destination, not an identity. */}
          {links.map((l, i) => <Link key={l.id ?? i} href={l.href} aria-current={l.current ? "page" : undefined}>{l.label}</Link>)}
        </nav>
      )}
      <span className="spacer" />
      {actions}{children}
    </header>
  );
}
