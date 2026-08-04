import { jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function StatMeter({
  label,
  value,
  unit,
  delta,
  direction,
  percent,
  target,
  tone,
  foot,
  interactive = false,
  formatValueText = (p, t) => p + "% of a " + t + "% target",
  className,
  ...rest
}) {
  const onKeyDown = (e) => {
    if (!interactive || e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    rest.onClick && rest.onClick(e);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cx("lw-card", "lw-stat-tile", interactive && "lw-card-interactive", className),
      role: interactive ? "button" : void 0,
      tabIndex: interactive ? 0 : void 0,
      onKeyDown: interactive ? onKeyDown : void 0,
      ...rest,
      children: [
        label && /* @__PURE__ */ jsx("span", { className: "lw-card-eyebrow", children: label }),
        /* @__PURE__ */ jsxs("div", { className: "lw-stat-row", children: [
          /* @__PURE__ */ jsx("div", { className: "lw-stat", children: /* @__PURE__ */ jsxs("span", { className: "n", children: [
            value,
            unit && /* @__PURE__ */ jsx("span", { className: "u", children: unit })
          ] }) }),
          delta && /* @__PURE__ */ jsxs("span", { className: "lw-stat-delta", "data-dir": direction, children: [
            (direction === "up" || direction === "down") && /* @__PURE__ */ jsx(Icon, { name: "arrow-" + direction, size: 13 }),
            delta
          ] })
        ] }),
        percent != null && /* @__PURE__ */ jsxs(
          "div",
          {
            className: "lw-bar",
            "data-tone": tone,
            style: { "--lw-bar-value": percent + "%" },
            role: "meter",
            "aria-valuenow": percent,
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            "aria-label": typeof label === "string" ? label : void 0,
            "aria-valuetext": target != null ? formatValueText(percent, target) : void 0,
            children: [
              /* @__PURE__ */ jsx("i", { className: "fill" }),
              target != null && /* @__PURE__ */ jsx("span", { className: "target", style: { insetInlineStart: target + "%" } })
            ]
          }
        ),
        foot && /* @__PURE__ */ jsx("span", { className: "lw-stat-foot", children: foot })
      ]
    }
  );
}
export {
  StatMeter
};
