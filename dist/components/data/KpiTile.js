import { jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function KpiTile({ label, value, icon, accent = "brand", delta, direction, tone, note, className, ...rest }) {
  const ink = tone || (direction === "up" ? "pos" : direction === "down" ? "neg" : void 0);
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-kpi", className), ...rest, children: [
    /* @__PURE__ */ jsxs("span", { className: "lw-kpi-head", children: [
      /* @__PURE__ */ jsx("span", { className: "k", children: label }),
      icon && /* @__PURE__ */ jsx("span", { className: "lw-kpi-badge", "data-accent": accent, children: /* @__PURE__ */ jsx(Icon, { name: icon, size: 18 }) })
    ] }),
    /* @__PURE__ */ jsxs("span", { className: "lw-kpi-row", children: [
      /* @__PURE__ */ jsx("span", { className: "v", children: value }),
      (delta || note) && /* @__PURE__ */ jsxs("span", { className: cx("d", direction, ink), children: [
        direction && /* @__PURE__ */ jsx(Icon, { name: direction === "up" ? "arrow-up" : "arrow-down", size: 13 }),
        delta,
        note && /* @__PURE__ */ jsx("span", { className: "w", children: note })
      ] })
    ] })
  ] });
}
export {
  KpiTile
};
