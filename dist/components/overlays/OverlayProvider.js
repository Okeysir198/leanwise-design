"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Tooltip } from "radix-ui";
import { LayerContext } from "./_layer.js";
const TOOLTIP_DELAY_MS = 300;
const TOOLTIP_SKIP_DELAY_MS = 500;
function OverlayProvider({ container, children }) {
  const [own, setOwn] = React.useState(null);
  const node = container || own;
  const value = React.useMemo(() => ({ container: node }), [node]);
  return /* @__PURE__ */ jsx(LayerContext.Provider, { value, children: /* @__PURE__ */ jsxs(Tooltip.Provider, { delayDuration: TOOLTIP_DELAY_MS, skipDelayDuration: TOOLTIP_SKIP_DELAY_MS, children: [
    children,
    !container && /* @__PURE__ */ jsx("div", { className: "lw-layer-root", ref: setOwn })
  ] }) });
}
export {
  OverlayProvider
};
