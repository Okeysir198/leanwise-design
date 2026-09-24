// @dsCard group="Blocks" name="KPI, state, upload" subtitle="KpiTile, StateView (loading / empty / error) and FileUpload — built on stock primitives" viewport="1100x900"
const { KpiTile, StateView, FileUpload } = window.LeanWiseDesign_f2d907;

lwCard("KPI, state, upload", "Blocks compose primitives; they add layout, never new colours.", (
  <>
    <div className="grid grid-cols-4 gap-4">
      <KpiTile label="Questions answered" value="12,480" delta="+8.2%" hint="vs last week" />
      <KpiTile label="Hit rate" value="91.4%" delta="+1.1 pt" />
      <KpiTile label="Median latency" value="1.8 s" delta="+0.3 s" trend="down" />
      <KpiTile label="Sources" value="12" hint="3 syncing" />
    </div>
    <div className="grid grid-cols-3 gap-4">
      <StateView state="loading" />
      <StateView state="empty" title="No answers yet" description="Ask a question to see it here." action={{ label: "Ask a question" }} />
      <StateView state="error" description="The search index is unreachable." action={{ label: "Retry" }} />
    </div>
    <FileUpload files={[
      { name: "master-services-agreement.pdf", size: "2.4 MB", progress: 64 },
      { name: "handbook-2026.docx", size: "860 KB", progress: 100 },
    ]} />
  </>
));
