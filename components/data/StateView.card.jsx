const LW = window.LeanWiseDesign_f2d907;
const { StateView, Button } = LW;
function Demo(){
  return (<>
    <div className="cell"><StateView variant="empty" title="No sources connected"
      description="Connect a database, a bucket or a folder and its documents become queryable within a few minutes."
      action={<Button size="sm">Connect a source</Button>} /></div>
    <div className="cell"><StateView variant="loading" lines={4} /></div>
    <div className="cell"><StateView variant="error" onAction={()=>{}} /></div>
    <div className="cell"><StateView variant="offline" onAction={()=>{}} /></div>
    <div className="cell" style={{gridColumn:"span 2"}}><StateView variant="denied" /></div>
  </>);
}
ReactDOM.createRoot(document.getElementById("root")).render(<Demo />);
