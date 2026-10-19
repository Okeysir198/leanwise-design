const cx = (...a) => a.filter(Boolean).join(" ");


/** The inset emphasis surface — the deepest neutral tier as a container.
 *
 *  A card that must carry more weight than the cards beside it has `tone`
 *  (judgement). A passage that must read as ONE thought, set apart from the
 *  page without becoming a dark band, is a Panel: the inset tier recesses the
 *  ground behind its content, so the content separates harder against it —
 *  emphasis by ground, not by tint, border weight or elevation. It carries no
 *  shadow for exactly that reason: an inset surface that lifted would be
 *  saying two opposite things about where it sits.
 *
 *  No props beyond `as`: one role. Compose the interior with Stack/Cluster;
 *  the panel owns the surface, the padding and the rhythm (32px / 16px), the
 *  way Card owns 20px / 12px, so panels line up across consumers.
 */
export function Panel({ as: Tag = "div", className, children, ...rest }) {
  return <Tag className={cx("lw-panel", className)} {...rest}>{children}</Tag>;
}
