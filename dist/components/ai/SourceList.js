import { jsx, jsxs } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function SourceList({ sources = [], linkAs = "a", className, ...rest }) {
  return /* @__PURE__ */ jsx("div", { className: cx("lw-source-list", className), ...rest, children: sources.map((s, i) => {
    const Tag = s.href ? linkAs : "button";
    return /* @__PURE__ */ jsxs(
      Tag,
      {
        className: "lw-source-item",
        href: s.href || void 0,
        type: s.href ? void 0 : "button",
        onClick: s.onClick,
        children: [
          /* @__PURE__ */ jsx("span", { className: "n", children: s.n ?? i + 1 }),
          /* @__PURE__ */ jsxs("span", { className: "lw-source-main", children: [
            /* @__PURE__ */ jsx("span", { className: "t", children: s.title }),
            s.meta && /* @__PURE__ */ jsx("span", { className: "m", children: s.meta })
          ] })
        ]
      },
      s.id ?? i
    );
  }) });
}
export {
  SourceList
};
