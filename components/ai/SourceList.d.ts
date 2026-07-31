import * as React from "react";

export interface Source {
  id?: string | number;
  n?: number | string;
  title: React.ReactNode;
  meta?: React.ReactNode;
  /** Omit for a source with no target — the entry then renders as a button, not
   *  an anchor without an href, which is unreachable by keyboard. */
  href?: string;
  onClick?: React.MouseEventHandler;
}
export interface SourceListProps extends React.HTMLAttributes<HTMLDivElement> { sources?: Source[] }
export declare function SourceList(props: SourceListProps): React.JSX.Element;
