import { jsx } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Cluster({ gap = 8, justify, align, wrap = true, as: Tag = "div", className, children, ...rest }) {
  return /* @__PURE__ */ jsx(Tag, { className: cx(
    "lw-cluster",
    gap !== 8 && `lw-cluster-${gap}`,
    justify === "between" && "lw-cluster-between",
    justify === "end" && "lw-cluster-end",
    align === "baseline" && "lw-cluster-baseline",
    wrap === false && "lw-cluster-nowrap",
    className
  ), ...rest, children });
}
export {
  Cluster
};
