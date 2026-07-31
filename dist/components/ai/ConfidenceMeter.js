import { jsx, jsxs } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function ConfidenceMeter({ value = 0, label = "match", className, style, ...rest }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: cx("lw-confidence", pct < 60 && "low", className),
      style: { "--lw-confidence": pct + "%", ...style },
      role: "meter",
      "aria-valuenow": pct,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": label,
      ...rest,
      children: [
        /* @__PURE__ */ jsx("span", { className: "rail", "aria-hidden": "true", children: /* @__PURE__ */ jsx("i", {}) }),
        /* @__PURE__ */ jsxs("span", { children: [
          pct,
          "%"
        ] })
      ]
    }
  );
}
export {
  ConfidenceMeter
};
