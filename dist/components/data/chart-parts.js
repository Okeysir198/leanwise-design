import { Fragment, jsx, jsxs } from "react/jsx-runtime";
const cx = (...a) => a.filter(Boolean).join(" ");
const SERIES = (i) => "var(--lw-chart-" + (i % 8 + 1) + ")";
const nf = new Intl.NumberFormat();
function DataTable({ labels, series, caption }) {
  return /* @__PURE__ */ jsxs("table", { className: "lw-sr-only", children: [
    /* @__PURE__ */ jsx("caption", { children: caption }),
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { scope: "col", children: "Category" }),
      series.map((s, i) => /* @__PURE__ */ jsx("th", { scope: "col", children: s.name }, i))
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { children: labels.map((l, i) => /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { scope: "row", children: l }),
      series.map((s, si) => /* @__PURE__ */ jsx("td", { children: nf.format(s.data[i]) }, si))
    ] }, i)) })
  ] });
}
function Legend({ series }) {
  if (series.length < 2) return null;
  return /* @__PURE__ */ jsx("div", { className: "lw-chart-legend", children: series.map((s, i) => /* @__PURE__ */ jsxs("span", { children: [
    /* @__PURE__ */ jsx("i", { style: { background: s.color || SERIES(i) } }),
    s.name
  ] }, i)) });
}
const ticks = (max, n = 4) => {
  const step = Math.pow(10, Math.floor(Math.log10(max / n || 1)));
  const s = Math.ceil(max / n / step) * step;
  return Array.from({ length: n + 1 }, (_, i) => i * s);
};
const CHART_W = 640;
const CHART_PAD = { t: 8, r: 8, b: 22, l: 40 };
function frame(max, height) {
  const pad = CHART_PAD, w = CHART_W;
  const ts = ticks(max);
  const top = ts[ts.length - 1];
  const iw = w - pad.l - pad.r, ih = height - pad.t - pad.b;
  return { w, pad, ts, top, iw, ih, y: (v) => pad.t + ih - v / top * ih };
}
function Grid({ f }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("g", { className: "grid", children: f.ts.map((v, i) => /* @__PURE__ */ jsx("line", { x1: f.pad.l, x2: f.w - f.pad.r, y1: f.y(v), y2: f.y(v) }, i)) }),
    /* @__PURE__ */ jsx("g", { className: "axis", children: f.ts.map((v, i) => /* @__PURE__ */ jsx("text", { x: f.pad.l - 6, y: f.y(v) + 3, textAnchor: "end", children: nf.format(v) }, i)) })
  ] });
}
export {
  CHART_PAD,
  CHART_W,
  DataTable,
  Grid,
  Legend,
  SERIES,
  cx,
  frame,
  nf,
  ticks
};
