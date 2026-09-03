"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Tabs as RadixTabs } from "radix-ui";
const cx = (...a) => a.filter(Boolean).join(" ");
function Tabs({ tabs = [], value, onChange, label, className, ...rest }) {
  return /* @__PURE__ */ jsx(RadixTabs.Root, { asChild: true, value, onValueChange: onChange, activationMode: "automatic", children: /* @__PURE__ */ jsx(RadixTabs.List, { className: cx("lw-tabs", className), "aria-label": label, ...rest, children: tabs.map((t) => /* @__PURE__ */ jsxs(RadixTabs.Trigger, { value: t.value, id: t.id, "aria-controls": t.controls, children: [
    t.label,
    t.count != null && /* @__PURE__ */ jsx("span", { className: "count", children: t.count })
  ] }, t.value)) }) });
}
export {
  Tabs
};
