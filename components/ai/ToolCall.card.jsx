const LW = window.LeanWiseDesign_f2d907;
const { ToolCall, DiffReview, Artifact, Feedback, AgentTrace, Button, Stack } = LW;

function Demo(){
  const [dec,setDec]=React.useState({});
  const [fb,setFb]=React.useState(null);
  const [v,setV]=React.useState(3);
  const hunks=[
    {id:"a",file:"src/retrieval/rank.ts",range:"L118–L124",note:"Reorders by score before the cutoff.",lines:[
      {n:118,text:"const hits = await search(q);"},
      {n:119,kind:"del",text:"return hits.slice(0, k);"},
      {n:119,kind:"add",text:"return hits.sort((a, b) => b.score - a.score).slice(0, k);"},
      {n:120,text:"}"},
    ]},
    {id:"b",file:"src/retrieval/rank.ts",range:"L140",lines:[
      {n:140,kind:"mod",text:"const k = opts.topK ?? 8;   // was 5"},
    ]},
  ];
  return (
    <Stack gap={16}>
      <div><span className="lbl-eyebrow lbl-above">trace + tool calls</span>
        <AgentTrace steps={[{label:"Parsed the question",state:"done"},{label:"Retrieved 8 passages",state:"done"},{label:"Drafting the answer",state:"active"}]} />
        <div style={{marginTop:12}}>
          <ToolCall name="search_index" summary="contracts/2024 · 8 hits" duration={214} state="ok"
            args={{query:"termination notice period",top_k:8}} result={{hits:8,best_score:0.91}} />
          <ToolCall name="fetch_document" summary="doc_4182 — 404" duration={88} error="Not found: doc_4182" />
        </div>
      </div>
      <div><span className="lbl-eyebrow lbl-above">diff review — accept or reject per hunk</span>
        <DiffReview hunks={hunks} decisions={dec}
          onDecide={(id,d)=>setDec(x=>({...x,[id]:d}))}
          onAcceptAll={()=>setDec({a:"accepted",b:"accepted"})}
          onRejectAll={()=>setDec({a:"rejected",b:"rejected"})} />
      </div>
      <div><span className="lbl-eyebrow lbl-above">artifact — versioned, revertible, manually editable</span>
        <Artifact title="Termination clause summary" version={v} versionCount={4}
          onPrevVersion={()=>setV(n=>n-1)} onNextVersion={()=>setV(n=>n+1)}
          onRevert={()=>setV(1)} onEdit={()=>{}}
          actions={<Button size="sm">Insert into doc</Button>}>
          <p style={{margin:0,fontSize:"var(--lw-text-sm)",lineHeight:1.65,color:"var(--lw-fg-muted)"}}>
            Either party may terminate for convenience on 60 days' written notice. The notice period rises to 90 days
            after the second renewal term.</p>
        </Artifact>
      </div>
      <div><span className="lbl-eyebrow lbl-above">feedback</span>
        <Feedback value={fb} onChange={setFb} onComment={()=>{}} note="Was this grounded in the right source?" />
      </div>
    </Stack>
  );
}
ReactDOM.createRoot(document.getElementById("light")).render(<Demo />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Demo />);
