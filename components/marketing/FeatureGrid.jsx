import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");


/** Numbered features on a hairline grid. The brand edge draws in on hover —
 *  a measured rule, not a glow.
 *
 *  `linkAs` replaces the anchor ELEMENT (default `"a"`) for features that carry
 *  an `href` — a router's Link, so the tile navigates client-side and keeps any
 *  prefix that Link applies. It receives what the raw <a> would: `href`,
 *  `className` and `children`. A feature without an href stays a <div>. */
export function FeatureGrid({ features = [], linkAs = "a", className, ...rest }) {
  return (
    <div className={cx("lw-features", className)} {...rest}>
      {features.map((f, i) => {
        const Tag = f.href ? linkAs : "div";
        return (
          <Tag key={i} className={cx("lw-feature", f.href && "lw-feature-interactive")} href={f.href}>
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
            {f.href && <span className="lw-feature-more">{f.more || "Learn more"}<Icon name="arrow-right" size={14} className="arrow" /></span>}
          </Tag>
        );
      })}
    </div>
  );
}
