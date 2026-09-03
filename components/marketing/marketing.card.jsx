const LW = window.LeanWiseDesign_f2d907;

const { Hero, FeatureGrid, StoryCard, LogoRail, Button, Stack, Grid } = LW;
const { Steps, Quote, Byline, ArticleCard } = LW;
const { Tabs, Pagination, EmptyState, Table } = LW;
ReactDOM.createRoot(document.getElementById("hero")).render(
  <Hero eyebrow="Retrieval you can audit"
    title={<>Answers your legal team can <em>defend</em>.</>}
    lead="LeanWise grounds every response in your own documents, and shows the passage it came from — so an answer is a starting point for review, not a claim you have to trust."
    actions={<><Button variant="cta" size="lg">Book a walkthrough</Button><Button variant="ghost" size="lg">Read the spec</Button></>}
    /* The band proof, and it has to be a REAL component painting from ROLE
       tokens rather than a styled div, or it proves nothing about what ships.
       `.lw-byline .name` is --lw-fg and `.role`/`.date` are --lw-fg-subtle.
       Through v1.3.0 `.lw-hero-dark` was not in tokens.css's band list, so
       inside a hero those resolved against the LIGHT palette on navy paper:
       near-black at ~1.5:1 and #656B78 at 3.36:1. Two serious axe failures,
       and no gate had ever had a role-token consumer inside a hero to see it. */
    aside={<Byline name="A. Rossi" role="Head of Legal Ops" date="4 August 2026" dateTime="2026-08-04" />} />
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Stack gap={32} style={{paddingTop:24}}>
    <FeatureGrid features={[
      {title:"Grounded by default",body:"Every claim carries the passage it came from. No citation, no answer.",href:"#"},
      {title:"Hybrid retrieval",body:"Semantic and keyword search over one index, reranked before the model sees it.",href:"#"},
      {title:"Evaluated continuously",body:"Grounding and citation accuracy tracked per source, per release.",href:"#"}]} />
    <Grid min={280}>
      <StoryCard title="Northwind Legal" result="61% faster contract review"
        body="Cut first-pass review from 40 minutes to 15 across a 1,200-agreement portfolio." />
      <StoryCard title="Kestrel Data" result="Zero ungrounded answers"
        body="Every response in the pilot cited a retrievable passage."
        quote="We stopped arguing about whether the model was right and started checking the page it pointed at."
        person="A. Rossi" role="Head of Legal Ops" />
    </Grid>
    <div><span className="lbl-eyebrow">logo rail — a card, not a real customer list</span>
      <LogoRail logos={[{name:"Northwind"},{name:"Orbital"},{name:"Kestrel"},{name:"Vantage"},{name:"Meridian"}]} /></div>
  </Stack>
);

const steps = [
  { meta: "Phase 01", title: "Point it at a corpus", body: "One folder, one bucket or one connector. Nothing is copied out of your tenant." },
  { meta: "Phase 02", title: "Index and evaluate", body: "Hybrid retrieval over one index, then a grounding pass that scores what came back." },
  { meta: "Phase 03", title: "Answer with the passage attached", body: "No citation, no answer — the rule is enforced in the pipeline, not in review." }
];

ReactDOM.createRoot(document.getElementById("editorial")).render(
  <Stack gap={32}>
    <div>
      <span className="lbl-eyebrow">steps — vertical (a company timeline / how it works)</span>
      <Steps items={steps} />
    </div>
    <div>
      <span className="lbl-eyebrow">steps — horizontal, same markup, reverts to the stack under --lw-bp-md</span>
      <Steps items={steps} orientation="horizontal" />
    </div>
    <div>
      <span className="lbl-eyebrow">quote — the standalone pull quote; the spine is shared with StoryCard</span>
      <Quote name="A. Rossi" role="Head of Legal Ops">
        We stopped arguing about whether the model was right and started checking the page it pointed at.
      </Quote>
    </div>
    <div>
      <span className="lbl-eyebrow">article head — .lw-eyebrow / .lw-h1 / .lw-lead / .lw-pill.lw-pill-link, plus .lw-byline</span>
      <div className="lw-article-head">
        <span className="lw-eyebrow">Engineering</span>
        <h2 className="lw-h1">What a grounded answer actually costs.</h2>
        <p className="lw-lead">Every citation is a retrieval, a rerank and a second pass over the passage. Here is the budget, measured on our own fixtures.</p>
        <div className="lw-cluster">
          <a className="lw-pill lw-pill-link" href="#">Retrieval</a>
          <a className="lw-pill lw-pill-link" href="#">Evaluation</a>
          <a className="lw-pill lw-pill-link" href="#">Benchmarks</a>
        </div>
        <Byline name="A. Rossi" role="Head of Legal Ops" date="4 August 2026" dateTime="2026-08-04" />
      </div>
    </div>
    <div>
      <span className="lbl-eyebrow">table — promoted to base.css in v1.7.0; a marketing page that argues from evidence has to show the evidence</span>
      <Table
        caption="Field-extraction accuracy by document type"
        columns={[
          { key: "type", header: "Document type" },
          { key: "score", header: "Accuracy", num: true },
          { key: "n", header: "Samples", num: true },
        ]}
        rows={[
          { type: "Test Report", score: "96.5%", n: "292" },
          { type: "Self Declaration", score: "86.1%", n: "20" },
          { type: "Bill of Materials", score: "100.0%", n: "2" },
        ]}
      />
    </div>
    <div>
      <span className="lbl-eyebrow">article index chrome — Tabs, Pagination and EmptyState, all promoted to base.css in v1.3.1</span>
      <Stack gap={20}>
        <Tabs label="Article categories" tabs={[{value:"all",label:"All",count:24},{value:"eng",label:"Engineering",count:11},{value:"prod",label:"Product",count:9},{value:"none",label:"Archive",count:0}]} value="none" />
        <EmptyState icon="inbox" title="No articles in Archive"
          description="Nothing has been archived yet. Published posts stay in All until you move them."
          action={<Button variant="ghost" size="sm">Back to all</Button>} />
        <Pagination page={2} pageSize={10} total={24} onPageChange={() => {}} />
      </Stack>
    </div>
    <div>
      <span className="lbl-eyebrow">article index — Grid of ArticleCard; no .lw-post class exists or is needed</span>
      <Grid min={280}>
        <ArticleCard href="#" category="Engineering" title="What a grounded answer actually costs"
          dek="The retrieval, the rerank and the second pass, measured on our own fixtures."
          tags={["Retrieval", "Benchmarks"]} author="A. Rossi" role="Head of Legal Ops"
          date="4 Aug 2026" dateTime="2026-08-04" readTime="7 min read" />
        <ArticleCard href="#" category="Product" title="Why every answer carries its passage"
          dek="No citation, no answer — enforced in the pipeline rather than in review."
          tags={["Grounding"]} author="M. Chen" role="Engineering" date="21 Jul 2026" dateTime="2026-07-21" readTime="4 min read" />
      </Grid>
    </div>
  </Stack>
);
