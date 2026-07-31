"use client";
import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * The applied-filter row. Filters are shown as REMOVABLE chips, never only as
 * state inside a panel the user has to reopen to read — a filter you cannot see
 * is a filter you forget you set, and then the empty result looks like a broken
 * product rather than a narrow query.
 *
 * `clear all` appears from two filters up: with one, removing it IS clear all.
 */
export function FilterBar({ filters = [], onRemove, onClear, className, children, ...rest }) {
  if (!filters.length && !children) return null;
  return (
    <div className={cx("lw-filters", className)} role="group" aria-label="Applied filters" {...rest}>
      {children}
      {filters.map((f) => (
        <span key={f.id ?? f.key + ":" + f.value} className="lw-filter-chip">
          {f.key && <span className="k">{f.key}</span>}
          <span>{f.label ?? f.value}</span>
          <button type="button" aria-label={"Remove filter " + (f.key ? f.key + " " : "") + (f.label ?? f.value)}
            onClick={() => onRemove && onRemove(f)}>
            <Icon name="close" size={11} />
          </button>
        </span>
      ))}
      {filters.length > 1 && onClear && (
        <button type="button" className="lw-filter-clear" onClick={onClear}>Clear all</button>
      )}
    </div>
  );
}

/** The row above a list: search, filters, actions. A flex row with a growing
 *  slot — it owns the rhythm so five screens do not each invent their own. */
export function Toolbar({ className, children, ...rest }) {
  return <div className={cx("lw-toolbar", className)} {...rest}>{children}</div>;
}
