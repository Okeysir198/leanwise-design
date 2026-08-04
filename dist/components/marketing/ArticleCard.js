import { jsx, jsxs } from "react/jsx-runtime";
import { Card, CardHead, CardTitle, CardBody, CardFoot } from "../primitives/Card.js";
import { Byline } from "./Byline.js";
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
  readMinutes,
  cover,
  linkAs = "a",
  className,
  ...rest
}) {
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
        (author || date || readMinutes != null) && /* @__PURE__ */ jsx(CardFoot, { children: /* @__PURE__ */ jsx(Byline, { name: author, role, date, dateTime, src: avatar, size: "sm", children: readMinutes != null && /* @__PURE__ */ jsxs("span", { className: "date", children: [
          readMinutes,
          " min read"
        ] }) }) })
      ]
    }
  );
}
export {
  ArticleCard
};
