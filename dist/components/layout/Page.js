import { jsx } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Page({ className, children, ...rest }) {
  return /* @__PURE__ */ jsx("div", { className: cx("lw-page", className), ...rest, children });
}
export {
  Page
};
