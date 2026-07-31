import { jsx } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Stack({ gap = 16, as: Tag = "div", className, children, ...rest }) {
  return /* @__PURE__ */ jsx(Tag, { className: cx("lw-stack", gap !== 16 && `lw-stack-${gap}`, className), ...rest, children });
}
export {
  Stack
};
