const LW = window.LeanWiseDesign_f2d907;

const { Field, Input, InputGroup, Textarea, Select, Switch, Checkbox, Segmented, Button, Stack, Cluster, Icon,
        PasswordInput, PasswordMeter, OtpInput } = LW;
function Demo({ns}) {
  const [seg, setSeg] = React.useState("semantic");
  return (
    <Stack gap={16}>
      <Field label="Workspace name" htmlFor={ns+"-a"} required help="Lowercase, no spaces.">
        <Input id={ns+"-a"} defaultValue="acme-legal" />
      </Field>
      <Field label="Retrieval mode" htmlFor={ns+"-b"}>
        <Select id={ns+"-b"} options={["Semantic","Hybrid","Keyword"]} />
      </Field>
      <Field label="API key" htmlFor={ns+"-c"} error="This key was revoked on 12 Jun.">
        <Input id={ns+"-c"} defaultValue="lw_live_8f2a…" invalid />
      </Field>
      <Field label="Search" htmlFor={ns+"-d"}>
        <InputGroup prefix={<Icon name="search" />} suffix="⌘K"><input id={ns+"-d"} placeholder="Find a document…" /></InputGroup>
      </Field>
      <Field label="System prompt" htmlFor={ns+"-e"} optional>
        <Textarea id={ns+"-e"} placeholder="Answer only from the retrieved passages…" />
      </Field>
      <span className="lbl-eyebrow">password · one-time code</span>
      <Field label="Password" htmlFor={ns+"-pw"} help="At least 12 characters.">
        <PasswordInput id={ns+"-pw"} defaultValue="correct horse battery" autoComplete="new-password" />
      </Field>
      <PasswordMeter level={3} label="Strong" />
      <Field label="Six-digit code" htmlFor={ns+"-otp"}>
        <OtpInput id={ns+"-otp"} defaultValue="184" />
      </Field>
      <span className="lbl-eyebrow">switch · checkbox · radio · segmented</span>
      <Stack gap={12}>
        <Switch label="Cite every claim" defaultChecked />
        <Switch label="Allow model fallback" />
        <Checkbox label="Re-embed on upload" defaultChecked />
        <Checkbox radio name={ns+"-r"} label="Strict grounding" defaultChecked />
        <Checkbox radio name={ns+"-r"} label="Permissive" />
        <Segmented label="Mode" value={seg} onChange={setSeg}
          options={[{value:"semantic",label:"Semantic"},{value:"hybrid",label:"Hybrid"},{value:"keyword",label:"Keyword"}]} />
      </Stack>
      <Cluster justify="end"><Button variant="ghost">Cancel</Button><Button>Save changes</Button></Cluster>
    </Stack>
  );
}
ReactDOM.createRoot(document.getElementById("light")).render(<Demo ns="l" />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Demo ns="d" />);
