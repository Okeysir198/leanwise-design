import * as React from "react";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** A glyph name from the icon set — the preferred form. */
  icon?: string;
  /** Arbitrary mark, for the rare mono case. */
  glyph?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Exactly one action. Two competing actions is not an empty state. */
  action?: React.ReactNode;
}
export declare function EmptyState(props: EmptyStateProps): JSX.Element;