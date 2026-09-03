const LW = window.LeanWiseDesign_f2d907;

const { Button, Card, CardHead, CardTitle, CardBody, CardFoot, Chip, Eyebrow, Avatar, Skeleton, Icon } = LW;
function Demo() {
  return (
    <>
      <span className="lbl-eyebrow">buttons</span>
      <div className="lw-cluster">
        <Button variant="cta">Book a walkthrough</Button>
        <Button>View the platform</Button>
        <Button variant="ghost">Docs</Button>
        <Button variant="link">Read the spec <Icon name="arrow-right" size={14} /></Button>
        <Button loading>Saving</Button>
        <Button variant="ghost" iconOnly aria-label="Settings"><Icon name="settings" size={17} /></Button>
      </div>
      <span className="lbl-eyebrow">eyebrow · chips · avatars</span>
      <Eyebrow>Retrieval integrity</Eyebrow>
      <div className="lw-cluster">
        <Chip>indexed</Chip><Chip tone="success">passing</Chip><Chip tone="warning">stale</Chip>
        <Chip tone="danger">failed</Chip><Chip tone="neutral">draft</Chip>
        <Avatar name="Minh Tran" size="sm" /><Avatar name="Ana Rossi" /><Avatar name="Leanwise Ops" size="lg" />
      </div>
      <span className="lbl-eyebrow">card · skeleton</span>
      <div className="lw-grid" style={{"--lw-grid-min":"200px"}}>
        <Card interactive glow>
          <CardHead><CardTitle>Contract corpus</CardTitle><Chip tone="success">live</Chip></CardHead>
          <CardBody>1,284 documents, re-embedded nightly.</CardBody>
          <CardFoot><span className="lw-mono" style={{fontSize:11,color:"var(--lw-fg-subtle)"}}>v4 · 12m ago</span></CardFoot>
        </Card>
        <Card><CardHead><CardTitle>Loading</CardTitle></CardHead><Skeleton lines={3} /></Card>
      </div>
    </>
  );
}
ReactDOM.createRoot(document.getElementById("light")).render(<Demo />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Demo />);
