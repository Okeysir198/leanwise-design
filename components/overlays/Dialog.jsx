"use client";
import * as React from "react";
import { Dialog as RD } from "radix-ui";
import { Icon } from "../primitives/Icon.jsx";
import { Layer, useLayer } from "./_layer.js";
const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * The modal dialog, on Radix `Dialog` since v2.0.0. The focus trap, Esc,
 * outside-click dismissal, the scroll lock and `aria-hidden` on the rest of
 * the page are Radix's; what is ours is the layer it portals into.
 *
 * WHY NOT THE NATIVE <dialog> ANY MORE. `showModal()` puts the element in the
 * browser's TOP LAYER, above every stacking context — which is also above the
 * `OverlayProvider` root, so a native dialog could never inherit a tenant's
 * `brandVars()` or a `.dark` island from its container, and a Menu opened from
 * inside it (a portal, not in the top layer) landed UNDER the dialog's own
 * backdrop. A portal-rendered dialog stacks the ordinary way: it rides
 * `--lw-z-modal` on `.lw-layer-modal`, and a nested overlay portals into that
 * same layer and stacks above it.
 *
 * The cost, stated so nobody rediscovers it: the top layer is gone, so a
 * consumer element with `z-index` above `--lw-z-modal` (110) can now cover a
 * modal. Keep page furniture under `--lw-z-nav`.
 *
 * `from` on the Layer is the element that had focus when the dialog opened —
 * the trigger, in practice — so a dialog opened from a dark band on a light
 * page paints dark (see _layer.js).
 */
export function Dialog({
  open, onOpenChange, onClose, trigger, title, label, description, footer, width,
  closeLabel = "Close", className, children, onCloseAutoFocus: userCloseAutoFocus, ...rest
}) {
  const layer = useLayer();
  const [fromEl, setFromEl] = React.useState(null);
  // The opener, kept until the NEXT open: state is cleared on close, but Radix asks
  // where to send focus only when the content unmounts, after that.
  const openerRef = React.useRef(null);
  // A bare number OR a numeric string means px. HTML has no numbers — an
  // attribute always arrives as text — and a unitless length makes the width
  // declaration invalid, which silently drops it and shrink-wraps the dialog.
  const w = width == null || width === "" ? null
    : /^\d+(\.\d+)?$/.test(String(width)) ? String(width) + "px" : String(width);
  // Captured BEFORE Radix moves focus into the content (its FocusScope focuses
  // from a passive effect; a layout effect runs first), so `fromEl` is the
  // control that opened us and the layer mirrors ITS theme scope.
  React.useLayoutEffect(() => {
    if (open) { const el = typeof document !== "undefined" ? document.activeElement : null; openerRef.current = el; setFromEl(el); }
    else setFromEl(null);
  }, [open]);
  // Radix Dialog returns focus to ITS Trigger on close — which a controlled panel
  // (`open` + `onClose`, no `trigger`) never has, so focus fell to <body> and a
  // keyboard user lost their place on every close. Send it back to the element
  // that was focused when we opened; a caller's own `onCloseAutoFocus` wins.
  const onCloseAutoFocus = (e) => {
    if (userCloseAutoFocus) userCloseAutoFocus(e);
    if (e.defaultPrevented) return;
    const el = openerRef.current;
    if (el && typeof el.focus === "function" && el.isConnected) { e.preventDefault(); el.focus(); }
  };
  const handleOpenChange = (next) => {
    onOpenChange && onOpenChange(next);
    if (!next && onClose) onClose();
  };
  return (
    <RD.Root open={!!open} onOpenChange={handleOpenChange} modal>
      {trigger && <RD.Trigger asChild>{trigger}</RD.Trigger>}
      <RD.Portal container={layer ? layer.container : undefined}>
        {/* A plain wrapper, NOT `Layer` directly: Radix's Portal is `asChild`
            and Presence hands it a ref, which would land in Layer's `...rest`
            and (under React 19, where `ref` is a prop) replace the callback
            ref that publishes the container to nested portals. */}
        <div>
          <Layer modal from={fromEl}>
            <RD.Overlay className="lw-backdrop" />
            <RD.Content className={cx("lw-dialog", className)} tabIndex={-1} onCloseAutoFocus={onCloseAutoFocus}
              style={w ? { "--lw-dialog-w": w } : undefined} {...rest}>
              {title ? (
                <div className="lw-dialog-head">
                  <RD.Title className="lw-dialog-title">{title}</RD.Title>
                  {/* Two classes since v1.3.0: `.lw-icon-btn` (base.css) is the
                      face, `.lw-dialog-close` (product.css) the optical margin. */}
                  <RD.Close asChild>
                    <button type="button" className="lw-icon-btn lw-dialog-close lw-hit" aria-label={closeLabel} title={closeLabel}>
                      <Icon name="close" size={17} />
                    </button>
                  </RD.Close>
                </div>
              ) : (
                /* Radix names the dialog from its Title and logs an error when
                   there is none — a nameless dialog is the defect, not the
                   warning. `label` is the sr-only name for a title-less one. */
                label != null && <RD.Title className="lw-sr-only">{label}</RD.Title>
              )}
              <div className="lw-dialog-body">
                {description && <RD.Description asChild><div>{description}</div></RD.Description>}
                {children}
              </div>
              {footer && <div className="lw-dialog-foot">{footer}</div>}
            </RD.Content>
          </Layer>
        </div>
      </RD.Portal>
    </RD.Root>
  );
}
