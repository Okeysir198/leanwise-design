const LW = window.LeanWiseDesign_f2d907;

const { Stack, Cluster, Grid, Split } = LW;
const B = ({children}) => <div className="demo">{children}</div>;
ReactDOM.createRoot(document.getElementById("root")).render(
  <Stack gap={24}>
    <div><span className="lbl-eyebrow">Stack gap={24}</span><Stack gap={8} style={{marginTop:8}}><B>row</B><B>row</B><B>row</B></Stack></div>
    <div><span className="lbl-eyebrow">Cluster — wraps, never overflows</span><Cluster gap={8} style={{marginTop:8}}>
      {["all","contracts","policies","transcripts","email","tickets","wiki"].map(t=><B key={t}>{t}</B>)}</Cluster></div>
    <div><span className="lbl-eyebrow">Grid min=180px — auto-fit, no breakpoint</span><Grid min={180} style={{marginTop:8}}>
      {[1,2,3,4,5].map(i=><B key={i}>col {i}</B>)}</Grid></div>
    <div><span className="lbl-eyebrow">Split rail=260 — one column below 1024px</span><Split rail={260} style={{marginTop:8}}>
      <B>main</B><B>rail</B></Split></div>
  </Stack>
);
