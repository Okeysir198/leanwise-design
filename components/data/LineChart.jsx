import { cx, SERIES, nf, DataTable, Legend, frame, Grid } from "./chart-parts.jsx";

/** The line and area chart. Same tokenised layer as BarChart. */
export function LineChart({ labels = [], series = [], height = 200, area, label, className, ...rest }) {
  const max = Math.max(1, ...series.flatMap(s => s.data));
  const f = frame(max, height);
  const { w, pad, top, iw, ih, y } = f;
  const x = (i) => pad.l + (labels.length < 2 ? iw / 2 : (iw / (labels.length - 1)) * i);

  return (
    <div className={cx("lw-chart-wrap", className)} {...rest}>
      <svg className="lw-chart" viewBox={"0 0 " + w + " " + height} role="img" aria-label={label}>
        <Grid f={f} />
        <g className="axis">
          {labels.map((l, i) => <text key={i} x={x(i)} y={height - 6} textAnchor="middle">{l}</text>)}
        </g>
        {series.map((s, si) => {
          const d = s.data.map((v, i) => (i ? "L" : "M") + x(i) + " " + y(v)).join(" ");
          const c = s.color || SERIES(si);
          return (
            <g key={si}>
              {area && <path d={d + " L" + x(s.data.length - 1) + " " + (pad.t + ih) + " L" + x(0) + " " + (pad.t + ih) + " Z"} fill={c} opacity="0.12" />}
              <path className="line" d={d} stroke={c} />
              {s.data.map((v, i) => <circle key={i} className="dot" cx={x(i)} cy={y(v)} r="3" fill={c}><title>{s.name + " · " + labels[i] + " · " + nf.format(v)}</title></circle>)}
            </g>
          );
        })}
      </svg>
      <Legend series={series} />
      <DataTable labels={labels} series={series} caption={label} />
    </div>
  );
}
