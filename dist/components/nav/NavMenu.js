import { jsx, jsxs } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function NavMenu({ label, groups = [], linkAs = "a", name, className, ...rest }) {
  const Link = linkAs;
  return /* @__PURE__ */ jsxs("details", { className: cx("lw-navmenu", className), name, ...rest, children: [
    /* @__PURE__ */ jsxs("summary", { children: [
      /* @__PURE__ */ jsx("span", { children: label }),
      /* @__PURE__ */ jsx("span", { className: "lw-navmenu-chevron", "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "lw-navmenu-panel", children: groups.map((group, gi) => /* @__PURE__ */ jsxs("div", { className: "lw-navmenu-group", children: [
      group.label && /* @__PURE__ */ jsx("span", { className: "lw-navmenu-group-h", children: group.label }),
      group.items?.map((item, ii) => /* @__PURE__ */ jsxs(
        Link,
        {
          href: item.href,
          className: "lw-navmenu-item",
          "aria-current": item.current ? "page" : void 0,
          children: [
            /* @__PURE__ */ jsxs("span", { className: "t", children: [
              item.label,
              item.status && /* @__PURE__ */ jsx("span", { className: "lw-navmenu-status", children: item.status })
            ] }),
            item.description && /* @__PURE__ */ jsx("span", { className: "d", children: item.description })
          ]
        },
        item.id ?? ii
      ))
    ] }, group.id ?? gi)) })
  ] });
}
export {
  NavMenu
};
