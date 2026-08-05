const cx = (...a) => a.filter(Boolean).join(" ");

/** A nav dropdown that TEACHES a taxonomy, not a menu of commands.
 *
 *  Named groups with a line of prose each, because that is what a taxonomy is: a
 *  flat list of links teaches nothing, and the reader leaves the bar knowing the
 *  same as when they arrived.
 *
 *  ── Why a native <details> ─────────────────────────────────────────────────
 *  It works with JavaScript disabled, which matters for site navigation more
 *  than almost anywhere else — a crawler and a reader whose bundle failed both
 *  need the destinations. It also keeps this component SERVER-safe: no hooks, no
 *  state, no inline handler, so it stays in the 60 modules that carry no
 *  "use client".
 *
 *  `Menu`/`Popover` were the obvious base and are disqualified: `.lw-menu` and
 *  `.lw-popover` live in product.css, so a site header built on them would
 *  strand its own dropdown CSS in the layer a marketing page is told to drop —
 *  the exact defect v1.4.0 closed for `.lw-toc`. `role="menu"` is also wrong
 *  here: APG reserves it for command menus, and site navigation is a disclosure
 *  containing links.
 *
 *  ── What the consumer owns ─────────────────────────────────────────────────
 *  Escape-to-close, and closing on a client-side route change (a SPA navigation
 *  does not unload the document, so the panel would stay open). Both are stated
 *  rather than papered over: a `useNavDismiss` hook here would force every
 *  consumer's server-rendered header to become a client component to call it.
 *
 *  The panel is `position: absolute` against this element — never `fixed`. The
 *  bar's `backdrop-filter` makes it a containing block for fixed DESCENDANTS,
 *  which is a bug this package has already shipped once.
 */
export function NavMenu({ label, groups = [], linkAs = "a", name, className, ...rest }) {
  const Link = linkAs;
  return (
    <details className={cx("lw-navmenu", className)} name={name} {...rest}>
      <summary>
        <span>{label}</span>
        <span className="lw-navmenu-chevron" aria-hidden="true" />
      </summary>
      <div className="lw-navmenu-panel">
        {groups.map((group, gi) => (
          <div className="lw-navmenu-group" key={group.id ?? gi}>
            {group.label && <span className="lw-navmenu-group-h">{group.label}</span>}
            {group.items?.map((item, ii) => (
              <Link
                key={item.id ?? ii}
                href={item.href}
                className="lw-navmenu-item"
                aria-current={item.current ? "page" : undefined}
              >
                <span className="t">
                  {item.label}
                  {item.status && <span className="lw-navmenu-status">{item.status}</span>}
                </span>
                {item.description && <span className="d">{item.description}</span>}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </details>
  );
}
