"use client";
import * as React from "react";
import { Icon } from "../primitives/Icon.jsx";

const cx = (...a) => a.filter(Boolean).join(" ");

/** The narrow-bar navigation for `TopBar` — a button and the panel it opens.
 *
 *  Below `--lw-bp-md` the bar's own `nav` is hidden, on the stated grounds that
 *  "the app supplies its own narrow-bar nav". Every consumer then supplied one.
 *  This is that one.
 *
 *  It is deliberately NOT `Drawer`, and the difference is real rather than a
 *  naming preference. `Drawer` is a modal `<dialog>` in the TOP LAYER: it makes
 *  the page inert, so it owns a focus trap, a scrim and a return-focus
 *  contract. A nav disclosure hangs under the bar, leaves the page visible and
 *  interactive, and needs none of that. Two interactions, two components —
 *  README rule 9 is about one interaction with two treatments.
 *
 *  RENDER IT AS A CHILD OF `TopBar`. Both elements are siblings inside the
 *  `<header>`, which is `position: sticky` and therefore already the panel's
 *  containing block, so the panel's `inset-block-start: 100%` is the underside
 *  of the bar. This is the one arrangement that avoids the trap the consumer's
 *  hand-rolled version shipped on: `.lw-topbar` carries `backdrop-filter`,
 *  which makes it a containing block for `position: fixed` DESCENDANTS too, so
 *  a *fixed* overlay nested in the header resolves `inset: 0` against the 56px
 *  bar instead of the viewport. Absolute under sticky has no such failure — but
 *  anything reworked to `fixed` has to become a sibling of the `<header>`.
 *
 *  Pass the links as children, in their own `<nav>` with a label that is not
 *  the bar's "Primary" — two nav landmarks with one name is a landmark a
 *  screen-reader user cannot tell apart.
 */
export function NavToggle({
  label = "Menu",
  closeLabel = "Close menu",
  id,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ...rest
}) {
  const auto = React.useId();
  const panelId = id || "lw-nav-panel-" + auto;
  const [open, setOpen] = React.useState(defaultOpen);
  const btnRef = React.useRef(null);

  const set = (next) => { setOpen(next); onOpenChange?.(next); };

  /* Escape is bound to the two elements rather than to the document, and that
     is a consequence of not being modal: a non-modal disclosure has no claim on
     Escape while the reader is somewhere else on the page, and a document
     listener would steal it from whatever does. Focus is necessarily on the
     toggle or inside the panel for a keyboard user, so this covers every case
     that is ours. Focus returns to the toggle, because closing a panel that
     holds focus otherwise drops the caret at the top of the document. */
  const onKeyDown = (e) => {
    if (e.key !== "Escape" || !open) return;
    e.stopPropagation();
    set(false);
    btnRef.current?.focus();
  };

  return (
    <>
      <button
        type="button"
        ref={btnRef}
        /* `.lw-icon-btn` is the shared borderless icon control and `.lw-hit`
           grows the 44px coarse-pointer target without resizing the glyph. */
        className={cx("lw-topbar-toggle", "lw-icon-btn", "lw-hit", className)}
        aria-expanded={open}
        aria-controls={panelId}
        /* The label is the ACTION, so it changes with the state — a button
           permanently named "Menu" tells a screen-reader user nothing about
           what pressing it will now do. aria-expanded carries the state; the
           name carries the outcome. */
        aria-label={open ? closeLabel : label}
        onClick={() => set(!open)}
        onKeyDown={onKeyDown}
        {...rest}
      >
        <Icon name={open ? "close" : "menu"} size={20} />
      </button>
      {/* `hidden` rather than unmounting: aria-controls must point at an element
          that exists, and a panel that is absent breaks the reference every
          time it is closed. The CSS carries the matching `[hidden]` rule,
          without which its own `display: flex` would outrank the UA default. */}
      <div id={panelId} className="lw-topbar-panel" hidden={!open} onKeyDown={onKeyDown}>
        {children}
      </div>
    </>
  );
}
