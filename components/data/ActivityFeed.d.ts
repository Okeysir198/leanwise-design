import * as React from "react";

export interface ActivityItem {
  id?: string | number;
  title: React.ReactNode;
  /** Date, timestamp or ISO string. Drives both the label and the day grouping. */
  when?: Date | number | string;
  meta?: React.ReactNode;
  /** A glyph NAME from the icon set. */
  icon?: string;
  tone?: "ok" | "warn" | "err";
  unread?: boolean;
  href?: string;
  onClick?(item: ActivityItem): void;
}
export interface ActivityFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ActivityItem[];
  onItemClick?(item: ActivityItem): void;
  /** Group into Today / Yesterday / This week / Earlier. Default true. */
  grouped?: boolean;
  /**
   * Inject "now" so the output is deterministic in a test or a specimen.
   * Left unset it is resolved on MOUNT, not during render — `Date.now()` in the
   * render body is a hydration mismatch. Until it lands, timestamps show their
   * absolute date and the day headings are held back.
   */
  now?: number;
  label?: string;
  /**
   * Replaces the anchor ELEMENT for items that carry an `href`. Default `"a"`.
   * Pass a router's Link so a row navigates client-side and keeps any path
   * prefix that Link applies. It receives what the raw `<a>` would: `href`,
   * `className`, the `data-*` state attributes and `children`. An item without
   * an href is unaffected.
   */
  /* --- Display text. Every user-visible string this component renders is a
     prop, because a component library cannot hold display text (v1.3.1). --- */
  linkAs?: React.ElementType;
  /** The day headings. Keyed, not positional, so a partial set is impossible. */
  bucketLabels?: Record<"today" | "yesterday" | "week" | "earlier", React.ReactNode>;
  /** Replaces the whole relative-time string. Receives the item's `when` and "now". */
  formatTimeAgo?(when: Date | number | string, now: number): React.ReactNode;
  unreadLabel?: React.ReactNode;
}
/** Notifications and activity — the same list with a different verb. */
export declare function ActivityFeed(props: ActivityFeedProps): React.JSX.Element;
/** "3h ago", falling back to a date once relative stops being useful. */
export declare function timeAgo(when: Date | number | string, now?: number, labels?: typeof RELATIVE_LABELS): string;
/** The English defaults for the relative-time and day-bucket strings. Module
 *  exports rather than barrel exports — the same treatment `RANGE_PRESETS`
 *  gets — so they are reachable for a wrapper without growing the public API. */
export declare const RELATIVE_LABELS: { now: string; minutes: string; hours: string; days: string };
export declare const BUCKET_LABELS: Record<"today" | "yesterday" | "week" | "earlier", string>;
