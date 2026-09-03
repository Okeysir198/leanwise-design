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
/** @deprecated Unused by any consumer as of v2.0; candidate for removal in v3.0 — say so in an issue if you adopt it. */
export declare function CodeBlock(props: CodeBlockProps): React.JSX.Element;