const LW = window.LeanWiseDesign_f2d907;
const { Dialog, OverlayProvider, Button, Field, Input } = LW;
function Demo() {
  // Always open: the specimen IS the open state. Closing (Esc, the scrim, the
  // close control) just reopens it, so the gates never shoot an empty pane.
  const [open, setOpen] = React.useState(true);
  React.useEffect(() => { if (!open) setOpen(true); }, [open]);
  return (
    <OverlayProvider>
      <p className="lbl-eyebrow">dialog, open</p>
      <Dialog open={open} onClose={() => setOpen(false)} title="Re-index this source?"
        description="41,208 chunks will be re-embedded. Queries keep serving the current index until the new one passes evaluation."
        footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Re-index</Button></>}>
        <div style={{ marginTop: 14 }}><Field label="Confirm the source name" htmlFor="cf"><Input id="cf" placeholder="contracts/2024" /></Field></div>
      </Dialog>
    </OverlayProvider>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<Demo />);
