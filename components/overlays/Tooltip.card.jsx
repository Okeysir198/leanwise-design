const LW = window.LeanWiseDesign_f2d907;
const { OverlayProvider, Tooltip, Button, Stack, Cluster } = LW;

function Demo() {
  return (
    <OverlayProvider>
      <Stack gap={14}>
        <span className="lbl-eyebrow">forced open — what assistive tech now reads</span>
        <Cluster>
          <Tooltip tip="Re-index this source (⌘R)" open>
            <Button variant="ghost" size="sm">Re-index</Button>
          </Tooltip>
        </Cluster>
        <span className="lbl-eyebrow">hover or focus — 300ms, then siblings open at once</span>
        <Cluster>
          <Tooltip tip="Open in workbench"><Button variant="ghost" size="sm">Open</Button></Tooltip>
          <Tooltip tip="Export chunks as JSONL" side="bottom"><Button variant="ghost" size="sm">Export</Button></Tooltip>
          <Tooltip tip="Pin to the sidebar" side="right">
            <Button variant="ghost" size="sm" iconOnly aria-label="Pin"><span className="lw-icon">&#9733;</span></Button>
          </Tooltip>
        </Cluster>
      </Stack>
    </OverlayProvider>
  );
}
ReactDOM.createRoot(document.getElementById("light")).render(<Demo />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Demo />);
