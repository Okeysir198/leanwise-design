import { cx, SERIES, nf, DataTable, Legend, frame, Grid } from "./chart-parts.jsx";

/**
 * A thin tokenised chart layer, not a charting engine — for the two shapes a
 * product dashboard actually needs. Anything richer takes a real library; this
 * exists so a KPI strip does not each time.
 */
export function BarChart({ labels = [], series = [], height = 200, stacked, label, className, ...rest }) {
  const max = Math.max(1, ...series.flatMap(s => stacked ? [] : s.data), ...(stacked ? labels.map((_, i) => series.reduce((a, s) => a + s.data[i], 0)) : []));
  const f = frame(max, height);
  const { w, pad, top, iw, ih, y } = f;
  const bandW = iw / Math.max(labels.length, 1);
  const barW = stacked ? bandW * 0.56 : (bandW * 0.72) / Math.max(series.length, 1);

  return (
    <div className={cx("lw-chart-wrap", className)} {...rest}>
      <svg className="lw-chart" viewBox={"0 0 " + w + " " + height} role="img" aria-label={label}>
        <Grid f={f} />
        <g className="axis">
          {labels.map((l, i) => <text key={l} x={pad.l + bandW * i + bandW / 2} y={height - 6} textAnchor="middle">{l}</text>)}
        </g>
        {labels.map((l, i) => {
          let acc = 0;
          return series.map((s, si) => {
            const v = s.data[i] || 0;
            const h = (v / top) * ih;
            const x = stacked ? pad.l + bandW * i + (bandW - barW) / 2 : pad.l + bandW * i + (bandW - barW * series.length) / 2 + barW * si;
            const yy = stacked ? pad.t + ih - acc - h : y(v);
            acc += h;
            return <rect key={s.name + i} className="bar" x={x} y={yy} width={barW} height={Math.max(0, h)}
              rx="2" fill={s.color || SERIES(si)}><title>{s.name + " · " + l + " · " + nf.format(v)}</title></rect>;
          });
        })}
      </svg>
      <Legend series={series} />
      <DataTable labels={labels} series={series} caption={label} />
    </div>
  );
}
