const { Input, Select, Textarea, Switch, Checkbox, Segmented, Stack, Icon } = window.LeanWiseDesign_f2d907;

/* The `InputGroup` wrapper was removed in v3.0.0; `.lw-input-group` was not.
   The state matrix below is why the rule needs a fixture at all — it is where
   the invalid affix border was caught. */
const Group = ({ prefix, suffix, children, ...rest }) => (
  <div className="lw-input-group" {...rest}>
    {prefix && <span className="affix">{prefix}</span>}
    {children}
    {suffix && <span className="affix mono">{suffix}</span>}
  </div>
);
function Matrix({ ns }) {
  const [seg, setSeg] = React.useState("hybrid");
  const id = (s) => ns + "-" + s;
  return (
    <div className="mx">
      <span className="hd top"></span><span className="hd top">rest</span>
      <span className="hd top">focus</span>
      <span className="hd top">invalid</span><span className="hd top">disabled</span>

      <span className="hd">input</span>
      <Input defaultValue="acme-legal" aria-label="Workspace" />
      <Input defaultValue="acme-legal" data-focus-demo="" aria-label="Workspace, focused" />
      <Input defaultValue="lw_live_8f2a…" invalid aria-label="Key" />
      <Input defaultValue="acme-legal" disabled aria-label="Workspace, locked" />

      <span className="hd">group</span>
      <Group prefix={<Icon name="search" />} suffix="⌘K"><input placeholder="Find…" aria-label="Search" /></Group>
      <Group prefix={<Icon name="search" />} data-focus-demo=""><input placeholder="Find…" aria-label="Search, focused" /></Group>
      <Group prefix={<Icon name="search" />}><input placeholder="Find…" aria-invalid="true" aria-label="Search" /></Group>
      <Group prefix={<Icon name="search" />}><input placeholder="Find…" disabled aria-label="Search" /></Group>

      <span className="hd">select</span>
      <Select options={["Semantic", "Hybrid", "Keyword"]} aria-label="Mode" />
      <Select options={["Semantic", "Hybrid", "Keyword"]} data-focus-demo="" aria-label="Mode, focused" />
      <Select options={["Semantic", "Hybrid"]} invalid aria-label="Mode" />
      <Select options={["Semantic", "Hybrid"]} disabled aria-label="Mode" />

      <span className="hd">textarea</span>
      <Textarea rows={2} defaultValue="Answer only from the retrieved passages, and cite each one." aria-label="Prompt" />
      <Textarea rows={2} defaultValue="Answer only from the retrieved passages, and cite each one." data-focus-demo="" aria-label="Prompt, focused" />
      <Textarea rows={2} defaultValue="" placeholder="Required" invalid aria-label="Prompt" />
      <Textarea rows={2} defaultValue="Locked by policy." disabled aria-label="Prompt" />

      <span className="hd">switch</span>
      <Switch label="Cite every claim" defaultChecked id={id("s1")} />
      <Switch label="Focused" defaultChecked data-focus-demo="" id={id("s1f")} />
      <Switch label="Off" id={id("s2")} />
      <Switch label="Locked on" defaultChecked disabled id={id("s3")} />

      <span className="hd">checkbox</span>
      <Checkbox label="Re-embed on upload" defaultChecked id={id("c1")} />
      <Checkbox label="Focused" defaultChecked data-focus-demo="" id={id("c1f")} />
      <Checkbox label="Unchecked" id={id("c2")} />
      <Checkbox label="Locked" defaultChecked disabled id={id("c3")} />

      <span className="hd">radio</span>
      <Checkbox radio name={id("r")} label="Strict grounding" defaultChecked />
      <Checkbox radio name={id("rf")} label="Focused" defaultChecked data-focus-demo="" />
      <Checkbox radio name={id("r")} label="Permissive" />
      <Checkbox radio name={id("r2")} label="Unavailable" disabled />

      <span className="hd">segmented</span>
      <div style={{ gridColumn: "2 / -1" }}>
        <Segmented label="Retrieval mode" value={seg} onChange={setSeg}
          options={[{ value: "semantic", label: "Semantic" }, { value: "hybrid", label: "Hybrid" }, { value: "keyword", label: "Keyword" }]} />
      </div>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("light")).render(<Matrix ns="l" />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Matrix ns="d" />);
