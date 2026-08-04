import { jsx, jsxs } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function StoryCard({ logo, title, body, result, quote, person, role, href, linkAs = "a", className, ...rest }) {
  const Tag = href ? linkAs : "div";
  const showQuote = Boolean(quote && person && role);
  const initials = String(title || "").trim().split(/\s+/).slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();
  return /* @__PURE__ */ jsxs(Tag, { className: cx("lw-story", href && "lw-story-interactive", className), href, ...rest, children: [
    logo ? /* @__PURE__ */ jsx("span", { className: "logo", children: logo }) : /* @__PURE__ */ jsx("span", { className: "logo lw-monogram", children: initials }),
    /* @__PURE__ */ jsxs("div", { children: [
      title && /* @__PURE__ */ jsx("h3", { children: title }),
      body && /* @__PURE__ */ jsx("p", { children: body }),
      showQuote && /* @__PURE__ */ jsxs("blockquote", { className: "lw-story-quote", children: [
        quote,
        /* @__PURE__ */ jsxs("cite", { children: [
          person,
          " \xB7 ",
          role
        ] })
      ] }),
      result && /* @__PURE__ */ jsx("div", { className: "meta", children: /* @__PURE__ */ jsx("span", { className: "lw-story-result", children: /* @__PURE__ */ jsx("b", { children: result }) }) })
    ] })
  ] });
}
export {
  StoryCard
};
