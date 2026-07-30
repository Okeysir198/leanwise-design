import { cx, SERIES, nf, DataTable, Legend, ticks } from "./chart-parts.jsx";

/** The line and area chart. Same tokenised layer as BarChart. */
export function LineChart({ labels = [], series = [], height = 200, area, label, className, ...rest }) {
  const w = 640, pad = { t: 8, r: 8, b: 22, l: 40 };
  const max = Math.max(1, ...series.flatMap(s => s.data));
  const ts = ticks(max);
  const top = ts[ts.length - 1];
  const iw = w - pad.l - pad.r, ih = height - pad.t - pad.b;
  const x = (i) => pad.l + (labels.length < 2 ? iw / 2 : (iw / (labels.length - 1)) * i);
  const y = (v) => pad.t + ih - (v / top) * ih;

  return (
    <div className={cx("lw-chart-wrap", className)} {...rest}>
      <svg className="lw-chart" viewBox={"0 0 " + w + " " + height} role="img" aria-label={label}>
        <g className="grid">{ts.map(v => <line key={v} x1={pad.l} x2={w - pad.r} y1={y(v)} y2={y(v)} />)}</g>
        <g className="axis">
          {ts.map(v => <text key={v} x={pad.l - 6} y={y(v) + 3} textAnchor="end">{nf.format(v)}</text>)}
          {labels.map((l, i) => <text key={l} x={x(i)} y={height - 6} textAnchor="middle">{l}</text>)}
        </g>
        {series.map((s, si) => {
          const d = s.data.map((v, i) => (i ? "L" : "M") + x(i) + " " + y(v)).join(" ");
          const c = s.color || SERIES(si);
          return (
            <g key={s.name}>
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
