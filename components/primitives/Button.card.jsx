const { Button, Icon } = window.LeanWiseDesign_f2d907;
const VARIANTS = ["brand", "cta", "ink", "ghost", "danger", "link"];
function Matrix({ ns }) {
  return (
    <div className="mx">
      <span className="hd"></span><span className="hd">rest</span><span className="hd">hover me</span>
      <span className="hd">loading</span><span className="hd">disabled</span>
      {VARIANTS.map((v) => (
        <React.Fragment key={v}>
          <span className="hd">{v}</span>
          <span className="cell"><Button variant={v}>Ask</Button></span>
          <span className="cell"><Button variant={v}>Ask</Button></span>
          <span className="cell"><Button variant={v} loading>Ask</Button></span>
          <span className="cell"><Button variant={v} disabled>Ask</Button></span>
        </React.Fragment>
      ))}
      <span className="hd">sizes</span>
      <span className="cell" style={{ gridColumn: "2 / -1" }}>
        <Button size="sm">Small</Button><Button size="md">Medium</Button><Button size="lg">Large</Button>
        <Button iconOnly aria-label="Settings"><Icon name="settings" size={17} /></Button>
        <Button size="sm" iconOnly aria-label="Close"><Icon name="close" size={15} /></Button>
        <Button href="#" variant="link">A link that is a button</Button>
      </span>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("light")).render(<Matrix ns="l" />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Matrix ns="d" />);
