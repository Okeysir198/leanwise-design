const { Icon, IconNames } = window.LeanWiseDesign_f2d907;
const names = IconNames || [];
function Sheet() {
  // The card practises what it preaches: an unavailable list says so, in place.
  // An empty grid renders as a 2px rule and reads as "the system has no icons".
  if (!names.length) return (
    <div className="cellx" style={{gridColumn:"1 / -1",color:"var(--lw-danger-on)"}}>
      <span className="nm" style={{color:"inherit",fontSize:11}}>
        IconNames is unavailable — _ds_bundle.js is stale or failed to load. Recompile.
      </span>
    </div>
  );
  return names.map(n => (
    <div className="cellx" key={n}><Icon name={n} size={20} /><span className="nm">{n}</span></div>
  ));
}
function Scale() {
  return [14, 16, 17, 19, 20].map(s => (
    <div className="s" key={s}><Icon name="spark" size={s} /><span>{s}</span></div>
  ));
}
/* Tone ink: the glyph still draws in currentColor — the class only picks which
   tone token feeds it. Inherited ink on the left of each pair, judged ink on
   the right, so the sheet measures the delta and not just the colour. */
function Tones() {
  return [["success","check"],["warning","alert"],["danger","alert"],["info","info"]].map(([t,n]) => (
    <div className="s" key={t}>
      <Icon name={n} size={20} /><Icon name={n} size={20} tone={t} />
      <span>{t}</span>
    </div>
  ));
}
ReactDOM.createRoot(document.getElementById("light")).render(<Sheet />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Sheet />);
ReactDOM.createRoot(document.getElementById("scale")).render(<Scale />);
ReactDOM.createRoot(document.getElementById("tones")).render(<Tones />);
