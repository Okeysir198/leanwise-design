const LW = window.LeanWiseDesign_f2d907;
const { PlanCard, CompareTable, Grid, Segmented, Eyebrow } = LW;

const core = [
  { label: "Grounded answers with the source passage attached" },
  { label: "Document ingest — PDF, DOCX, XLSX" },
  { label: "Retrieval evaluation on your own fixtures" },
];

ReactDOM.createRoot(document.getElementById("plans")).render(
  <Grid min={260}>
    <PlanCard
      name="Pilot"
      tagline="one team, one corpus"
      desc="Everything needed to decide whether the answers hold up on your own documents."
      features={[...core, { label: "SSO / SAML", included: false }, { label: "Dedicated tenancy", included: false }]}
      cta={{ label: "Start a pilot", href: "#" }}
    />
    <PlanCard
      featured
      ribbon="Most chosen"
      name="Team"
      price="$390"
      unit="USD"
      period="/ month"
      desc="For a department running review as part of its normal week."
      features={[...core, { label: "SSO / SAML" }, { label: "Dedicated tenancy", included: false }]}
      cta={{ label: "Book a walkthrough", href: "#" }}
    />
    <PlanCard
      name="Enterprise"
      tagline="scoped per deployment"
      desc="Priced against the corpus, the residency requirement and the review volume — so there is no list price to print, and none is printed."
      features={[...core, { label: "SSO / SAML" }, { label: "Dedicated tenancy" }]}
      cta={{ label: "Talk to us", href: "#" }}
    />
    <PlanCard
      data-band="dark"
      name="Enterprise"
      tagline="the same card, one attribute"
      desc="data-band=&quot;dark&quot; — not one child carries a dark variant."
      features={[...core, { label: "SSO / SAML" }, { label: "Dedicated tenancy" }]}
      cta={{ label: "Talk to us", href: "#" }}
    />
  </Grid>
);

/* `.lw-plans-head` is a COMPOSITION, not a component: an eyebrow, the existing
   Segmented and an optional pill. Segmented is controlled, so the billing
   period is the consumer's state — which is the point. A `BillingToggle` would
   have owned that state and been a second treatment of one interaction. */
function PlansHead() {
  const [period, setPeriod] = React.useState("annual");
  return (
    <div className="lw-plans-head">
      <Eyebrow>Billing period</Eyebrow>
      <Segmented
        label="Billing period"
        options={[{ value: "monthly", label: "Monthly" }, { value: "annual", label: "Annual" }]}
        value={period}
        onChange={setPeriod}
      />
      <span className="lw-pill">2 months free on annual</span>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("plans-head")).render(<PlansHead />);

ReactDOM.createRoot(document.getElementById("compare")).render(
  <CompareTable
    caption="What each plan includes. Sticky on both axes; the matrix scrolls, the page does not."
    columns={[
      { key: "pilot", label: "Pilot" },
      { key: "team", label: "Team", featured: true },
      { key: "ent", label: "Enterprise" },
    ]}
    groups={[
      { label: "Retrieval", rows: [
        { label: "Grounded answers with source passages", values: [true, true, true] },
        { label: "Retrieval evaluation on your fixtures", values: [true, true, true] },
        { label: "Corpus size", values: ["10k pages", "250k pages", "scoped"] },
      ] },
      { label: "Access", rows: [
        { label: "SSO / SAML", values: [false, true, true] },
        { label: "Dedicated tenancy", values: [false, false, true] },
        { label: "Data residency", values: [false, false, "on request"] },
      ] },
      { label: "Support", rows: [
        { label: "Named reviewer", values: [false, true, true] },
        { label: "Response target", values: ["2 business days", "1 business day", "scoped"] },
      ] },
    ]}
  />
);
