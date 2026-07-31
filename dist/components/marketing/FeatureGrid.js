import { jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function FeatureGrid({ features = [], className, ...rest }) {
  return /* @__PURE__ */ jsx("div", { className: cx("lw-features", className), ...rest, children: features.map((f, i) => {
    const Tag = f.href ? "a" : "div";
    return /* @__PURE__ */ jsxs(Tag, { className: cx("lw-feature", f.href && "lw-feature-interactive"), href: f.href, children: [
      /* @__PURE__ */ jsx("span", { className: "num", children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ jsx("h3", { children: f.title }),
      /* @__PURE__ */ jsx("p", { children: f.body }),
      f.href && /* @__PURE__ */ jsxs("span", { className: "lw-feature-more", children: [
        f.more || "Learn more",
        /* @__PURE__ */ jsx(Icon, { name: "arrow-right", size: 14, className: "arrow" })
      ] })
    ] }, i);
  }) });
}
export {
  FeatureGrid
};
