import { jsx } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Eyebrow({ as: Tag = "p", className, children, ...rest }) {
  return /* @__PURE__ */ jsx(Tag, { className: cx("lw-eyebrow", className), ...rest, children });
}
export {
  Eyebrow
};
