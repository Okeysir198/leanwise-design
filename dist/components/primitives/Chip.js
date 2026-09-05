import { jsx } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Chip({ tone = "brand", className, children, ...rest }) {
  return /* @__PURE__ */ jsx("span", { className: cx("lw-chip", tone !== "brand" && `lw-chip-${tone}`, className), ...rest, children });
}
export {
  Chip
};
