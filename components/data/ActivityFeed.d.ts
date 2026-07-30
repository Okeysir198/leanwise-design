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
}
/** Notifications and activity — the same list with a different verb. */
export declare function ActivityFeed(props: ActivityFeedProps): JSX.Element;
/** "3h ago", falling back to a date once relative stops being useful. */
export declare function timeAgo(when: Date | number | string, now?: number): string;
