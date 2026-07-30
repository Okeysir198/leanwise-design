import * as React from "react";

export type IconName =
  | "sidebar" | "sidebar-right" | "plus" | "paperclip" | "filter" | "send"
  | "book" | "quote" | "list" | "close" | "copy" | "retry" | "download" | "spark" | "layers"
  | "check" | "users" | "settings" | "clock" | "edit"
  | "search" | "key" | "database" | "shield" | "code" | "webhook" | "alert" | "rocket"
  | "sun" | "moon" | "monitor"
  | "chevron-left" | "chevron-right" | "chevron-down" | "chevron-up"
  | "user" | "arrow-up" | "arrow-down" | "arrow-right" | "arrow-left"
  | "trash" | "external" | "info" | "more" | "file" | "chart";

export interface IconProps extends Omit<React.SVGAttributes<SVGSVGElement>, "children"> {
  name: IconName;
  /** Px, because icons align to text rather than to the space scale. */
  size?: number;
  strokeWidth?: number;
  /** Names the icon for assistive tech. Only when the icon is the sole content
   *  of a control — otherwise it stays decorative (`aria-hidden`). */
  label?: string;
}
export declare function Icon(props: IconProps): JSX.Element | null;
export declare const iconNames: IconName[];

export declare const iconNames: IconName[];
export declare const IconNames: IconName[];
