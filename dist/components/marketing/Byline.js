import { jsx, jsxs } from "react/jsx-runtime";
import { Avatar } from "../primitives/Avatar.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function Byline({ name, role, date, dateTime, src, size = "md", className, children, ...rest }) {
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-byline", className), ...rest, children: [
    name && /* @__PURE__ */ jsx(Avatar, { name, src, size }),
    name && /* @__PURE__ */ jsx("span", { className: "name", children: name }),
    role && /* @__PURE__ */ jsx("span", { className: "role", children: role }),
    date && /* @__PURE__ */ jsx("time", { className: "date", dateTime, children: date }),
    children
  ] });
}
export {
  Byline
};
