import * as React from "react";

export interface ArtifactProps extends React.HTMLAttributes<HTMLDivElement> {
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
  actions?: React.ReactNode;
}
/** The versioned side surface for generated output. */
export declare function Artifact(props: ArtifactProps): JSX.Element;
