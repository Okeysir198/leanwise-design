import * as React from "react";

/** Note the `Omit`: this component gives `onChange` a richer meaning than the DOM
 *  attribute of the same name, so the inherited one has to be removed or the
 *  interface does not extend cleanly. Invisible until v1.2 — there was no
 *  tsconfig, so `tsc` had never run over these declarations. */
export interface RichTextProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
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
/** forwardRef since v1.2 — the ref reaches the contenteditable surface, so react-hook-form's
 *  register(), a Controller's field.ref and .focus()-on-error all work. */
export declare const RichText: React.ForwardRefExoticComponent<
  RichTextProps & React.RefAttributes<HTMLDivElement>
>;
