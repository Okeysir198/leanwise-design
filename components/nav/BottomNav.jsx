"use client";
import * as React from "react";
import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * The touch answer to `Sidebar`. Three to five DESTINATIONS, never actions — a
 * tab bar that mixes "Home" with "New" teaches nobody where they are, and the
 * one thing a tab bar has to communicate is location.
 *
 * It reserves the home indicator with `--lw-safe-bottom` rather than a magic
 * 34px: the inset is 0 on a device without one, so the same rule is right
 * everywhere. The 44px target comes from the bar height, not from padding.
 *
 * `linkAs` replaces the anchor ELEMENT (default `"a"`) for items that carry an
 * `href` — a router's Link, so a destination navigates client-side rather than
 * reloading. It receives what the raw <a> would: `href`, `aria-current` and
 * `children`. An item without an href stays a <button>.
 */
export function BottomNav({
  items = [], value, onChange, label = "Main", linkAs = "a",
  formatBadgeLabel = (n) => n + " unread",
  className, ...rest
}) {
  // An effect, not the render body: a console.warn during render is a side
  // effect, and StrictMode double-invokes render.
  React.useEffect(() => {
    if (items.length <= 5 || typeof console === "undefined") return;
    console.warn("BottomNav: " + items.length + " items. Past five, labels truncate and the bar stops being scannable — use a sidebar or a More destination.");
  }, [items.length]);
  return (
    <nav className={cx("lw-bottom-nav", className)} aria-label={label} {...rest}>
      {items.map((it) => {
        const on = it.value === value;
        const Tag = it.href ? linkAs : "button";
        return (
          <Tag key={it.value} href={it.href || undefined} type={it.href ? undefined : "button"}
            aria-current={on ? "page" : undefined}
            onClick={it.href ? undefined : () => onChange && onChange(it.value)}>
            <Icon name={it.icon} size={21} />
            <span className="lw-bn-label">{it.label}</span>
            {it.badge != null && <span className="lw-sr-only">{formatBadgeLabel(it.badge)}</span>}
          </Tag>
        );
      })}
    </nav>
  );
}
