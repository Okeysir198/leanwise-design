import * as React from "react";

/** Note the `Omit`: this component gives `title` a richer meaning than the DOM
 *  attribute of the same name, so the inherited one has to be removed or the
 *  interface does not extend cleanly. Invisible until v1.2 — there was no
 *  tsconfig, so `tsc` had never run over these declarations. */
export interface ArtifactProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  /** 1-based. Omit to hide the version control entirely. */
  version?: number;
  versionCount?: number;
  onPrevVersion?(): void;
  onNextVersion?(): void;
  onRevert?(): void;
  /**
   * The manual equivalent. Not optional decoration — an AI surface is never the
   * only path to an outcome, and this is where that rule is enforced.
   */
  onEdit?(): void;
  /* --- Display text. Every user-visible string this component renders is a
     prop, because a component library cannot hold display text (v1.3.1). --- */
  actions?: React.ReactNode;
  prevVersionLabel?: string;
  nextVersionLabel?: string;
  editLabel?: React.ReactNode;
  revertLabel?: React.ReactNode;
}
/** The versioned side surface for generated output. */
export declare function Artifact(props: ArtifactProps): React.JSX.Element;
