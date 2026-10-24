import { jsx } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Split({ rail = 320, side = "end", gap = 24, as: Tag = "div", className, style, children, ...rest }) {
  return /* @__PURE__ */ jsx(
    Tag,
    {
      className: cx("lw-split", side === "start" && "lw-split-start", gap !== 24 && `lw-split-${gap}`, className),
      style: { "--lw-split-rail": typeof rail === "number" ? rail + "px" : rail, ...style },
      ...rest,
      children
    }
  );
}
export {
  Split
};
