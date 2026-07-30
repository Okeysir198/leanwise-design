import { Icon } from "../primitives/Icon.jsx";

const cx = (...a) => a.filter(Boolean).join(" ");


/** The screen a product is judged by, and the one that gets left as "No data".
 *  Title, one line of why, one action.
 *
 *  `icon` names a glyph from the set — the same drawing an empty table's toolbar
 *  uses, so the empty state looks like the feature rather than like a gap.
 *  `glyph` still takes arbitrary content for the rare mono mark. */
export function EmptyState({ icon, glyph, title, description, action, className, children, ...rest }) {
  return (
    <div className={cx("lw-empty", className)} {...rest}>
      {(icon || glyph) && (
        <span className="glyph" aria-hidden="true">
          {icon ? <Icon name={icon} size={22} /> : glyph}
        </span>
      )}
      <span className="t">{title}</span>
      {description && <span className="s">{description}</span>}
      {action || children}
    </div>
  );
}
