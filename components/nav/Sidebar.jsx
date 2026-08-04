const cx = (...a) => a.filter(Boolean).join(" ");


/** The product rail. `collapsed` is a state on the element, not a second
 *  class, so there is one source for the width and the label visibility.
 *
 *  Keys come from `id` or the index, never from `href`. A rail's items routinely
 *  share a placeholder href (`"#"` in every template here), and React treats
 *  duplicate keys as unsupported — children may be dropped or duplicated. An
 *  href is a destination, not an identity.
 *
 *  `linkAs` is forwarded to every `NavItem` — see below. */
export function Sidebar({ items = [], collapsed = false, footer, linkAs, className, children, ...rest }) {
  return (
    <nav className={cx("lw-sidebar", className)} data-collapsed={collapsed ? "true" : undefined} aria-label="Sections" {...rest}>
      {items.map((it, i) =>
        it.group
          ? <span key={"g" + i} className="lw-nav-group">{it.group}</span>
          : <NavItem key={it.id ?? i} linkAs={linkAs} {...it} collapsed={collapsed} />
      )}
      {children}
      {footer && <div className="lw-sidebar-foot">{footer}</div>}
    </nav>
  );
}
/** One rail row. `linkAs` replaces the anchor ELEMENT (default `"a"`) when the
 *  item has an `href` — a router's Link, so the rail navigates client-side and
 *  keeps any prefix that Link applies. It receives what the raw <a> would:
 *  `href`, `className`, `aria-current`, `title` and `children`. An item WITHOUT
 *  an href is still a <button>; `linkAs` never replaces that. */
export function NavItem({ href, label, icon, badge, current, collapsed, linkAs = "a", className, ...rest }) {
  const Tag = href ? linkAs : "button";
  // Only a string label can become a title. String(node) yields
  // "[object Object]", which is what a collapsed rail would then show on hover.
  const tip = collapsed && typeof label === "string" ? label : undefined;
  return (
    <Tag className={cx("lw-nav-item", className)} href={href} type={href ? undefined : "button"}
      aria-current={current ? "page" : undefined} title={tip} {...rest}>
      {icon && <span className="ic" aria-hidden="true">{icon}</span>}
      <span className="lw-nav-text">{label}</span>
      {badge && <span className="badge">{badge}</span>}
    </Tag>
  );
}
