const LW = window.LeanWiseDesign_f2d907;
const { Popover, Menu, Button, Stack, Cluster, Field, Input, Switch } = LW;

const items = [
  { type: "label", label: "This source" },
  { value: "open", label: "Open in workbench", icon: "external", kbd: "\u2318O" },
  { value: "reindex", label: "Re-index", icon: "retry" },
  { value: "export", label: "Export chunks", icon: "download", kbd: "\u2318E" },
  { type: "separator" },
  { value: "pin", label: "Pin to sidebar", icon: "pin", checked: true },
  { value: "watch", label: "Watch for changes", icon: "eye", checked: false },
  { type: "separator" },
  { value: "delete", label: "Delete source", icon: "trash", danger: true },
];

function Demo() {
  const [last, setLast] = React.useState(null);
  return (
    <Stack gap={14}>
      <span className="lbl-eyebrow">menu — arrows, Home/End, typeahead, Esc</span>
      <Cluster>
        <Menu items={items} label="Source actions" onSelect={(v) => setLast(v)}
          trigger={<Button variant="ghost" size="sm">Actions</Button>} />
        <Menu items={items} label="Source actions" placement="bottom-end"
          onSelect={(v) => setLast(v)}
          trigger={<Button variant="ghost" size="sm" iconOnly aria-label="More"><span className="lw-icon">&#8942;</span></Button>} />
        <Menu items={items} label="Source actions" placement="top-start"
          onSelect={(v) => setLast(v)}
          trigger={<Button variant="ghost" size="sm">Above (flips if it will not fit)</Button>} />
      </Cluster>
      <span className="lbl-eyebrow">popover — arbitrary content, {last ? "last chose: " + last : "nothing chosen yet"}</span>
      <Cluster><Popover padded label="Filter results" placement="bottom-start"
        trigger={<Button variant="ghost" size="sm">Filters</Button>}>
        <Stack gap={12}>
          <Field label="Minimum score" htmlFor="ms"><Input id="ms" placeholder="0.72" /></Field>
          <Switch label="Only grounded answers" defaultChecked />
        </Stack>
      </Popover></Cluster>
    </Stack>
  );
}
ReactDOM.createRoot(document.getElementById("light")).render(<Demo />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Demo />);
