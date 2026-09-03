import * as React from "react";

/** Note the `Omit`: this component gives `title` a richer meaning than the DOM
 *  attribute of the same name, so the inherited one has to be removed or the
 *  interface does not extend cleanly. Invisible until v1.2 — there was no
 *  tsconfig, so `tsc` had never run over these declarations.
 *  `HTMLDivElement` since v2.0.0: the panel is a portal-rendered `<div>`
 *  (Radix `Dialog.Content`), no longer a native `<dialog>`. */
export interface DialogProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  open?: boolean;
  /**
   * Every way the dialog asks to close — Esc, the close control, a click on
   * the backdrop — arrives here. Controlled: the dialog closes only when the
   * caller flips `open`, so an in-flight save can hand a no-op and stay up.
   */
  onClose?: () => void;
  /** The raw Radix signal, both directions. `onClose` is `onOpenChange(false)`. */
  onOpenChange?: (open: boolean) => void;
  /**
   * An optional opener, cloned with the trigger wiring (`aria-haspopup`,
   * `aria-expanded`, `aria-controls`, the click). Must forward its ref —
   * every system Button does. Leave it out and drive `open` yourself.
   */
  trigger?: React.ReactElement;
  title?: React.ReactNode;
  /**
   * The accessible name when there is no visible `title` — rendered sr-only.
   * A dialog needs a name: without either, Radix logs an error in development
   * and the a11y gate fails `aria-dialog-name`.
   */
  label?: string;
  description?: React.ReactNode;
  /** Actions. Confirm last, on the right — the platform convention. */
  footer?: React.ReactNode;
  /* --- Display text. Every user-visible string this component renders is a
     prop, because a component library cannot hold display text (v1.3.1). --- */
  width?: string | number;
  /** The close control's `aria-label` and tooltip. */
  closeLabel?: string;
}
/**
 * The modal dialog. Radix `Dialog` since v2.0.0: focus trap, Esc, outside-click
 * dismissal, scroll lock and background `aria-hidden` are its; the panel
 * portals into the nearest `OverlayProvider` root (or `document.body`) inside
 * an `.lw-layer-modal` that mirrors the opener's theme scope.
 *
 * Deltas from the native `<dialog>` it replaces: a backdrop click now closes;
 * the page scroll is locked while open; and there is no browser top layer —
 * a consumer element with `z-index` above `--lw-z-modal` can cover a modal.
 */
export declare function Dialog(props: DialogProps): React.JSX.Element;
