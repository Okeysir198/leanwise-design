import { jsx } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Tooltip({ tip, className, children, ...rest }) {
  return /* @__PURE__ */ jsx("span", { className: cx("lw-tip", className), "data-tip": tip, ...rest, children });
}
export {
  Tooltip
};
