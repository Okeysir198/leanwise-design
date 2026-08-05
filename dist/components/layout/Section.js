import { jsx } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Section({ dark = false, tight = false, rule = false, className, children, ...rest }) {
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: cx(
        "lw-section",
        tight && "tight",
        dark && "dark lw-band-dark",
        rule === true || rule === "top" ? "lw-section-rule" : rule === "bottom" ? "lw-section-rule-b" : null,
        className
      ),
      "data-band": dark ? "dark" : void 0,
      ...rest,
      children
    }
  );
}
export {
  Section
};
