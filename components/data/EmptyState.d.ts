import * as React from "react";

/** Note the `Omit`: this component gives `title` a richer meaning than the DOM
 *  attribute of the same name, so the inherited one has to be removed or the
 *  interface does not extend cleanly. Invisible until v1.2 — there was no
 *  tsconfig, so `tsc` had never run over these declarations. */
export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** A glyph name from the icon set — the preferred form. */
  icon?: string;
  /** Arbitrary mark, for the rare mono case. */
  glyph?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Exactly one action. Two competing actions is not an empty state. */
  action?: React.ReactNode;
}
export declare function EmptyState(props: EmptyStateProps): React.JSX.Element;