"use client";
import { jsx } from "react/jsx-runtime";
import * as React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
function Avatar({ name = "", src, size = "md", className, ...rest }) {
  const [broken, setBroken] = React.useState(false);
  React.useEffect(() => setBroken(false), [src]);
  const initials = name.trim().split(/\s+/).slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();
  return /* @__PURE__ */ jsx("span", { className: cx("lw-avatar", size === "sm" && "lw-avatar-sm", size === "lg" && "lw-avatar-lg", className), title: name || void 0, ...rest, children: src && !broken ? /* @__PURE__ */ jsx("img", { src, alt: name, onError: () => setBroken(true) }) : initials });
}
export {
  Avatar
};
