import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");


/**
 * The site footer. Named `SiteFooter`, NOT `Footer`: `CardFoot` already exists,
 * the browser bundle's namespace is flat, and `tools/lw-bundle.mjs` treats two
 * non-barrel modules exporting one uppercase name as a hard error — nothing
 * there can pick a winner.
 *
 * `dark` sets `data-band="dark"` and NOTHING else. It does not paint a navy
 * tier: the band attribute re-points every role token on the element, so
 * `--lw-brand-text` becomes brand-400, the inks become the dark tiers and the
 * hairlines follow. The consumer this replaces hard-coded `--lw-navy-900` and
 * then restated five child inks on top of it — and the one it got wrong was the
 * mono column heading, brand-500 at 11px on navy, which failed AA on every page
 * in both locales. Nothing here needs a dark variant.
 *
 * `linkAs` replaces the anchor ELEMENT (default `"a"`) for every column link — a
 * router's Link, so an in-app destination navigates client-side and keeps
 * whatever path prefix that Link applies. It receives exactly what the raw <a>
 * would: `href`, `className`, `children` and `aria-current`. The consumer that
 * asked for it is a bilingual router app, where a raw <a> drops the locale
 * prefix and walks a Vietnamese reader back onto the English site.
 *
 * A column entry with no `href` is a NOTE, not a link — an inert label (a date,
 * a "coming soon") rendered as a <span>, with no pointer and no tab stop. An
 * `external` entry opens in a new tab and says so with a named icon rather than
 * a typed `↗`.
 */
export function SiteFooter({ brand, desc, columns = [], legal, bottom, dark = false, linkAs = "a", className, children, ...rest }) {
  const Link = linkAs;
  return (
    <footer className={cx("lw-footer", className)} data-band={dark ? "dark" : undefined} {...rest}>
      <div className="lw-container">
        <div className="lw-footer-grid">
          <div className="lw-footer-brand">
            {brand}
            {desc && <p className="lw-footer-desc">{desc}</p>}
          </div>
          {columns.map((col, i) => (
            /* Keyed by index, not heading: two columns may legitimately share a
               heading (or have none), and React treats duplicate keys as
               unsupported. Same reasoning as TopBar and Sidebar. */
            <nav key={i} aria-label={typeof col.heading === "string" ? col.heading : undefined}>
              {col.heading && <h2 className="lw-footer-head">{col.heading}</h2>}
              {(col.links || []).map((l, j) =>
                l.href
                  ? (
                    <Link
                      key={j}
                      className="lw-footer-link"
                      href={l.href}
                      aria-current={l.current ? "page" : undefined}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noreferrer noopener" : undefined}
                    >
                      {l.label}
                      {l.external && <Icon name="external" size={12} />}
                    </Link>
                  )
                  : <span key={j} className="lw-footer-note">{l.label}</span>
              )}
            </nav>
          ))}
        </div>
        {(legal || bottom || children) && (
          <div className="lw-footer-bottom">
            {/* `.lw-measure` caps the disclaimer at a readable line length; the
                bottom row's own mono/xs/subtle face is already the right one for
                small print, so the paragraph carries no class of its own. */}
            {legal && <p className="lw-measure">{legal}</p>}
            {bottom}
            {children}
          </div>
        )}
      </div>
    </footer>
  );
}
