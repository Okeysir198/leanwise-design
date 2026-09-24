// @dsCard group="Components" name="Forms" subtitle="Field, FieldSet and FieldGroup over Input, Select, Checkbox, RadioGroup and Switch, plus a react-hook-form + zod form — stock shadcn" viewport="1100x1180"
const {
  Field, FieldGroup, FieldSet, FieldLegend, FieldLabel, FieldDescription, FieldError, FieldSeparator, FieldContent,
  Input, Textarea, Checkbox, Switch, RadioGroup, RadioGroupItem,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Button,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  useForm, Controller, zodResolver, z,
} = window.LeanWiseDesign_f2d907;

const inviteSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  note: z.string().min(10, "Add at least 10 characters so they know why.").max(200, "Keep it under 200 characters."),
});

function InviteForm() {
  const form = useForm({
    resolver: zodResolver(inviteSchema),
    defaultValues: { email: "", note: "" },
    mode: "onTouched",
  });
  React.useEffect(() => { form.trigger(); }, []);
  const onSubmit = () => form.reset();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite a member</CardTitle>
        <CardDescription>react-hook-form + zod: the error is wired with aria-invalid and aria-describedby.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="invite-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="invite-email">Email</FieldLabel>
                  <Input {...field} id="invite-email" type="email" data-a11y-expect="color-contrast" aria-invalid={fieldState.invalid}
                    aria-describedby={fieldState.invalid ? "invite-email-error" : undefined} autoComplete="off" />
                  {fieldState.invalid && <FieldError id="invite-email-error" errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="note"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="invite-note">Note</FieldLabel>
                  <Textarea {...field} id="invite-note" rows={3} data-a11y-expect="color-contrast" aria-invalid={fieldState.invalid}
                    aria-describedby={fieldState.invalid ? "invite-note-error" : "invite-note-help"} />
                  {fieldState.invalid
                    ? <FieldError id="invite-note-error" errors={[fieldState.error]} />
                    : <FieldDescription id="invite-note-help">Included in the invite email.</FieldDescription>}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => form.reset()}>Reset</Button>
        <Button type="submit" form="invite-form">Send invite</Button>
      </CardFooter>
    </Card>
  );
}

lwCard("Forms", "Field owns the label, description and error; horizontal Field for switches and checkboxes. Actions right-aligned, primary last.", (
  <div className="grid grid-cols-2 gap-10">
    <form onSubmit={(e) => e.preventDefault()}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Workspace</FieldLegend>
          <FieldDescription>Shown to everyone you invite.</FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="f-name">Workspace name</FieldLabel>
              <Input id="f-name" defaultValue="Acme Legal" />
            </Field>
            <Field>
              <FieldLabel htmlFor="f-region">Data region</FieldLabel>
              <Select defaultValue="sg">
                <SelectTrigger id="f-region"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sg">Singapore</SelectItem>
                  <SelectItem value="eu">Frankfurt</SelectItem>
                  <SelectItem value="us">Virginia</SelectItem>
                </SelectContent>
              </Select>
              <FieldDescription>Where documents and embeddings are stored.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="f-notes">Notes</FieldLabel>
              <Textarea id="f-notes" placeholder="Anything the team should know" />
            </Field>
            <Field data-disabled="true">
              <FieldLabel htmlFor="f-id">Workspace ID</FieldLabel>
              <Input id="f-id" disabled defaultValue="ws_7f3a91" />
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLegend variant="label">Notifications</FieldLegend>
          <FieldGroup data-slot="checkbox-group">
            <Field orientation="horizontal">
              <Checkbox id="c1" defaultChecked />
              <FieldLabel htmlFor="c1" className="font-normal">Weekly digest</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="c2" />
              <FieldLabel htmlFor="c2" className="font-normal">Failed ingests</FieldLabel>
            </Field>
            <Field orientation="horizontal" data-disabled="true">
              <Checkbox id="c3" disabled />
              <FieldLabel htmlFor="c3" className="font-normal">Billing (admin only)</FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
    <div className="flex flex-col gap-8">
      <FieldGroup>
        <FieldSet>
          <FieldLegend variant="label">Answer style</FieldLegend>
          <RadioGroup defaultValue="cited">
            <Field orientation="horizontal">
              <RadioGroupItem value="cited" id="r1" />
              <FieldLabel htmlFor="r1" className="font-normal">Cited</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <RadioGroupItem value="brief" id="r2" />
              <FieldLabel htmlFor="r2" className="font-normal">Brief</FieldLabel>
            </Field>
          </RadioGroup>
        </FieldSet>
        <FieldSeparator />
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="s1">Single sign-on</FieldLabel>
            <FieldDescription>Require SAML for every member.</FieldDescription>
          </FieldContent>
          <Switch id="s1" defaultChecked />
        </Field>
        <Field orientation="horizontal" className="justify-end">
          <Button variant="outline" type="button">Cancel</Button>
          <Button type="submit">Save changes</Button>
        </Field>
      </FieldGroup>
      <InviteForm />
    </div>
  </div>
));
