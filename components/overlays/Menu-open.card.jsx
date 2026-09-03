const LW = window.LeanWiseDesign_f2d907;
const { Popover, Menu, Button, Stack, Cluster, Field, Input, Switch } = LW;

const items = [
  { type: "label", label: "This source" },
  { value: "open", label: "Open in workbench", icon: "external", kbd: "⌘O" },
  { value: "reindex", label: "Re-index", icon: "retry" },
  { value: "export", label: "Export chunks", icon: "download", kbd: "⌘E", disabled: true },
  { type: "separator" },
  { value: "pin", label: "Pin to sidebar", icon: "pin", checked: true },
  { value: "watch", label: "Watch for changes", icon: "eye", checked: false },
  { type: "separator" },
  { value: "delete", label: "Delete source", icon: "trash", danger: true },
];

/* The light pane opens a MENU, the dark pane a POPOVER, so one card covers both
   surfaces and the scope mirror is exercised on the one that is easiest to get
   wrong: a padded content panel with form controls, on a dark band. */
function MenuDemo() {
  return (
    <Stack gap={14}>
      <span className="lbl-eyebrow">menu — open on load</span>
      <Cluster>
        <Menu items={items} label="Source actions" defaultOpen
          trigger={<Button variant="ghost" size="sm">Actions</Button>} />
      </Cluster>
    </Stack>
  );
}
function PopoverDemo() {
  return (
    <Stack gap={14}>
      <span className="lbl-eyebrow">popover — open on load, on a dark band</span>
      <Cluster><Popover padded label="Filter results" placement="bottom-start" defaultOpen autoFocus={false}
        trigger={<Button variant="ghost" size="sm">Filters</Button>}>
        <Stack gap={12}>
          <Field label="Minimum score" htmlFor="ms-dark"><Input id="ms-dark" placeholder="0.72" /></Field>
          <Switch label="Only grounded answers" defaultChecked />
        </Stack>
      </Popover></Cluster>
    </Stack>
  );
}
ReactDOM.createRoot(document.getElementById("light")).render(<MenuDemo />);
ReactDOM.createRoot(document.getElementById("dark")).render(<PopoverDemo />);
