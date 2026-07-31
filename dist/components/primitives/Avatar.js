import { jsx } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Avatar({ name = "", src, size = "md", className, ...rest }) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();
  return /* @__PURE__ */ jsx("span", { className: cx("lw-avatar", size === "sm" && "lw-avatar-sm", size === "lg" && "lw-avatar-lg", className), title: name || void 0, ...rest, children: src ? /* @__PURE__ */ jsx("img", { src, alt: name }) : initials });
}
export {
  Avatar
};
