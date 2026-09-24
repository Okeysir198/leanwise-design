// @dsCard group="Components" name="Feedback" subtitle="Alert (default, info-soft, destructive), toast, Badge variants, Spinner and Empty" viewport="1100x900"
const {
  Alert, AlertTitle, AlertDescription, Badge, Spinner, Toaster, toast,
  Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent, Button,
} = window.LeanWiseDesign_f2d907;

const I = (d) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);
const Info = I(<><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></>);
const Warn = I(<><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></>);

function Toasts() {
  React.useEffect(() => {
    toast.success("Source re-indexed", { description: "1,284 documents in 42 s", duration: Infinity });
    toast("Invite sent to jamie@acme.com", { duration: Infinity });
  }, []);
  return <Toaster position="bottom-right" expand />;
}

lwCard("Feedback", "Inline alerts sit in the flow; toasts confirm what already happened and never ask a question.", (
  <div className="grid grid-cols-2 gap-10">
    <div className="flex flex-col gap-4">
      <Alert>{Info}<AlertTitle>Sync scheduled</AlertTitle><AlertDescription>Sources refresh nightly at 02:00.</AlertDescription></Alert>
      <Alert className="bg-info-soft text-info-soft-foreground border-info-border">
        {Info}<AlertTitle>New connector available</AlertTitle>
        <AlertDescription className="text-info-soft-foreground">SharePoint sites can now be added as a source.</AlertDescription>
      </Alert>
      <Alert variant="destructive" className="bg-destructive-soft border-destructive-border">
        {Warn}<AlertTitle>Ingest failed</AlertTitle><AlertDescription>Legacy wiki returned 403. Reconnect to retry.</AlertDescription>
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
        <EmptyMedia variant="icon">{Info}</EmptyMedia>
        <EmptyTitle>No sources yet</EmptyTitle>
        <EmptyDescription>Connect a drive or upload files to start answering questions.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent><Button>Add a source</Button></EmptyContent>
    </Empty>
    <Toasts />
  </div>
));
