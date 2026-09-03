"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Tooltip as RT } from "radix-ui";
import { Layer, useLayer } from "./_layer.js";
const cx = (...a) => a.filter(Boolean).join(" ");
const TOOLTIP_DELAY_MS = 300;
const TOOLTIP_SKIP_DELAY_MS = 500;
function Tooltip({
  tip,
  side = "top",
  open,
  defaultOpen,
  onOpenChange,
  delayDuration,
  className,
  children,
  ...rest
}) {
  const layer = useLayer();
  const [trigger, setTrigger] = React.useState(null);
  const root = /* @__PURE__ */ jsxs(RT.Root, { open, defaultOpen, onOpenChange, delayDuration, children: [
    /* @__PURE__ */ jsx(RT.Trigger, { asChild: true, ref: setTrigger, children }),
    /* @__PURE__ */ jsx(RT.Portal, { container: layer ? layer.container : void 0, children: /* @__PURE__ */ jsx(Layer, { from: trigger, children: /* @__PURE__ */ jsx(RT.Content, { className: cx("lw-tooltip", className), side, sideOffset: 6, ...rest, children: tip }) }) })
  ] });
  return layer ? root : /* @__PURE__ */ jsx(RT.Provider, { delayDuration: TOOLTIP_DELAY_MS, skipDelayDuration: TOOLTIP_SKIP_DELAY_MS, children: root });
}
export {
  Tooltip
};
