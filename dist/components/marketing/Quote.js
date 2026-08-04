import { jsx, jsxs } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Quote({ children, name, role, className, ...rest }) {
  return /* @__PURE__ */ jsxs("blockquote", { className: cx("lw-quote", className), ...rest, children: [
    children,
    name && /* @__PURE__ */ jsxs("cite", { className: "lw-quote-attrib", children: [
      /* @__PURE__ */ jsx("span", { className: "name", children: name }),
      role ? " \xB7 " + role : ""
    ] })
  ] });
}
export {
  Quote
};
