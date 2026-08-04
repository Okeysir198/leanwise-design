"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function AnnounceBar({ children, onDismiss, dismissLabel = "Dismiss announcement", className, ...rest }) {
  const [gone, setGone] = React.useState(false);
  if (gone) return null;
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-announce", className), role: "status", ...rest, children: [
    children,
    onDismiss && /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "lw-icon-btn",
        "aria-label": dismissLabel,
        onClick: () => {
          setGone(true);
          onDismiss();
        },
        children: /* @__PURE__ */ jsx(Icon, { name: "close", size: 14 })
      }
    )
  ] });
}
export {
  AnnounceBar
};
