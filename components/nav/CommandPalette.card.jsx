const LW = window.LeanWiseDesign_f2d907;
const { CommandPalette, Button, Cluster } = LW;
const commands=[
  {id:1,group:"Sources",label:"Open database",icon:"database",kbd:"⌘O",keywords:["db","connect"]},
  {id:2,group:"Sources",label:"Re-index contracts/2024",icon:"retry"},
  {id:3,group:"Sources",label:"Upload documents",icon:"upload"},
  {id:4,group:"Workspace",label:"Invite a teammate",icon:"users",kbd:"⌘I"},
  {id:5,group:"Workspace",label:"Switch theme",icon:"moon"},
  {id:6,group:"Workspace",label:"Open settings",icon:"settings",kbd:"⌘,"},
  {id:7,group:"Danger",label:"Delete this workspace",icon:"trash"},
];
function Demo(){
  const [open,setOpen]=React.useState(false);
  // Bound HERE, by the host — which is the whole point.
  React.useEffect(()=>{
    const h=(e)=>{ if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();setOpen(o=>!o);} };
    window.addEventListener("keydown",h); return ()=>window.removeEventListener("keydown",h);
  },[]);
  return (<>
    <Cluster><Button onClick={()=>setOpen(true)}>Open palette</Button>
      <span className="lw-menu-kbd">or ⌘K</span></Cluster>
    <CommandPalette open={open} onClose={()=>setOpen(false)} commands={commands} onRun={()=>{}} />
  </>);
}
ReactDOM.createRoot(document.getElementById("root")).render(<Demo />);
