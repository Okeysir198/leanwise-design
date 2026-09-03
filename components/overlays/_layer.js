"use client";
import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * The overlay layer — private plumbing shared by every Radix-backed overlay
 * (Popover, Menu, Tooltip, Dialog, Drawer, CommandPalette).
 *
 * WHY A LAYER AT ALL. A Radix `Portal` renders into `document.body` by
 * default, which is OUTSIDE the element that carries `brandVars()`, the
 * `.dark` class, or a `.lw-band-*` scope. Every role token inside the portal
 * then resolves to the PAGE theme, not the theme of the control that opened
 * it — a light popover on a dark band, the recurring 1.5:1 shape this repo
 * keeps closing. Two things fix it here:
 *
 *   1. `OverlayProvider` owns a `.lw-layer-root` INSIDE the branded subtree
 *      and offers it through `LayerContext` as the portal container, so a
 *      portal inherits brand + theme from the same ancestor the trigger does.
 *   2. `mirrorScope()` copies the NEAREST band/theme scope off the trigger onto
 *      the `.lw-layer` element itself, so a popover opened from a dark band on
 *      a light page paints dark. The class lands ON the layer, and tokens.css
 *      re-derives every role for `.dark` / `.lw-band-dark` / `[data-theme]` /
 *      `[data-band]` as an element's own declaration — so the descendants get
 *      the roles, not just the channels.
 *
 * A `Layer` also provides ITSELF as the container to its descendants, so a
 * Menu inside a Dialog portals into that dialog's layer and stacks above it,
 * instead of landing under the modal's backdrop.
 */

export const LayerContext = React.createContext(null);

/** `{ container: HTMLElement | null } | null` — null outside an OverlayProvider. */
export function useLayer() {
  return React.useContext(LayerContext);
}

const SCOPE_SELECTOR = ".dark, [data-theme], .lw-band-dark, .lw-band-light, [data-band]";

/**
 * The theme/band scope to mirror onto a layer, read from the nearest scoping
 * ancestor of `fromEl` (usually the trigger). Returns plain attributes:
 * `{ className, "data-theme", "data-band" }`, each undefined when unset.
 */
export function mirrorScope(fromEl) {
  const out = { className: undefined, "data-theme": undefined, "data-band": undefined };
  const el = fromEl && typeof fromEl.closest === "function" ? fromEl.closest(SCOPE_SELECTOR) : null;
  if (!el) return out;
  const classes = [];
  if (el.classList.contains("dark")) classes.push("dark");
  for (const c of el.classList) if (/^lw-band-/.test(c)) classes.push(c);
  if (classes.length) out.className = classes.join(" ");
  const theme = el.getAttribute("data-theme");
  if (theme) out["data-theme"] = theme;
  const band = el.getAttribute("data-band");
  if (band) out["data-band"] = band;
  return out;
}

/**
 * `<Layer modal from>` — the fixed, full-viewport, pointer-transparent box a
 * portal renders into. `from` is the element whose scope to mirror (the
 * trigger); `modal` lifts it from `--lw-z-overlay` to `--lw-z-modal`.
 */
// forwardRef: every Radix `Portal` is `asChild`, so its Slot clones the Layer
// with a ref (Presence needs the node). A plain function component would drop
// it — a warning under React 18, a lost node either way — and the streams that
// hit this had to wrap the Layer in a bare <div>. Merging the forwarded ref
// with the local one keeps a single element.
export const Layer = React.forwardRef(function Layer({ modal = false, from = null, children, className, ...rest }, forwardedRef) {
  const ref = React.useRef(null);
  // The container is offered through STATE, not `ref.current`: a ref is null
  // on the first render, and a child Portal that read it then would fall back
  // to document.body for its whole life.
  const [container, setContainer] = React.useState(null);
  const mirrored = mirrorScope(from);
  const value = React.useMemo(() => ({ container }), [container]);
  const setRef = React.useCallback((node) => {
    ref.current = node; setContainer(node);
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  }, [forwardedRef]);
  // createElement, not JSX: this is a `.js` (private, like _merge-refs.js) and
  // neither lw-build nor a consumer's bundler transforms JSX in a `.js`.
  return React.createElement(
    "div",
    {
      ref: setRef,
      className: cx("lw-layer", modal && "lw-layer-modal", mirrored.className, className),
      "data-theme": mirrored["data-theme"],
      "data-band": mirrored["data-band"],
      "data-modal": modal || undefined,
      ...rest,
    },
    React.createElement(LayerContext.Provider, { value }, children),
  );
});
Layer.displayName = "Layer";
