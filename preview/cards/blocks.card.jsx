// @dsCard group="Blocks" name="Section cards, state, upload" subtitle="Stock dashboard-01 section cards, StateView (loading / empty / error) and FileUpload" viewport="1100x900"
const {
  Card, CardHeader, CardDescription, CardTitle, CardAction, CardFooter, Badge, Button,
  StateView, FileUpload,
} = window.LeanWiseDesign_f2d907;

const METRICS = [
  { label: "Questions answered", value: "12,480", delta: "+8.2%", up: true, line: "Up this week", note: "vs last week" },
  { label: "Hit rate", value: "91.4%", delta: "+1.1 pt", up: true, line: "Steady gains", note: "Answers citing a source" },
  { label: "Median latency", value: "1.8 s", delta: "+0.3 s", up: false, line: "Slower this week", note: "Index rebuild in progress" },
  { label: "Sources", value: "12", delta: "+2", up: true, line: "3 syncing", note: "Connected this month" },
];

const FILES = [
  new File([new Uint8Array(2516582)], "master-services-agreement.pdf"),
  new File([new Uint8Array(880640)], "handbook-2026.docx"),
];

lwCard("Section cards, state, upload", "Blocks compose stock primitives; they add layout, never new colours.", (
  <>
    <div className="grid grid-cols-4 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      {METRICS.map((m) => (
        <Card key={m.label} className="@container/card">
          <CardHeader>
            <CardDescription>{m.label}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{m.value}</CardTitle>
            <CardAction>
              <Badge variant="outline">{m.delta}</Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">{m.line}</div>
            <div className="text-muted-foreground">{m.note}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
    <div className="grid grid-cols-3 gap-4">
      <StateView state="loading" />
      <StateView state="empty" title="No answers yet" description="Ask a question to see it here." action={<Button>Ask a question</Button>} />
      <StateView state="error" description="The search index is unreachable." action={<Button variant="outline">Retry</Button>} />
    </div>
    <FileUpload value={FILES} onValueChange={() => {}} multiple progress={[64]} hint="PDF or DOCX, up to 25 MB" />
  </>
));
