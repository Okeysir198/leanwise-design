import { jsx, jsxs } from "react/jsx-runtime";
import { cx, SERIES, nf, DataTable, Legend, frame, Grid } from "./chart-parts.js";
function LineChart({ labels = [], series = [], height = 200, area, label, className, ...rest }) {
  const max = Math.max(1, ...series.flatMap((s) => s.data));
  const f = frame(max, height);
  const { w, pad, top, iw, ih, y } = f;
  const x = (i) => pad.l + (labels.length < 2 ? iw / 2 : iw / (labels.length - 1) * i);
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-chart-wrap", className), ...rest, children: [
    /* @__PURE__ */ jsxs("svg", { className: "lw-chart", viewBox: "0 0 " + w + " " + height, role: "img", "aria-label": label, children: [
      /* @__PURE__ */ jsx(Grid, { f }),
      /* @__PURE__ */ jsx("g", { className: "axis", children: labels.map((l, i) => /* @__PURE__ */ jsx("text", { x: x(i), y: height - 6, textAnchor: "middle", children: l }, i)) }),
      series.map((s, si) => {
        const d = s.data.map((v, i) => (i ? "L" : "M") + x(i) + " " + y(v)).join(" ");
        const c = s.color || SERIES(si);
        return /* @__PURE__ */ jsxs("g", { children: [
          area && /* @__PURE__ */ jsx("path", { d: d + " L" + x(s.data.length - 1) + " " + (pad.t + ih) + " L" + x(0) + " " + (pad.t + ih) + " Z", fill: c, opacity: "0.12" }),
          /* @__PURE__ */ jsx("path", { className: "line", d, stroke: c }),
          s.data.map((v, i) => /* @__PURE__ */ jsx("circle", { className: "dot", cx: x(i), cy: y(v), r: "3", fill: c, children: /* @__PURE__ */ jsx("title", { children: s.name + " \xB7 " + labels[i] + " \xB7 " + nf.format(v) }) }, i))
        ] }, si);
      })
    ] }),
    /* @__PURE__ */ jsx(Legend, { series }),
    /* @__PURE__ */ jsx(DataTable, { labels, series, caption: label })
  ] });
}
export {
  LineChart
};
