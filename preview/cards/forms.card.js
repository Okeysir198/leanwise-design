/* GENERATED from forms.card.jsx by scripts/lib/card-build.mjs — do not edit. */
(() => {
  const {
    Field,
    FieldGroup,
    FieldSet,
    FieldLegend,
    FieldLabel,
    FieldDescription,
    FieldError,
    FieldSeparator,
    FieldContent,
    Input,
    Textarea,
    Checkbox,
    Switch,
    RadioGroup,
    RadioGroupItem,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    useForm,
    Controller,
    zodResolver,
    z
  } = window.LeanWiseDesign_f2d907;
  const inviteSchema = z.object({
    email: z.string().email("Enter a valid email address."),
    note: z.string().min(10, "Add at least 10 characters so they know why.").max(200, "Keep it under 200 characters.")
  });
  function InviteForm() {
    const form = useForm({
      resolver: zodResolver(inviteSchema),
      defaultValues: { email: "", note: "" },
      mode: "onTouched"
    });
    React.useEffect(() => {
      form.trigger();
    }, []);
    const onSubmit = () => form.reset();
    return /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(CardTitle, null, "Invite a member"), /* @__PURE__ */ React.createElement(CardDescription, null, "react-hook-form + zod: the error is wired with aria-invalid and aria-describedby.")), /* @__PURE__ */ React.createElement(CardContent, null, /* @__PURE__ */ React.createElement("form", { id: "invite-form", onSubmit: form.handleSubmit(onSubmit) }, /* @__PURE__ */ React.createElement(FieldGroup, null, /* @__PURE__ */ React.createElement(
      Controller,
      {
        name: "email",
        control: form.control,
        render: ({ field, fieldState }) => /* @__PURE__ */ React.createElement(Field, { "data-invalid": fieldState.invalid }, /* @__PURE__ */ React.createElement(FieldLabel, { htmlFor: "invite-email" }, "Email"), /* @__PURE__ */ React.createElement(
          Input,
          {
            ...field,
            id: "invite-email",
            type: "email",
            "aria-invalid": fieldState.invalid,
            "aria-describedby": fieldState.invalid ? "invite-email-error" : void 0,
            autoComplete: "off"
          }
        ), fieldState.invalid && /* @__PURE__ */ React.createElement(FieldError, { id: "invite-email-error", errors: [fieldState.error] }))
      }
    ), /* @__PURE__ */ React.createElement(
      Controller,
      {
        name: "note",
        control: form.control,
        render: ({ field, fieldState }) => /* @__PURE__ */ React.createElement(Field, { "data-invalid": fieldState.invalid }, /* @__PURE__ */ React.createElement(FieldLabel, { htmlFor: "invite-note" }, "Note"), /* @__PURE__ */ React.createElement(
          Textarea,
          {
            ...field,
            id: "invite-note",
            rows: 3,
            "aria-invalid": fieldState.invalid,
            "aria-describedby": fieldState.invalid ? "invite-note-error" : "invite-note-help"
          }
        ), fieldState.invalid ? /* @__PURE__ */ React.createElement(FieldError, { id: "invite-note-error", errors: [fieldState.error] }) : /* @__PURE__ */ React.createElement(FieldDescription, { id: "invite-note-help" }, "Included in the invite email."))
      }
    )))), /* @__PURE__ */ React.createElement(CardFooter, { className: "justify-end gap-2" }, /* @__PURE__ */ React.createElement(Button, { type: "button", variant: "outline", onClick: () => form.reset() }, "Reset"), /* @__PURE__ */ React.createElement(Button, { type: "submit", form: "invite-form" }, "Send invite")));
  }
  lwCard("Forms", "Field owns the label, description and error; horizontal Field for switches and checkboxes. Actions right-aligned, primary last.", /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-10" }, /* @__PURE__ */ React.createElement("form", { onSubmit: (e) => e.preventDefault() }, /* @__PURE__ */ React.createElement(FieldGroup, null, /* @__PURE__ */ React.createElement(FieldSet, null, /* @__PURE__ */ React.createElement(FieldLegend, null, "Workspace"), /* @__PURE__ */ React.createElement(FieldDescription, null, "Shown to everyone you invite."), /* @__PURE__ */ React.createElement(FieldGroup, null, /* @__PURE__ */ React.createElement(Field, null, /* @__PURE__ */ React.createElement(FieldLabel, { htmlFor: "f-name" }, "Workspace name"), /* @__PURE__ */ React.createElement(Input, { id: "f-name", defaultValue: "Acme Legal" })), /* @__PURE__ */ React.createElement(Field, null, /* @__PURE__ */ React.createElement(FieldLabel, { htmlFor: "f-region" }, "Data region"), /* @__PURE__ */ React.createElement(Select, { defaultValue: "sg" }, /* @__PURE__ */ React.createElement(SelectTrigger, { id: "f-region" }, /* @__PURE__ */ React.createElement(SelectValue, null)), /* @__PURE__ */ React.createElement(SelectContent, null, /* @__PURE__ */ React.createElement(SelectItem, { value: "sg" }, "Singapore"), /* @__PURE__ */ React.createElement(SelectItem, { value: "eu" }, "Frankfurt"), /* @__PURE__ */ React.createElement(SelectItem, { value: "us" }, "Virginia"))), /* @__PURE__ */ React.createElement(FieldDescription, null, "Where documents and embeddings are stored.")), /* @__PURE__ */ React.createElement(Field, null, /* @__PURE__ */ React.createElement(FieldLabel, { htmlFor: "f-notes" }, "Notes"), /* @__PURE__ */ React.createElement(Textarea, { id: "f-notes", placeholder: "Anything the team should know" })), /* @__PURE__ */ React.createElement(Field, { "data-disabled": "true" }, /* @__PURE__ */ React.createElement(FieldLabel, { htmlFor: "f-id" }, "Workspace ID"), /* @__PURE__ */ React.createElement(Input, { id: "f-id", disabled: true, defaultValue: "ws_7f3a91" })))), /* @__PURE__ */ React.createElement(FieldSeparator, null), /* @__PURE__ */ React.createElement(FieldSet, null, /* @__PURE__ */ React.createElement(FieldLegend, { variant: "label" }, "Notifications"), /* @__PURE__ */ React.createElement(FieldGroup, { "data-slot": "checkbox-group" }, /* @__PURE__ */ React.createElement(Field, { orientation: "horizontal" }, /* @__PURE__ */ React.createElement(Checkbox, { id: "c1", defaultChecked: true }), /* @__PURE__ */ React.createElement(FieldLabel, { htmlFor: "c1", className: "font-normal" }, "Weekly digest")), /* @__PURE__ */ React.createElement(Field, { orientation: "horizontal" }, /* @__PURE__ */ React.createElement(Checkbox, { id: "c2" }), /* @__PURE__ */ React.createElement(FieldLabel, { htmlFor: "c2", className: "font-normal" }, "Failed ingests")), /* @__PURE__ */ React.createElement(Field, { orientation: "horizontal", "data-disabled": "true" }, /* @__PURE__ */ React.createElement(Checkbox, { id: "c3", disabled: true }), /* @__PURE__ */ React.createElement(FieldLabel, { htmlFor: "c3", className: "font-normal" }, "Billing (admin only)")))))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-8" }, /* @__PURE__ */ React.createElement(FieldGroup, null, /* @__PURE__ */ React.createElement(FieldSet, null, /* @__PURE__ */ React.createElement(FieldLegend, { variant: "label" }, "Answer style"), /* @__PURE__ */ React.createElement(RadioGroup, { defaultValue: "cited" }, /* @__PURE__ */ React.createElement(Field, { orientation: "horizontal" }, /* @__PURE__ */ React.createElement(RadioGroupItem, { value: "cited", id: "r1" }), /* @__PURE__ */ React.createElement(FieldLabel, { htmlFor: "r1", className: "font-normal" }, "Cited")), /* @__PURE__ */ React.createElement(Field, { orientation: "horizontal" }, /* @__PURE__ */ React.createElement(RadioGroupItem, { value: "brief", id: "r2" }), /* @__PURE__ */ React.createElement(FieldLabel, { htmlFor: "r2", className: "font-normal" }, "Brief")))), /* @__PURE__ */ React.createElement(FieldSeparator, null), /* @__PURE__ */ React.createElement(Field, { orientation: "horizontal" }, /* @__PURE__ */ React.createElement(FieldContent, null, /* @__PURE__ */ React.createElement(FieldLabel, { htmlFor: "s1" }, "Single sign-on"), /* @__PURE__ */ React.createElement(FieldDescription, null, "Require SAML for every member.")), /* @__PURE__ */ React.createElement(Switch, { id: "s1", defaultChecked: true })), /* @__PURE__ */ React.createElement(Field, { orientation: "horizontal", className: "justify-end" }, /* @__PURE__ */ React.createElement(Button, { variant: "outline", type: "button" }, "Cancel"), /* @__PURE__ */ React.createElement(Button, { type: "submit" }, "Save changes"))), /* @__PURE__ */ React.createElement(InviteForm, null))));
})();
