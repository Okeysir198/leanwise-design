import { jsx } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Skeleton({ shape = "block", width, height, lines, className, style, ...rest }) {
  if (lines) {
    return /* @__PURE__ */ jsx("span", { className: cx("lw-skeleton-lines", className), style, "aria-hidden": "true", ...rest, children: Array.from({ length: lines }, (_, i) => /* @__PURE__ */ jsx("span", { className: "lw-skeleton text" }, i)) });
  }
  return /* @__PURE__ */ jsx("span", { className: cx("lw-skeleton", shape !== "block" && shape, className), style: { width, height, ...style }, "aria-hidden": "true", ...rest });
}
export {
  Skeleton
};
