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

