import { jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "./Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function Disclosure({ summary, defaultOpen = false, className, children, ...rest }) {
  return /* @__PURE__ */ jsxs("details", { className: cx("lw-disclosure", className), open: defaultOpen || void 0, ...rest, children: [
    /* @__PURE__ */ jsxs("summary", { children: [
      /* @__PURE__ */ jsx("span", { children: summary }),
      /* @__PURE__ */ jsx(Icon, { name: "chevron-down", size: 18 })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "lw-disclosure-body", children })
  ] });
}
export {
  Disclosure
};
