import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

/* Relative until it stops being useful. "3 days ago" is worse than a date the
   moment the user needs to correlate it with anything else. */
export function timeAgo(when, now = Date.now()) {
  const t = when instanceof Date ? when.getTime() : new Date(when).getTime();
  const s = Math.max(0, (now - t) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return Math.floor(s / 60) + "m ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago";
  if (s < 86400 * 3) return Math.floor(s / 86400) + "d ago";
  return new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short" }).format(t);
}

const bucket = (when, now) => {
  const d = new Date(when), n = new Date(now);
  const days = Math.floor((new Date(n.getFullYear(), n.getMonth(), n.getDate()) - new Date(d.getFullYear(), d.getMonth(), d.getDate())) / 86400000);
  return days <= 0 ? "Today" : days === 1 ? "Yesterday" : days < 7 ? "This week" : "Earlier";
};

/**
 * Notifications and activity, one component — they are the same list with a
 * different verb. Unread is a DOT plus weight, never a tint alone: a row that is
 * only slightly bluer than its neighbour is not a state anyone reads.
 *
 * Items are grouped by day bucket, because 40 undifferentiated rows with a
 * relative timestamp each is a list nobody scans.
 */
export function ActivityFeed({ items = [], onItemClick, grouped = true, now = Date.now(), label = "Activity", className, ...rest }) {
  const groups = [];
  items.forEach((it) => {
    const g = grouped && it.when ? bucket(it.when, now) : null;
    const last = groups[groups.length - 1];
    if (last && last.name === g) last.items.push(it);
    else groups.push({ name: g, items: [it] });
  });
  return (
    <div className={cx("lw-feed", className)} role="feed" aria-label={label} {...rest}>
      {groups.map((g, gi) => (
        <React.Fragment key={g.name ?? gi}>
          {g.name && <div className="lw-feed-group">{g.name}</div>}
          {g.items.map((it, i) => {
            const Tag = it.href ? "a" : onItemClick || it.onClick ? "button" : "div";
            return (
              <Tag key={it.id ?? gi + "-" + i} className="lw-feed-item"
                href={it.href || undefined} type={Tag === "button" ? "button" : undefined}
                data-unread={it.unread ? "true" : undefined} data-tone={it.tone}
                onClick={Tag === "div" ? undefined : () => (it.onClick ? it.onClick(it) : onItemClick && onItemClick(it))}>
                {it.icon && <span className="lw-feed-ic"><Icon name={it.icon} size={15} /></span>}
                <span className="lw-feed-main">
                  <span className="lw-feed-title">{it.title}</span>
                  <span className="lw-feed-meta">
                    {it.when ? timeAgo(it.when, now) : null}{it.meta ? (it.when ? " · " : "") + it.meta : ""}
                  </span>
                </span>
                {it.unread && <span className="lw-sr-only">Unread</span>}
              </Tag>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}
