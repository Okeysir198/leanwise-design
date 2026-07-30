import * as React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  name?: string;
  src?: string;
  size?: "sm" | "md" | "lg";
}
/**
 * Initials by default, an image only when there is one. `name` is required for the
 * initials AND for the accessible label, so an avatar can never be a coloured circle
 * that says nothing to a screen reader. Two initials maximum — three stops being
 * legible at `sm`, which is the size a table row uses.
 */
export declare function Avatar(props: AvatarProps): JSX.Element;