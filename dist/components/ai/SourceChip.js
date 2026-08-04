import { jsx } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function SourceChip({
  n,
  title,
  as,
  formatLabel = (num, t) => t ? `Source ${num}: ${t}` : `Source ${num}`,
  className,
  ...rest
}) {
  const Tag = as || (rest.href ? "a" : "button");
  return /* @__PURE__ */ jsx(
    Tag,
    {
      className: cx("lw-source", className),
      type: Tag === "button" ? "button" : void 0,
      "aria-label": formatLabel(n, title),
      ...rest,
      children: n
    }
  );
}
export {
  SourceChip
};
