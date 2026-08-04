import * as React from "react";

export interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  /** Show the copy control. Defaults to true when raw `code` is present. */
  copy?: boolean;
  code?: string;
  /** Server-highlighted HTML. Wins over `code`. */
  html?: string;
  filename?: string;
  /* --- Display text. Every user-visible string this component renders is a
     prop, because a component library cannot hold display text (v1.3.1). --- */
  lang?: string;
  copyLabel?: string;
  copiedLabel?: string;
}
export declare function CodeBlock(props: CodeBlockProps): React.JSX.Element;