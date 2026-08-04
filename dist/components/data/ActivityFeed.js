"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const ms = (when) => when instanceof Date ? when.getTime() : new Date(when).getTime();
const stamp = (when) => new Intl.DateTimeFormat(void 0, { day: "numeric", month: "short" }).format(ms(when));
function timeAgo(when, now = Date.now()) {
  const t = ms(when);
  const s = Math.max(0, (now - t) / 1e3);
  if (s < 60) return "just now";
  if (s < 3600) return Math.floor(s / 60) + "m ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago";
  if (s < 86400 * 3) return Math.floor(s / 86400) + "d ago";
  return stamp(when);
}
const bucket = (when, now) => {
  const d = new Date(when), n = new Date(now);
  const days = Math.floor((new Date(n.getFullYear(), n.getMonth(), n.getDate()) - new Date(d.getFullYear(), d.getMonth(), d.getDate())) / 864e5);
  return days <= 0 ? "Today" : days === 1 ? "Yesterday" : days < 7 ? "This week" : "Earlier";
};
function ActivityFeed({ items = [], onItemClick, grouped = true, now, label = "Activity", linkAs = "a", className, ...rest }) {
  const [mounted, setMounted] = React.useState(null);
  React.useEffect(() => {
    setMounted(Date.now());
  }, []);
  const at = now != null ? now : mounted;
  const groups = [];
  items.forEach((it) => {
    const g = grouped && it.when && at != null ? bucket(it.when, at) : null;
    const last = groups[groups.length - 1];
    if (last && last.name === g) last.items.push(it);
    else groups.push({ name: g, items: [it] });
  });
  return /* @__PURE__ */ jsx("div", { className: cx("lw-feed", className), role: "group", "aria-label": label, ...rest, children: groups.map((g, gi) => (
    /* Keyed on the index: two runs can carry the same bucket name when the
       items are not in date order, and a duplicate key is a dropped child. */
    /* @__PURE__ */ jsxs(React.Fragment, { children: [
      g.name && /* @__PURE__ */ jsx("div", { className: "lw-feed-group", children: g.name }),
      g.items.map((it, i) => {
        const Tag = it.href ? linkAs : onItemClick || it.onClick ? "button" : "div";
        return /* @__PURE__ */ jsxs(
          Tag,
          {
            className: "lw-feed-item",
            href: it.href || void 0,
            type: Tag === "button" ? "button" : void 0,
            "data-unread": it.unread ? "true" : void 0,
            "data-tone": it.tone,
            onClick: Tag === "div" ? void 0 : () => it.onClick ? it.onClick(it) : onItemClick && onItemClick(it),
            children: [
              it.icon && /* @__PURE__ */ jsx("span", { className: "lw-feed-ic", children: /* @__PURE__ */ jsx(Icon, { name: it.icon, size: 15 }) }),
              /* @__PURE__ */ jsxs("span", { className: "lw-feed-main", children: [
                /* @__PURE__ */ jsx("span", { className: "lw-feed-title", children: it.title }),
                /* @__PURE__ */ jsxs("span", { className: "lw-feed-meta", children: [
                  it.when ? at != null ? timeAgo(it.when, at) : stamp(it.when) : null,
                  it.meta ? (it.when ? " \xB7 " : "") + it.meta : ""
                ] })
              ] }),
              it.unread && /* @__PURE__ */ jsx("span", { className: "lw-sr-only", children: "Unread" })
            ]
          },
          it.id ?? gi + "-" + i
        );
      })
    ] }, gi)
  )) });
}
export {
  ActivityFeed,
  timeAgo
};
