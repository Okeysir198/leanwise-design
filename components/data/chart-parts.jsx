export const cx = (...a) => a.filter(Boolean).join(" ");

export const SERIES = (i) => "var(--lw-chart-" + ((i % 8) + 1) + ")";
export const nf = new Intl.NumberFormat();

/* Every chart ships the numbers behind it. A picture of data is not readable by
   a screen reader, and a one-line summary is not the data — so the table is the
   real content and the SVG is the presentation of it. */
export function DataTable({ labels, series, caption }) {
  return (
    <table className="lw-sr-only">
      <caption>{caption}</caption>
      <thead><tr><th scope="col">Category</th>{series.map(s => <th key={s.name} scope="col">{s.name}</th>)}</tr></thead>
      <tbody>
        {labels.map((l, i) => (
          <tr key={l}><th scope="row">{l}</th>{series.map(s => <td key={s.name}>{nf.format(s.data[i])}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}

export function Legend({ series }) {
  if (series.length < 2) return null;
  return (
    <div className="lw-chart-legend">
      {series.map((s, i) => (
        <span key={s.name}><i style={{ background: s.color || SERIES(i) }} />{s.name}</span>
      ))}
    </div>
  );
}

export const ticks = (max, n = 4) => {
  const step = Math.pow(10, Math.floor(Math.log10(max / n || 1)));
  const s = Math.ceil(max / n / step) * step;
  return Array.from({ length: n + 1 }, (_, i) => i * s);
};

/* The plot FRAME. Both charts derived `w`/`pad`/`ts`/`top`/`iw`/`ih`/`y` with
   byte-identical arithmetic, and drew the same grid + y-axis block — so the
   plot geometry had two homes and could drift into two different charts.
   Everything x-axis stays with the caller: bars band, lines interpolate. */
export const CHART_W = 640;
export const CHART_PAD = { t: 8, r: 8, b: 22, l: 40 };

export function frame(max, height) {
  const pad = CHART_PAD, w = CHART_W;
  const ts = ticks(max);
  const top = ts[ts.length - 1];
  const iw = w - pad.l - pad.r, ih = height - pad.t - pad.b;
  return { w, pad, ts, top, iw, ih, y: (v) => pad.t + ih - (v / top) * ih };
}

/** Grid lines and the y-axis labels — the half of the axis that is shared. */
export function Grid({ f }) {
  return (
    <>
      <g className="grid">{f.ts.map(v => <line key={v} x1={f.pad.l} x2={f.w - f.pad.r} y1={f.y(v)} y2={f.y(v)} />)}</g>
      <g className="axis">
        {f.ts.map(v => <text key={v} x={f.pad.l - 6} y={f.y(v) + 3} textAnchor="end">{nf.format(v)}</text>)}
      </g>
    </>
  );
}
