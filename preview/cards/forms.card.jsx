// @dsCard group="Components" name="Forms" subtitle="Input, Textarea, Select, Checkbox, RadioGroup, Switch and Label — stock shadcn" viewport="1000x820"
const {
  Input, Textarea, Label, Checkbox, Switch, RadioGroup, RadioGroupItem,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Button,
} = window.LeanWiseDesign_f2d907;

function Field({ id, label, help, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {help && !error && <p className="text-muted-foreground text-xs">{help}</p>}
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}

lwCard("Forms", "Label above control, help below; an error replaces the help and sets aria-invalid.", (
  <div className="grid grid-cols-2 gap-10">
    <div className="flex flex-col gap-5">
      <Field id="f-name" label="Workspace name" help="Shown to everyone you invite.">
        <Input id="f-name" defaultValue="Acme Legal" />
      </Field>
      <Field id="f-email" label="Billing email" error="Enter a valid email address.">
        <Input id="f-email" type="email" defaultValue="billing@" aria-invalid="true" />
      </Field>
      <Field id="f-region" label="Data region">
        <Select defaultValue="sg">
          <SelectTrigger id="f-region" className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="sg">Singapore</SelectItem>
            <SelectItem value="eu">Frankfurt</SelectItem>
            <SelectItem value="us">Virginia</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field id="f-notes" label="Notes">
        <Textarea id="f-notes" placeholder="Anything the team should know" />
      </Field>
      <Input disabled placeholder="Disabled" aria-label="Disabled input" />
    </div>
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium">Notifications</span>
        <div className="flex items-center gap-2"><Checkbox id="c1" defaultChecked /><Label htmlFor="c1">Weekly digest</Label></div>
        <div className="flex items-center gap-2"><Checkbox id="c2" /><Label htmlFor="c2">Failed ingests</Label></div>
        <div className="flex items-center gap-2"><Checkbox id="c3" disabled /><Label htmlFor="c3">Billing (admin only)</Label></div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium" id="r-label">Answer style</span>
        <RadioGroup defaultValue="cited" aria-labelledby="r-label">
          <div className="flex items-center gap-2"><RadioGroupItem value="cited" id="r1" /><Label htmlFor="r1">Cited</Label></div>
          <div className="flex items-center gap-2"><RadioGroupItem value="brief" id="r2" /><Label htmlFor="r2">Brief</Label></div>
        </RadioGroup>
      </div>
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="s1">Single sign-on</Label>
          <span className="text-muted-foreground text-xs">Require SAML for every member.</span>
        </div>
        <Switch id="s1" defaultChecked />
      </div>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><Button variant="outline">Cancel</Button><Button>Save changes</Button></div>
    </div>
  </div>
));
