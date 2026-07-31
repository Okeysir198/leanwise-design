import { jsx } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Container({ className, children, ...rest }) {
  return /* @__PURE__ */ jsx("div", { className: cx("lw-container", className), ...rest, children });
}
export {
  Container
};
