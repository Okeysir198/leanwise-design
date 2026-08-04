import { jsx, jsxs } from "react/jsx-runtime";
import { Card, CardHead, CardTitle, CardBody, CardFoot } from "../primitives/Card.js";
import { Byline } from "./Byline.js";
import { deprecate } from "../_deprecate.js";
const cx = (...a) => a.filter(Boolean).join(" ");
function ArticleCard({
  title,
  dek,
  href,
  category,
  tags = [],
  author,
  role,
  date,
  dateTime,
  avatar,
  readTime,
  readMinutes,
  cover,
  linkAs = "a",
  className,
  ...rest
}) {
  if (readMinutes != null) deprecate(
    "ArticleCard",
    "readMinutes",
    "`readMinutes` is deprecated \u2014 pass `readTime` as a pre-formatted node (e.g. `${n} min read`, or its translation), because a component library cannot hold display text. `readMinutes` is removed in v2.0.0."
  );
  const read = readTime != null ? readTime : readMinutes != null ? readMinutes + " min read" : null;
  return /* @__PURE__ */ jsxs(
    Card,
    {
      as: href ? linkAs : "div",
      interactive: Boolean(href),
      href,
      className: cx(className),
      ...rest,
      children: [
        cover && /* @__PURE__ */ jsx("span", { className: "lw-card-media", children: cover }),
        category && /* @__PURE__ */ jsx(CardHead, { children: /* @__PURE__ */ jsx("span", { className: "lw-eyebrow", children: category }) }),
        /* @__PURE__ */ jsx(CardTitle, { children: title }),
        dek && /* @__PURE__ */ jsx(CardBody, { children: dek }),
        tags.length > 0 && /* @__PURE__ */ jsx("div", { className: "lw-cluster", children: tags.map((t, i) => /* @__PURE__ */ jsx("span", { className: "lw-pill", children: t }, i)) }),
        (author || date || read != null) && /* @__PURE__ */ jsx(CardFoot, { children: /* @__PURE__ */ jsx(Byline, { name: author, role, date, dateTime, src: avatar, size: "sm", children: read != null && /* @__PURE__ */ jsx("span", { className: "date", children: read }) }) })
      ]
    }
  );
}
export {
  ArticleCard
};
