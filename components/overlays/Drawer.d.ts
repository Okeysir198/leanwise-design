import * as React from "react";

/** Note the `Omit`: this component gives `title` a richer meaning than the DOM
 *  attribute of the same name, so the inherited one has to be removed or the
 *  interface does not extend cleanly. Invisible until v1.2 — there was no
 *  tsconfig, so `tsc` had never run over these declarations.
 *  `HTMLDivElement` since v2.0.0 (was `HTMLDialogElement`): the panel is a
 *  portal-rendered `<div>`, no longer a native `<dialog>`. */
export interface DrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  open?: boolean;
  /** Esc, the close control and a backdrop click all arrive here. Controlled. */
  onClose?(): void;
  /** The raw Radix signal, both directions. `onClose` is `onOpenChange(false)`. */
  onOpenChange?(open: boolean): void;
  /**
   * Radix's focus and dismissal hooks, passed through to the panel. Each receives the
   * primitive's event; `event.preventDefault()` cancels the default. `onOpenAutoFocus`:
   * the panel is about to focus its first focusable — cancel it to put focus on a
   * search box instead. `onCloseAutoFocus`: focus is about to return to the trigger —
   * cancel it when the caller moves focus itself (a picked value, a next step).
   * `onInteractOutside` / `onEscapeKeyDown`: cancel to keep the panel open.
   */
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onInteractOutside?: (event: Event) => void;
  /** An optional opener, cloned with the trigger wiring. Must forward its ref. */
  trigger?: React.ReactElement;
  title?: React.ReactNode;
  /** The accessible name when there is no visible `title` — rendered sr-only. */
  label?: string;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  /** Which edge it enters from. `bottom` is the touch answer to a centred dialog. */
  side?: "start" | "end" | "bottom";
  /** Panel width for the side variants. A bare number means px. */
  /* --- Display text. Every user-visible string this component renders is a
     prop, because a component library cannot hold display text (v1.3.1). --- */
  width?: string | number;
  /** The close control's `aria-label` and tooltip. */
  closeLabel?: string;
}
/**
 * The side sheet — a modal that enters from an edge, on the same Radix
 * `Dialog` shell as `Dialog` (v2.0.0), so the focus trap, Esc, scroll lock and
 * background inertness are shared, and it portals into the same layer.
 */
export declare function Drawer(props: DrawerProps): React.JSX.Element;
