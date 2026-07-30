import { Icon } from "../primitives/Icon.jsx";
import { TopBar } from "./TopBar.jsx";
import { Breadcrumbs } from "./Breadcrumbs.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * The app chrome as products actually use it: brand, breadcrumbs, an optional
 * sidebar toggle, and actions on the right. Built on `TopBar`, which owns the
 * sticky hairline bar itself.
 *
 * It exists because five templates hand-wrote this row and two of them got the
 * flex wrong — the holder claimed `flex: 1` against TopBar's own spacer, so it
 * settled narrower than its content and the breadcrumbs ellipsised with a third
 * of the row still empty. One component, one correct holder (README rule 9).
 */
export function AppBar({
  brand = "LeanWise AI", brandHref = "#", mark = true, crumbs = [],
  onMenuClick, menuExpanded, actions, className, children, ...rest
}) {
  const Brand = brandHref ? "a" : "span";
  return (
    <TopBar className={className} {...rest}>
      <div className="lw-appbar-lead">
        {onMenuClick && (
          <button type="button" className="lw-icon-btn" onClick={onMenuClick}
            aria-expanded={menuExpanded} aria-label={menuExpanded ? "Collapse navigation" : "Expand navigation"}>
            <Icon name="sidebar" size={21} />
          </button>
        )}
        <Brand className="lw-appbar-brand" href={brandHref || undefined}
          aria-label={brandHref ? (typeof brand === "string" ? brand + " — home" : "Home") : undefined}>
          {/* The mark is artwork and the name is live text — the combined lockup
              is 2775:1000, so at bar height its wordmark caps land near 6px. */}
          {mark && <span className="brand-mark" aria-hidden="true" />}
          {brand}
        </Brand>
        {crumbs.length > 0 && <Breadcrumbs items={crumbs} />}
      </div>
      {actions}{children}
    </TopBar>
  );
}
