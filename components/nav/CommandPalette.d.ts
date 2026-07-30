import * as React from "react";

export interface Command {
  id?: string | number;
  label: string;
  /** Groups render as a heading in the list, in first-seen order. */
  group?: string;
  /** A glyph NAME from the icon set. */
  icon?: string;
  kbd?: string;
  /** Extra match terms — synonyms the label does not contain. */
  keywords?: string[];
  disabled?: boolean;
  hidden?: boolean;
  run?(command: Command): void;
}
export interface CommandPaletteProps extends React.HTMLAttributes<HTMLDialogElement> {
  open?: boolean;
  onClose?(): void;
  commands: Command[];
  onRun?(command: Command): void;
  placeholder?: string;
  emptyText?: string;
  label?: string;
}
/**
 * The command palette, on the native `<dialog>`. It does NOT bind ⌘K — a
 * component that installs a global key handler fights the host app for it and
 * cannot be turned off on the one screen where ⌘K means something else.
 */
export declare function CommandPalette(props: CommandPaletteProps): JSX.Element;
/** The subsequence scorer, exported so a caller can rank its own list the same way. */
export declare function score(query: string, text: string): number;
