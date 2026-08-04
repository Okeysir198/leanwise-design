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
export interface SourceListProps extends React.HTMLAttributes<HTMLDivElement> {
  sources?: Source[];
  /**
   * Replaces the anchor ELEMENT for sources that carry an `href`. Default
   * `"a"`. Pass a router's Link so an in-app document route navigates
   * client-side and keeps any path prefix that Link applies. It receives what
   * the raw `<a>` would: `href`, `className`, `onClick` and `children`. A
   * source with no href is a `<button>` and is never replaced.
   */
  linkAs?: React.ElementType;
}
export declare function SourceList(props: SourceListProps): React.JSX.Element;
