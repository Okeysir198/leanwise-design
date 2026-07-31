import { jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function EmptyState({ icon, glyph, title, description, action, className, children, ...rest }) {
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-empty", className), ...rest, children: [
    (icon || glyph) && /* @__PURE__ */ jsx("span", { className: "glyph", "aria-hidden": "true", children: icon ? /* @__PURE__ */ jsx(Icon, { name: icon, size: 22 }) : glyph }),
    /* @__PURE__ */ jsx("span", { className: "t", children: title }),
    description && /* @__PURE__ */ jsx("span", { className: "s", children: description }),
    action || children
  ] });
}
export {
  EmptyState
};
