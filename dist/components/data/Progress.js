import { jsx } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Progress({ value = 0, max = 100, label, tone, className, ...rest }) {
  const pct = Math.max(0, Math.min(100, Number(value) / Number(max || 100) * 100));
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cx("lw-progress", className),
      "data-tone": tone,
      role: "progressbar",
      "aria-valuenow": Math.round(pct),
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": label,
      ...rest,
      children: /* @__PURE__ */ jsx("i", { style: { width: pct + "%" } })
    }
  );
}
export {
  Progress
};
