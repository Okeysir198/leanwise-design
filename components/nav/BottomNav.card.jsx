const LW = window.LeanWiseDesign_f2d907;
const { BottomNav } = LW;
const items=[
  {value:"ask",label:"Ask",icon:"spark"},
  {value:"sources",label:"Sources",icon:"database"},
  {value:"activity",label:"Activity",icon:"bell",badge:3},
  {value:"you",label:"You",icon:"user"},
];
function Demo(){
  const [v,setV]=React.useState("ask");
  return (
    <div style={{border:"1px solid var(--lw-line)",borderRadius:12,overflow:"hidden",background:"var(--lw-bg)"}}>
      <div style={{height:200,display:"grid",placeItems:"center",fontSize:"var(--lw-text-sm)",color:"var(--lw-fg-subtle)"}}>
        {items.find(i=>i.value===v).label}
      </div>
      <BottomNav items={items} value={v} onChange={setV} />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("light")).render(<Demo />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Demo />);
