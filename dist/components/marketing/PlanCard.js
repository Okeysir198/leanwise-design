import { jsx, jsxs } from "react/jsx-runtime";
import { Icon } from "../primitives/Icon.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function PlanCard({
  name,
  tagline,
  price,
  unit,
  period,
  desc,
  features = [],
  cta,
  featured,
  ribbon,
  includedLabel = "Included",
  excludedLabel = "Not included",
  linkAs = "a",
  className,
  ...rest
}) {
  const Link = linkAs;
  const ctaObject = cta && typeof cta === "object" && !cta.$$typeof && cta.label;
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-card", "lw-plan", featured && "lw-plan-featured", className), ...rest, children: [
    ribbon && /* @__PURE__ */ jsx("span", { className: "lw-pill lw-plan-ribbon", children: ribbon }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "lw-plan-name", children: name }),
      tagline && /* @__PURE__ */ jsx("span", { className: "lw-plan-tagline", children: tagline })
    ] }),
    price != null && /* @__PURE__ */ jsxs("p", { className: "lw-plan-price", children: [
      /* @__PURE__ */ jsx("span", { className: "price", children: price }),
      unit && /* @__PURE__ */ jsx("span", { className: "unit", children: unit }),
      period && /* @__PURE__ */ jsx("span", { className: "period", children: period })
    ] }),
    desc && /* @__PURE__ */ jsx("p", { className: "lw-plan-desc", children: desc }),
    features.length > 0 && /* @__PURE__ */ jsx("ul", { className: "lw-plan-features", children: features.map((f, i) => {
      const included = f.included !== false;
      return (
        // The glyph is aria-hidden, so WITHOUT this word an included and
        // an excluded row are read out identically. It leads the row so
        // it is announced as "Included: SSO", and it is a prop because
        // the primary consumer is bilingual. Absolutely positioned, so it
        // is not a flex item and takes no gap.
        /* @__PURE__ */ jsxs("li", { className: "lw-plan-feature", "data-included": included ? "true" : "false", children: [
          /* @__PURE__ */ jsxs("span", { className: "lw-sr-only", children: [
            included ? includedLabel : excludedLabel,
            ": "
          ] }),
          /* @__PURE__ */ jsx(Icon, { name: included ? "check" : "minus", size: 16 }),
          /* @__PURE__ */ jsx("span", { children: f.label })
        ] }, i)
      );
    }) }),
    cta && /* @__PURE__ */ jsx("div", { className: "lw-plan-foot", children: ctaObject ? /* @__PURE__ */ jsx(Link, { className: cx("lw-btn", featured ? "lw-btn-brand" : "lw-btn-ghost"), href: cta.href, children: cta.label }) : cta })
  ] });
}
export {
  PlanCard
};
