import { jsx } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Card({ interactive = false, glow = false, selected, as, className, children, ...rest }) {
  const Tag = as || (interactive ? rest.href ? "a" : "button" : "div");
  return /* @__PURE__ */ jsx(
    Tag,
    {
      className: cx("lw-card", interactive && "lw-card-interactive", glow && "lw-card-glow", className),
      "aria-pressed": interactive && selected != null ? !!selected : void 0,
      "data-selected": selected ? "true" : void 0,
      type: Tag === "button" ? "button" : void 0,
      ...rest,
      children
    }
  );
}
function CardHead({ className, children, ...rest }) {
  return /* @__PURE__ */ jsx("div", { className: cx("lw-card-head", className), ...rest, children });
}
function CardTitle({ as: Tag = "h3", className, children, ...rest }) {
  return /* @__PURE__ */ jsx(Tag, { className: cx("lw-card-title", className), ...rest, children });
}
function CardBody({ className, children, ...rest }) {
  return /* @__PURE__ */ jsx("p", { className: cx("lw-card-body", className), ...rest, children });
}
function CardFoot({ className, children, ...rest }) {
  return /* @__PURE__ */ jsx("div", { className: cx("lw-card-foot", className), ...rest, children });
}
export {
  Card,
  CardBody,
  CardFoot,
  CardHead,
  CardTitle
};
