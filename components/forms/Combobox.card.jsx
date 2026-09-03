const LW = window.LeanWiseDesign_f2d907;
const { Combobox, Field, Stack } = LW;

const sources = [
  { value: "contracts", label: "contracts/2024", meta: "41,208" },
  { value: "handbook", label: "policies/handbook", meta: "3,860" },
  { value: "tickets", label: "support/tickets", meta: "12,004" },
  { value: "specs", label: "product/specs", meta: "8,412" },
  { value: "legal", label: "legal/archive", meta: "0", disabled: true },
];

function Demo() {
  const [one, setOne] = React.useState("handbook");
  const [many, setMany] = React.useState(["contracts", "tickets"]);
  return (
    <Stack gap={16}>
      <Field label="Source" help="Type to filter. Arrows move, Enter picks.">
        <Combobox options={sources} value={one} onChange={setOne} placeholder="Choose a source" label="Source" />
      </Field>
      <Field label="Include in this query" help="Backspace removes the last token; each token has its own control.">
        <Combobox multiple options={sources} value={many} onChange={setMany} placeholder="Add sources" label="Include in this query" />
      </Field>
      <Field label="Restricted" error="Pick a source you have access to.">
        <Combobox options={sources} invalid placeholder="No access" label="Restricted" />
      </Field>
    </Stack>
  );
}
ReactDOM.createRoot(document.getElementById("light")).render(<Demo />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Demo />);
