import * as React from "react";

/** GENERATED from Icon.jsx by `npm run dts` — do not hand-edit.
 *  It was hand-maintained until v1.2 and had drifted to 46 of the 78 real glyphs,
 *  so passing a name the component renders perfectly well ("sidebar", "filter",
 *  "send", "copy", …) was a type error. Nothing caught it: the barrel generator
 *  never looked at this union, and there was no tsconfig, so tsc never ran. */
export type IconName =
  | "sidebar" | "sidebar-right" | "plus" | "paperclip" | "filter" | "send"
  | "book" | "quote" | "list" | "close" | "copy" | "retry"
  | "download" | "spark" | "layers" | "check" | "users" | "settings"
  | "clock" | "search" | "key" | "database" | "shield" | "code"
  | "webhook" | "alert" | "rocket" | "chevron-down" | "sun" | "moon"
  | "monitor" | "edit" | "chevron-left" | "chevron-right" | "chevron-up" | "user"
  | "arrow-up" | "arrow-down" | "arrow-right" | "arrow-left" | "trash" | "external"
  | "info" | "more" | "file" | "chart" | "calendar" | "upload"
  | "pin" | "grip" | "columns" | "checkmark" | "minus" | "x-circle"
  | "more-vertical" | "chevrons-up-down" | "sort-asc" | "sort-desc" | "eye" | "eye-off"
  | "lock" | "mail" | "link" | "image" | "folder" | "star"
  | "bell" | "inbox" | "play" | "pause" | "mic" | "mic-off"
  | "thumbs-up" | "thumbs-down" | "maximize" | "minimize" | "undo" | "help";

export interface IconProps extends Omit<React.SVGAttributes<SVGSVGElement>, "children"> {
  name: IconName;
  /** Px, because icons align to text rather than to the space scale. */
  size?: number;
  strokeWidth?: number;
  /** Names the icon for assistive tech. Only when the icon is the sole content
   *  of a control — otherwise it stays decorative (`aria-hidden`). */
  label?: string;
}
export declare function Icon(props: IconProps): React.JSX.Element | null;
/** Every glyph name, in declaration order. `IconNames` is the capitalised alias
 *  that reaches `window.<Namespace>` in the browser bundle.
 *  This was declared TWICE — a duplicate that only a `tsc` run can see, and there
 *  was no tsconfig in this package until v1.2. */
export declare const iconNames: IconName[];
export declare const IconNames: IconName[];
