import { jsx } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Grid({ min, gap = 16, as: Tag = "div", className, style, children, ...rest }) {
  return /* @__PURE__ */ jsx(
    Tag,
    {
      className: cx("lw-grid", gap === 24 && "lw-grid-24", className),
      style: min ? { "--lw-grid-min": typeof min === "number" ? min + "px" : min, ...style } : style,
      ...rest,
      children
    }
  );
}
export {
  Grid
};
