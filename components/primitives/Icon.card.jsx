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
ReactDOM.createRoot(document.getElementById("light")).render(<Sheet />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Sheet />);
ReactDOM.createRoot(document.getElementById("scale")).render(<Scale />);
