import { jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function Stepper({
  steps = [],
  current = 0,
  onStepChange,
  vertical,
  label = "Progress",
  stateLabels = { done: "completed", current: "current step", error: "needs attention", upcoming: "not started" },
  className,
  ...rest
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cx("lw-stepper", vertical && "lw-stepper-vertical", className),
      role: "group",
      "aria-label": label,
      ...rest,
      children: steps.map((s, i) => {
        const state = s.state || (i < current ? "done" : i === current ? "current" : "upcoming");
        const reachable = onStepChange && (state === "done" || state === "error");
        const Tag = reachable ? "button" : "div";
        return /* @__PURE__ */ jsxs(
          Tag,
          {
            className: "lw-stepper-step",
            "data-state": state,
            type: reachable ? "button" : void 0,
            "aria-current": state === "current" ? "step" : void 0,
            onClick: reachable ? () => onStepChange(i) : void 0,
            children: [
              /* @__PURE__ */ jsx("span", { className: "lw-stepper-marker", "aria-hidden": "true", children: state === "done" ? /* @__PURE__ */ jsx(Icon, { name: "checkmark", size: 14 }) : state === "error" ? /* @__PURE__ */ jsx(Icon, { name: "close", size: 14 }) : i + 1 }),
              /* @__PURE__ */ jsxs("span", { className: "lw-stepper-label", children: [
                s.label,
                /* @__PURE__ */ jsx("span", { className: "lw-sr-only", children: " \u2014 " + (stateLabels[state] ?? stateLabels.upcoming) })
              ] }),
              s.hint && /* @__PURE__ */ jsx("span", { className: "lw-stepper-hint", children: s.hint })
            ]
          },
          s.key ?? i
        );
      })
    }
  );
}
export {
  Stepper
};
