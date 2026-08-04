"use client";
import * as React from "react";
import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

const ms = (when) => (when instanceof Date ? when.getTime() : new Date(when).getTime());
/* The absolute form, and the fallback while "now" is unknown: it depends only on
   the item, so a server render and the client's hydration agree on it. */
const stamp = (when) => new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short" }).format(ms(when));

/* Relative until it stops being useful. "3 days ago" is worse than a date the
   moment the user needs to correlate it with anything else.
   `now` still defaults to Date.now() HERE because this is a plain function the
   caller invokes imperatively; the hazard was defaulting it during render. */
/* The English defaults, exported so a consumer can wrap rather than re-derive
   the thresholds. Every user-visible word in this file reaches the DOM through
   one of these two, and both are replaceable per instance — see `formatTimeAgo`
   and `bucketLabels` on the component. */
export const RELATIVE_LABELS = { now: "just now", minutes: "m ago", hours: "h ago", days: "d ago" };
export const BUCKET_LABELS = { today: "Today", yesterday: "Yesterday", week: "This week", earlier: "Earlier" };

export function timeAgo(when, now = Date.now(), labels = RELATIVE_LABELS) {
  const t = ms(when);
  const s = Math.max(0, (now - t) / 1000);
  if (s < 60) return labels.now;
  if (s < 3600) return Math.floor(s / 60) + labels.minutes;
  if (s < 86400) return Math.floor(s / 3600) + labels.hours;
  if (s < 86400 * 3) return Math.floor(s / 86400) + labels.days;
  return stamp(when);
}

const bucketKey = (when, now) => {
  const d = new Date(when), n = new Date(now);
  const days = Math.floor((new Date(n.getFullYear(), n.getMonth(), n.getDate()) - new Date(d.getFullYear(), d.getMonth(), d.getDate())) / 86400000);
  return days <= 0 ? "today" : days === 1 ? "yesterday" : days < 7 ? "week" : "earlier";
};

/**
 * Notifications and activity, one component — they are the same list with a
 * different verb. Unread is a DOT plus weight, never a tint alone: a row that is
 * only slightly bluer than its neighbour is not a state anyone reads.
 *
 * Items are grouped by day bucket, because 40 undifferentiated rows with a
 * relative timestamp each is a list nobody scans.
 *
 * `linkAs` replaces the anchor ELEMENT (default `"a"`) for items that carry an
 * `href` — a router's Link, so a row navigates client-side and keeps any prefix
 * that Link applies. It receives what the raw <a> would: `href`, `className`,
 * the data attributes and `children`. An item without an href is unaffected.
 */
export function ActivityFeed({
  items = [], onItemClick, grouped = true, now, label = "Activity", linkAs = "a",
  bucketLabels = BUCKET_LABELS,
  formatTimeAgo = timeAgo,
  unreadLabel = "Unread",
  className, ...rest
}) {
  /* `now` is resolved in an EFFECT, not defaulted during render — the same fix
     Calendar's `today` marker got in v1.1.5, and for the same reason: Date.now()
     in the render body differs between a server render and the client's
     hydration, so every relative timestamp and every day heading was a
     mismatch waiting for the first SSR consumer. Until it lands, timestamps
     show their absolute date and the day headings are held back; both depend
     only on the item, so the server and the first client render agree. Pass
     `now` to keep the output deterministic in a test or a specimen. */
  const [mounted, setMounted] = React.useState(null);
  React.useEffect(() => { setMounted(Date.now()); }, []);
  const at = now != null ? now : mounted;

  const groups = [];
  items.forEach((it) => {
    const g = grouped && it.when && at != null ? bucketLabels[bucketKey(it.when, at)] : null;
    const last = groups[groups.length - 1];
    if (last && last.name === g) last.items.push(it);
    else groups.push({ name: g, items: [it] });
  });
  /* NOT role="feed". That role obliges aria-posinset / aria-setsize on every
     entry, managed focus, and role="article" children — none of which this
     implements, and the group headings sitting between items cannot be feed
     children at all. Claiming a role you do not honour is worse than claiming
     none. A labelled grouping of entries is role="group", the same call
     .lw-diff already makes. */
  return (
    <div className={cx("lw-feed", className)} role="group" aria-label={label} {...rest}>
      {groups.map((g, gi) => (
        /* Keyed on the index: two runs can carry the same bucket name when the
           items are not in date order, and a duplicate key is a dropped child. */
        <React.Fragment key={gi}>
          {g.name && <div className="lw-feed-group">{g.name}</div>}
          {g.items.map((it, i) => {
            const Tag = it.href ? linkAs : onItemClick || it.onClick ? "button" : "div";
            return (
              <Tag key={it.id ?? gi + "-" + i} className="lw-feed-item"
                href={it.href || undefined} type={Tag === "button" ? "button" : undefined}
                data-unread={it.unread ? "true" : undefined} data-tone={it.tone}
                onClick={Tag === "div" ? undefined : () => (it.onClick ? it.onClick(it) : onItemClick && onItemClick(it))}>
                {it.icon && <span className="lw-feed-ic"><Icon name={it.icon} size={15} /></span>}
                <span className="lw-feed-main">
                  <span className="lw-feed-title">{it.title}</span>
                  <span className="lw-feed-meta">
                    {it.when ? (at != null ? formatTimeAgo(it.when, at) : stamp(it.when)) : null}{it.meta ? (it.when ? " · " : "") + it.meta : ""}
                  </span>
                </span>
                {it.unread && <span className="lw-sr-only">{unreadLabel}</span>}
              </Tag>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}
