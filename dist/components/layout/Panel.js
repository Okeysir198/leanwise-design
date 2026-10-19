import { jsx } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Panel({ as: Tag = "div", className, children, ...rest }) {
  return /* @__PURE__ */ jsx(Tag, { className: cx("lw-panel", className), ...rest, children });
}
export {
  Panel
};
