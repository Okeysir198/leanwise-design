"use client";
import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
const LayerContext = React.createContext(null);
function useLayer() {
  return React.useContext(LayerContext);
}
const SCOPE_SELECTOR = ".dark, [data-theme], .lw-band-dark, .lw-band-light, [data-band]";
function mirrorScope(fromEl) {
  const out = { className: void 0, "data-theme": void 0, "data-band": void 0 };
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
function Layer({ modal = false, from = null, children, className, ...rest }) {
  const ref = React.useRef(null);
  const [container, setContainer] = React.useState(null);
  const mirrored = mirrorScope(from);
  const value = React.useMemo(() => ({ container }), [container]);
  const setRef = React.useCallback((node) => {
    ref.current = node;
    setContainer(node);
  }, []);
  return React.createElement(
    "div",
    {
      ref: setRef,
      className: cx("lw-layer", modal && "lw-layer-modal", mirrored.className, className),
      "data-theme": mirrored["data-theme"],
      "data-band": mirrored["data-band"],
      "data-modal": modal || void 0,
      ...rest
    },
    React.createElement(LayerContext.Provider, { value }, children)
  );
}
export {
  Layer,
  LayerContext,
  mirrorScope,
  useLayer
};
