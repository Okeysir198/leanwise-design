import * as React from "react";

export interface RichTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /** HTML string. Written into the surface only when it differs, so the caret stays put. */
  value?: string;
  onChange?(html: string): void;
  placeholder?: string;
  /** Tool ids to keep: bold, italic, h2, ul, ol, quote, code, link, clear. */
  tools?: string[];
  /** Character budget, counted from textContent. Over-budget turns the counter red. */
  maxLength?: number;
  label?: string;
  readOnly?: boolean;
  footer?: React.ReactNode;
  /**
   * Bring your own editing surface (TipTap, ProseMirror) and keep this chrome.
   * The engine is deliberately not the design system's.
   */
  children?: React.ReactNode;
}
/**
 * Editor chrome — toolbar plus a prose surface on the type scale. The default
 * engine is `contenteditable` + `execCommand`, which is a demonstrable shim,
 * not the plan: swap the surface and the toolbar does not change.
 */
export declare function RichText(props: RichTextProps): JSX.Element;
