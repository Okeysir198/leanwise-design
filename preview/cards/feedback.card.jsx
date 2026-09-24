// @dsCard group="Components" name="Feedback" subtitle="Alert (default, info-soft, destructive), Sonner toast, Badge variants, Spinner and Empty" viewport="1100x900"
const {
  Alert, AlertTitle, AlertDescription, Badge, Spinner, Toaster, toast,
  Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent, Button,
  InfoIcon, AlertCircleIcon, CheckCircle2Icon,
} = window.LeanWiseDesign_f2d907;

function Toasts() {
  React.useEffect(() => {
    toast.success("Source re-indexed", { description: "1,284 documents in 42 s", duration: Infinity });
    toast("Invite sent to jamie@acme.com", { duration: Infinity });
  }, []);
  const [dark, setDark] = React.useState(document.documentElement.classList.contains("dark"));
  React.useEffect(() => {
    const html = document.documentElement;
    const mo = new MutationObserver(() => setDark(html.classList.contains("dark")));
    mo.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);
  return <Toaster theme={dark ? "dark" : "light"} position="bottom-right" expand />;
}

lwCard("Feedback", "Inline alerts sit in the flow; toasts confirm what already happened and never ask a question.", (
  <div className="grid grid-cols-2 gap-10">
    <div className="flex flex-col gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>Sync scheduled</AlertTitle>
        <AlertDescription>Sources refresh nightly at 02:00.</AlertDescription>
      </Alert>
      <Alert className="bg-info-soft text-info-soft-foreground border-info-border">
        <InfoIcon />
        <AlertTitle>New connector available</AlertTitle>
        <AlertDescription className="text-info-soft-foreground">SharePoint sites can now be added as a source.</AlertDescription>
      </Alert>
      <Alert variant="destructive" className="bg-destructive-soft border-destructive-border">
        <AlertCircleIcon />
        <AlertTitle>Ingest failed</AlertTitle>
        <AlertDescription>Legacy wiki returned 403. Reconnect to retry.</AlertDescription>
      </Alert>
      <div className="flex flex-wrap items-center gap-2">
        <Badge>default</Badge>
        <Badge variant="secondary">secondary</Badge>
        <Badge variant="outline">outline</Badge>
        <Badge variant="destructive">destructive</Badge>
        <Badge className="bg-success text-success-foreground border-transparent">success</Badge>
        <Badge className="bg-warning text-warning-foreground border-transparent">warning</Badge>
        <Badge className="bg-info text-info-foreground border-transparent">info</Badge>
      </div>
      <div className="text-muted-foreground flex items-center gap-2 text-sm"><Spinner />Indexing 3 sources…</div>
    </div>
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon"><InfoIcon /></EmptyMedia>
        <EmptyTitle>No sources yet</EmptyTitle>
        <EmptyDescription>Connect a drive or upload files to start answering questions.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent><Button>Add a source</Button></EmptyContent>
    </Empty>
    <Toasts />
  </div>
));
