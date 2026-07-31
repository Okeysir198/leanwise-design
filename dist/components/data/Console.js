import { jsx, jsxs } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
function Console({ url = "leanwise.ai", title, lines, foot, className, children, ...rest }) {
  const cellCount = lines ? lines.reduce((n, l) => Math.max(n, l.cells ? l.cells.length : 0), 0) : 0;
  const logStyle = cellCount ? {
    gridTemplateColumns: "max-content " + "max-content ".repeat(Math.max(0, cellCount - 1)) + "minmax(0, max-content) 1fr"
  } : void 0;
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-console", className), ...rest, children: [
    /* @__PURE__ */ jsxs("div", { className: "lw-console-h", children: [
      /* @__PURE__ */ jsxs("span", { className: "left", children: [
        /* @__PURE__ */ jsxs("span", { className: "lights", children: [
          /* @__PURE__ */ jsx("i", {}),
          /* @__PURE__ */ jsx("i", {}),
          /* @__PURE__ */ jsx("i", {})
        ] }),
        title
      ] }),
      url && /* @__PURE__ */ jsx("span", { className: "url", children: url })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "lw-console-body", children: lines ? /* @__PURE__ */ jsx("div", { className: "lw-console-log", role: "log", style: logStyle, children: lines.map((l, i) => /* @__PURE__ */ jsxs("div", { className: cx("lw-console-line", l.tone), children: [
      (l.t || cellCount > 0) && /* @__PURE__ */ jsx("span", { className: "t", children: l.t }),
      l.cells ? l.cells.map((c, j) => {
        const cell = typeof c === "string" ? { text: c } : c || {};
        return /* @__PURE__ */ jsx("span", { className: cx("lw-console-cell", cell.num && "num", cell.muted && "muted"), children: cell.text }, j);
      }) : /* @__PURE__ */ jsx("span", { className: "lw-console-span", children: l.text })
    ] }, i)) }) : children }),
    foot && /* @__PURE__ */ jsx("div", { className: "lw-console-foot", children: foot })
  ] });
}
export {
  Console
};
