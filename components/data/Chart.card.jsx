const LW = window.LeanWiseDesign_f2d907;
const { ActivityFeed } = LW;

/* v3.0.0 removed `BarChart` and `LineChart` — no consumer had ever imported
   either, and REVIEW.md's standing note was that the trigger to adopt a chart
   LIBRARY is the third chart type, not a feature request on the first two.
   What did NOT go is the chart CONTRACT: `.lw-chart` and its parts in
   product.css, and the twelve-colour categorical ramp that `check:contrast`
   gates at ΔE ≥ 19 across both themes. Those are public token API, so they
   still need a fixture — this card draws the SVG the wrappers used to draw,
   by hand, which is also what a consumer bringing its own chart library will
   be styling against. */

const nf = new Intl.NumberFormat();
const SERIES = (i) => "var(--lw-chart-" + ((i % 8) + 1) + ")";
const PAD = { t: 8, r: 8, b: 22, l: 40 }, W = 640;

const ticks = (max, n = 4) => {
  const step = Math.pow(10, Math.floor(Math.log10(max / n || 1)));
  const s = Math.ceil(max / n / step) * step;
  return Array.from({ length: n + 1 }, (_, i) => i * s);
};
function frame(max, height) {
  const ts = ticks(max), top = ts[ts.length - 1];
  const iw = W - PAD.l - PAD.r, ih = height - PAD.t - PAD.b;
  return { ts, top, iw, ih, y: (v) => PAD.t + ih - (v / top) * ih };
}

/* The numbers behind the picture. A chart is not readable by a screen reader,
   so the table is the real content and the SVG is a presentation of it. */
const DataTable = ({ labels, series, caption }) => (
  <table className="lw-sr-only">
    <caption>{caption}</caption>
    <thead><tr><th scope="col">Category</th>{series.map((s, i) => <th key={i} scope="col">{s.name}</th>)}</tr></thead>
    <tbody>{labels.map((l, i) => (
      <tr key={i}><th scope="row">{l}</th>{series.map((s, si) => <td key={si}>{nf.format(s.data[i])}</td>)}</tr>
    ))}</tbody>
  </table>
);

const Legend = ({ series }) => (
  <div className="lw-chart-legend">
    {series.map((s, i) => <span key={i}><i style={{ "--lw-swatch": SERIES(i) }} />{s.name}</span>)}
  </div>
);

const Grid = ({ f }) => (<>
  <g className="grid">{f.ts.map((v, i) => <line key={i} x1={PAD.l} x2={W - PAD.r} y1={f.y(v)} y2={f.y(v)} />)}</g>
  <g className="axis">{f.ts.map((v, i) => <text key={i} x={PAD.l - 6} y={f.y(v) + 3} textAnchor="end">{nf.format(v)}</text>)}</g>
</>);

const labels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const NOW = new Date(2026,6,30,14,0,0).getTime();

function Bars({ label, series, height = 170 }) {
  const totals = labels.map((_, i) => series.reduce((n, s) => n + s.data[i], 0));
  const f = frame(Math.max(...totals), height);
  const band = f.iw / labels.length, bw = band * 0.56;
  return (
    <div className="lw-chart-wrap">
      <svg className="lw-chart" viewBox={`0 0 ${W} ${height}`} role="img" aria-label={label}>
        <Grid f={f} />
        {labels.map((l, i) => {
          let acc = 0;
          return (
            <g key={i}>
              {series.map((s, si) => {
                const y0 = f.y(acc), y1 = f.y(acc + s.data[i]); acc += s.data[i];
                return <rect key={si} className="bar" x={PAD.l + i * band + (band - bw) / 2} y={y1}
                  width={bw} height={Math.max(0, y0 - y1)} fill={SERIES(si)} />;
              })}
            </g>
          );
        })}
        <g className="axis">{labels.map((l, i) => (
          <text key={i} x={PAD.l + i * band + band / 2} y={height - 6} textAnchor="middle">{l}</text>
        ))}</g>
      </svg>
      <Legend series={series} />
      <DataTable labels={labels} series={series} caption={label} />
    </div>
  );
}

function Lines({ label, series, height = 170 }) {
  const f = frame(Math.max(...series.flatMap(s => s.data)), height);
  const x = (i) => PAD.l + (i / (labels.length - 1)) * f.iw;
  return (
    <div className="lw-chart-wrap">
      <svg className="lw-chart" viewBox={`0 0 ${W} ${height}`} role="img" aria-label={label}>
        <Grid f={f} />
        {series.map((s, si) => (
          <g key={si}>
            <path className="line" d={s.data.map((v, i) => (i ? "L" : "M") + x(i) + " " + f.y(v)).join(" ")} stroke={SERIES(si)} />
            {s.data.map((v, i) => <circle key={i} className="dot" cx={x(i)} cy={f.y(v)} r={3} fill={SERIES(si)} />)}
          </g>
        ))}
        <g className="axis">{labels.map((l, i) => (
          <text key={i} x={x(i)} y={height - 6} textAnchor="middle">{l}</text>
        ))}</g>
      </svg>
      <Legend series={series} />
      <DataTable labels={labels} series={series} caption={label} />
    </div>
  );
}

function Demo(){
  return (<>
    <div><span className="lbl-eyebrow lbl-above">queries by ground — stacked</span>
      <Bars label="Queries by grounding, last 7 days"
        series={[{name:"Grounded",data:[820,910,1180,1040,1320,410,300]},{name:"Ungrounded",data:[120,90,160,140,180,60,40]}]} />
    </div>
    <div><span className="lbl-eyebrow lbl-above">p95 latency</span>
      <Lines label="p95 latency in ms, last 7 days"
        series={[{name:"Retrieval",data:[180,172,210,190,240,150,140]},{name:"Generation",data:[420,400,460,430,510,380,360]}]} />
    </div>
    <div><span className="lbl-eyebrow lbl-above">activity</span>
      <ActivityFeed now={NOW} items={[
        {title:"Index rebuilt for contracts/2024", when:NOW-1000*60*8, meta:"41,208 chunks", icon:"check", tone:"success", unread:true},
        {title:"3 documents skipped — unsupported encoding", when:NOW-1000*60*95, icon:"alert", tone:"warning", unread:true},
        {title:"R. Okafor invited J. Tran to the workspace", when:NOW-1000*60*60*26, icon:"users"},
        {title:"Embedding failed after 2 retries", when:NOW-1000*60*60*72, icon:"x-circle", tone:"danger"},
      ]} />
    </div>
  </>);
}
ReactDOM.createRoot(document.getElementById("light")).render(<Demo />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Demo />);
