import * as React from "react";

/** Note the `Omit`: `role` here is the author's job title, not the ARIA attribute
 *  of the same name, so the inherited one has to go or the interface does not
 *  extend cleanly. Same shape as `StoryCardProps`. */
export interface BylineProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  name?: React.ReactNode;
  role?: React.ReactNode;
  /** The human-readable date. */
  date?: React.ReactNode;
  /** The machine-readable ISO date for the `<time>` element. */
  dateTime?: string;
  /** A real photo. Omitted, the `Avatar` shows initials — never a generated face. */
  src?: string;
  size?: "sm" | "md" | "lg";
}
/** Author, role and date, on the existing `Avatar`. */
export declare function Byline(props: BylineProps): React.JSX.Element;
