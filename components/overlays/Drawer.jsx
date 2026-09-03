"use client";
import * as React from "react";
import { Dialog as RD } from "radix-ui";
import { Icon } from "../primitives/Icon.jsx";
import { Layer, useLayer } from "./_layer.js";
const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * The side sheet. A drawer is a modal that enters from an edge, not a different
 * kind of thing — so it is the same Radix `Dialog` shell as `Dialog`, in the
 * same layer, with the same trap, scroll lock and dismissal; only the panel's
 * geometry (`.lw-drawer[data-side]`) differs. See Dialog.jsx for why the
 * native <dialog> was retired.
 *
 * `side="bottom"` is the touch answer to a centred dialog. `start`/`end` are
 * LOGICAL — the CSS uses inset-inline, and the enter animation flips with
 * `--lw-dir` under `[dir="rtl"]`.
 */
export function Drawer({
  open, onOpenChange, onClose, trigger, title, label, description, footer, side = "end", width,
  closeLabel = "Close", className, children, ...rest
}) {
  const layer = useLayer();
  const [fromEl, setFromEl] = React.useState(null);
  // A unitless length makes the declaration invalid, which drops it silently and
  // shrink-wraps the panel — so a bare number, or a numeric string, means px.
  const w = width == null || width === "" ? null
    : /^\d+(\.\d+)?$/.test(String(width)) ? String(width) + "px" : String(width);
  React.useLayoutEffect(() => {
    if (open) setFromEl(typeof document !== "undefined" ? document.activeElement : null);
    else setFromEl(null);
  }, [open]);
  const handleOpenChange = (next) => {
    onOpenChange && onOpenChange(next);
    if (!next && onClose) onClose();
  };
  return (
    <RD.Root open={!!open} onOpenChange={handleOpenChange} modal>
      {trigger && <RD.Trigger asChild>{trigger}</RD.Trigger>}
      <RD.Portal container={layer ? layer.container : undefined}>
        {/* Plain wrapper, not `Layer`: see Dialog.jsx. */}
        <div>
          <Layer modal from={fromEl}>
            <RD.Overlay className="lw-backdrop" />
            <RD.Content className={cx("lw-drawer", className)} data-side={side} tabIndex={-1}
              style={w ? { "--lw-drawer-w": w } : undefined} {...rest}>
              {title ? (
                <div className="lw-drawer-head">
                  <RD.Title className="lw-drawer-title">{title}</RD.Title>
                  <RD.Close asChild>
                    <button type="button" className="lw-icon-btn" aria-label={closeLabel} title={closeLabel}>
                      <Icon name="close" size={17} />
                    </button>
                  </RD.Close>
                </div>
              ) : (
                label != null && <RD.Title className="lw-sr-only">{label}</RD.Title>
              )}
              <div className="lw-drawer-body">
                {description && <RD.Description asChild><div>{description}</div></RD.Description>}
                {children}
              </div>
              {footer && <div className="lw-drawer-foot">{footer}</div>}
            </RD.Content>
          </Layer>
        </div>
      </RD.Portal>
    </RD.Root>
  );
}
