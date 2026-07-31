import { jsx, jsxs } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function InputGroup({ prefix, suffix, className, children, ...rest }) {
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-input-group", className), ...rest, children: [
    prefix && /* @__PURE__ */ jsx("span", { className: "affix", children: prefix }),
    children,
    suffix && /* @__PURE__ */ jsx("span", { className: "affix mono", children: suffix })
  ] });
}
export {
  InputGroup
};
