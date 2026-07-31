import { jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function Message({ role = "ai", who, avatar, streaming = false, footer, className, children, ...rest }) {
  const name = who || (role === "ai" ? "LeanWise" : "You");
  const glyph = avatar || /* @__PURE__ */ jsx(Icon, { name: role === "ai" ? "spark" : "user", size: role === "ai" ? 19 : 16 });
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-msg", role, className), "data-streaming": streaming ? "true" : void 0, ...rest, children: [
    /* @__PURE__ */ jsx("span", { className: "lw-msg-avatar", "aria-hidden": "true", children: glyph }),
    /* @__PURE__ */ jsxs("div", { className: "lw-msg-main", children: [
      /* @__PURE__ */ jsx("span", { className: "who", children: name }),
      /* @__PURE__ */ jsxs("div", { className: "body", children: [
        children,
        footer
      ] })
    ] })
  ] });
}
export {
  Message
};
