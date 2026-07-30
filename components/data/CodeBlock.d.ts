import * as React from "react";

export interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  /** Show the copy control. Defaults to true when raw `code` is present. */
  copy?: boolean;
  code?: string;
  /** Server-highlighted HTML. Wins over `code`. */
  html?: string;
  filename?: string;
  lang?: string;
}
export declare function CodeBlock(props: CodeBlockProps): JSX.Element;