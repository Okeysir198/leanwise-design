import { jsx } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Prose({ measure = "prose", as: Tag = "div", className, children, ...rest }) {
  const cls = cx("lw-prose", measure === "narrow" && "lw-prose-narrow", className);
  if (rest.dangerouslySetInnerHTML) return /* @__PURE__ */ jsx(Tag, { className: cls, ...rest });
  return /* @__PURE__ */ jsx(Tag, { className: cls, ...rest, children });
}
export {
  Prose
};
