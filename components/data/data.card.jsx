const LW = window.LeanWiseDesign_f2d907;

const { Table, KpiTile, StatMeter, EmptyState, Console, CodeBlock, Grid, Stack, Button, Chip } = LW;
const cols = [
  {key:"src",label:"Source"},{key:"docs",label:"Docs",num:true},
  {key:"hit",label:"Hit rate",num:true},{key:"st",label:"Status"}
];
const rows = [
  {id:1,src:"Contracts / 2024",docs:"1,284",hit:"94.2%",st:<Chip tone="success">live</Chip>},
  {id:2,src:"Policy handbook",docs:"312",hit:"88.7%",st:<Chip tone="success">live</Chip>},
  {id:3,src:"Support transcripts",docs:"9,015",hit:"71.4%",st:<Chip tone="warning">stale</Chip>},
  {id:4,src:"Legacy wiki",docs:"476",hit:"—",st:<Chip tone="danger">failed</Chip>}
];
function Demo() {
  return (
    <Stack gap={16}>
      {/* min=200, not 176: the delta sits BESIDE the number, so a tile has to
          hold "840ms" + "↓ 60ms" + the gap on one line. At 176 the p95 tile
          landed on exactly 138px of 138px and tipped into the wrap fallback on
          sub-pixel rounding — a specimen resting on the boundary teaches the
          layout the component documents as wrong. `note` is demonstrated on
          StatMeter's `foot` instead: at any tile width that fits three across,
          a noted delta cannot stay inline. */}
      <Grid min={200}>
        <KpiTile label="Queries / day" icon="search" value="18.4k" delta="12.1%" direction="up" />
        <KpiTile label="Grounded" icon="shield" accent="success" value="97.3%" delta="0.4pt" direction="up" />
        <KpiTile label="p95 latency" icon="clock" value="840ms" delta="60ms" direction="down" tone="success" />
      </Grid>
      <Grid min={190}>
        {/* The delta carries no ▲: `direction` draws the arrow from the icon set,
            so a typed triangle would be a second, differently-drawn arrow beside
            the real one — and the one that never picks up a stroke-weight change. */}
        <StatMeter label="controls current" value="94" unit="%" delta="6 pts" direction="up" percent={94} target={90} foot="Target 90% · 30-day trend" interactive />
        <StatMeter label="evidence expiring" value="6" delta="4" direction="up" percent={18} tone="warning" foot="Of 34 artefacts · next in 9 days" interactive />
      </Grid>
      <Table columns={cols} rows={rows} caption="Indexed sources" />
      {/* `cells`, not a space-padded string: the fields align because they ARE
          columns. Padding mono text with runs of spaces looks aligned in the
          source and breaks the moment one value is longer than guessed.
          The details are kept short DELIBERATELY: this specimen sits in a
          ~374px half-panel, and a last field wider than its track wraps
          mid-phrase, which is the one thing the columns exist to prevent. A
          reference example has to fit the box it is demonstrated in — hence
          minute-precision stamps here rather than seconds, which buys the
          detail column the ~24px it needs. */}
      <Console url="ops.leanwise.ai/index" lines={[
        {t:"09:14",cells:["embed","contracts/2024",{text:"1,284 docs",num:true}],tone:"success"},
        {t:"09:15",cells:["reindex","policy-handbook",{text:"312 docs",num:true}],tone:"success"},
        {t:"09:15",cells:["skip","legacy-wiki",{text:"parser timeout"}],tone:"warning"},
        {t:"09:16",cells:["fail","legacy-wiki",{text:"4 unreadable"}],tone:"danger"}
      ]} />
      {/* Raw `code`, so the copy control is on by default — a snippet a reader
          has to select by hand is a snippet they mis-copy. */}
      <CodeBlock filename="theme.js" lang="js" code={'const theme = brandVars("#0C727B");'} />
      <EmptyState icon="check" title="No evaluations yet"
        description="Run a suite against this index to see grounding and citation accuracy over time."
        action={<Button size="sm" style={{marginTop:4}}>Run first evaluation</Button>} />
    </Stack>
  );
}
ReactDOM.createRoot(document.getElementById("light")).render(<Demo />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Demo />);
