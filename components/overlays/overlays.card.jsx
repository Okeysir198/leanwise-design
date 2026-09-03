const LW = window.LeanWiseDesign_f2d907;

const { Dialog, Drawer, Toast, ToastRegion, Tooltip, Button, Stack, Cluster, Field, Input } = LW;
function Demo() {
  const [open, setOpen] = React.useState(false);
  const [drawer, setDrawer] = React.useState(false);
  return (
    <Stack gap={14}>
      <span className="lbl-eyebrow">dialog</span>
      <Cluster><Button onClick={()=>setOpen(true)}>Open dialog</Button>
        <Button variant="ghost" onClick={()=>setDrawer(true)}>Open drawer</Button>
        <Tooltip tip="Hints only — never content the user needs"><Button variant="ghost" size="sm">Hover me</Button></Tooltip>
      </Cluster>
      <Dialog open={open} onClose={()=>setOpen(false)} title="Re-index this source?"
        description="41,208 chunks will be re-embedded. Queries keep serving the current index until the new one passes evaluation."
        footer={<><Button variant="ghost" onClick={()=>setOpen(false)}>Cancel</Button><Button onClick={()=>setOpen(false)}>Re-index</Button></>}>
        <div style={{marginTop:14}}><Field label="Confirm the source name" htmlFor="cf"><Input id="cf" placeholder="contracts/2024" /></Field></div>
      </Dialog>
      <Drawer open={drawer} onClose={()=>setDrawer(false)} title="contracts/2024"
        description="Last indexed 4 hours ago. 41,208 chunks across 1,284 documents."
        footer={<><Button variant="ghost" onClick={()=>setDrawer(false)}>Close</Button><Button onClick={()=>setDrawer(false)}>Re-index</Button></>}>
        <div style={{marginTop:14}}><Field label="Rename source" htmlFor="rn"><Input id="rn" defaultValue="contracts/2024" /></Field></div>
      </Drawer>
      <span className="lbl-eyebrow">toasts — status is a word, not only a colour</span>
      <Stack gap={8}>
        <Toast tone="success">Index rebuilt. 1,284 documents, 41,208 chunks.</Toast>
        <Toast tone="warning">3 documents skipped — unsupported encoding.</Toast>
        <Toast tone="danger">Embedding failed after 2 retries.</Toast>
      </Stack>
    </Stack>
  );
}
ReactDOM.createRoot(document.getElementById("light")).render(<Demo />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Demo />);
