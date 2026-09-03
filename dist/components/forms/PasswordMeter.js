import { jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function PasswordMeter({ level = 0, label, labels, className, ...rest }) {
  const clamped = Math.max(0, Math.min(4, Math.round(level)));
  const word = label ?? labels?.[clamped];
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-pw-strength", className), ...rest, children: [
    /* @__PURE__ */ jsxs("div", { className: "lw-pwmeter", "data-level": clamped || void 0, "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx("span", {}),
      /* @__PURE__ */ jsx("span", {}),
      /* @__PURE__ */ jsx("span", {}),
      /* @__PURE__ */ jsx("span", {})
    ] }),
    word ? (
      /* Announced, not merely present: strength changes as the user types and
         a silent bar tells a screen-reader user nothing at all. */
      /* @__PURE__ */ jsxs("p", { className: "lw-help", role: "status", children: [
        clamped >= 3 ? /* @__PURE__ */ jsx(Icon, { name: "check", size: 13 }) : null,
        word
      ] })
    ) : null
  ] });
}
export {
  PasswordMeter
};
