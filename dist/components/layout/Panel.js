import { jsx } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Panel({ raised = false, as: Tag = "div", className, children, ...rest }) {
  return /* @__PURE__ */ jsx(Tag, { className: cx("lw-panel", raised && "lw-panel-raised", className), ...rest, children });
}
export {
  Panel
};
