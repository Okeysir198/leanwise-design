import { jsx, jsxs } from "react/jsx-runtime";
import { cx, SERIES, nf, DataTable, Legend, frame, Grid } from "./chart-parts.js";
function BarChart({ labels = [], series = [], height = 200, stacked, label, className, ...rest }) {
  const max = Math.max(1, ...series.flatMap((s) => stacked ? [] : s.data), ...stacked ? labels.map((_, i) => series.reduce((a, s) => a + s.data[i], 0)) : []);
  const f = frame(max, height);
  const { w, pad, top, iw, ih, y } = f;
  const bandW = iw / Math.max(labels.length, 1);
  const barW = stacked ? bandW * 0.56 : bandW * 0.72 / Math.max(series.length, 1);
  return /* @__PURE__ */ jsxs("div", { className: cx("lw-chart-wrap", className), ...rest, children: [
    /* @__PURE__ */ jsxs("svg", { className: "lw-chart", viewBox: "0 0 " + w + " " + height, role: "img", "aria-label": label, children: [
      /* @__PURE__ */ jsx(Grid, { f }),
      /* @__PURE__ */ jsx("g", { className: "axis", children: labels.map((l, i) => /* @__PURE__ */ jsx("text", { x: pad.l + bandW * i + bandW / 2, y: height - 6, textAnchor: "middle", children: l }, i)) }),
      labels.map((l, i) => {
        let acc = 0;
        return series.map((s, si) => {
          const v = s.data[i] || 0;
          const h = v / top * ih;
          const x = stacked ? pad.l + bandW * i + (bandW - barW) / 2 : pad.l + bandW * i + (bandW - barW * series.length) / 2 + barW * si;
          const yy = stacked ? pad.t + ih - acc - h : y(v);
          acc += h;
          return /* @__PURE__ */ jsx(
            "rect",
            {
              className: "bar",
              x,
              y: yy,
              width: barW,
              height: Math.max(0, h),
              rx: "2",
              fill: s.color || SERIES(si),
              children: /* @__PURE__ */ jsx("title", { children: s.name + " \xB7 " + l + " \xB7 " + nf.format(v) })
            },
            si
          );
        });
      })
    ] }),
    /* @__PURE__ */ jsx(Legend, { series }),
    /* @__PURE__ */ jsx(DataTable, { labels, series, caption: label })
  ] });
}
export {
  BarChart
};
