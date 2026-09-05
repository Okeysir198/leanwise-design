const LW = window.LeanWiseDesign_f2d907;
const { Button, Icon, Stack } = LW;

/* v3.0.0 removed the AI React wrappers (see ai.card.jsx). The CSS stayed, so
   this specimen writes the markup they used to emit — `.lw-tool`, `.lw-diff`,
   `.lw-artifact` and `.lw-feedback` are still shipped rules and still need a
   fixture, in both grounds, or the a11y and visual gates stop reading them. */

/* `.lw-tool` — the disclosure is a real button with aria-expanded; the dot is
   the sighted signal and `.lw-sr-only` carries the word. */
function Tool({ name, summary, duration, state = "ok", body }) {
  const [open, setOpen] = React.useState(false);
  const uid = React.useId();
  return (
    <div className="lw-tool" data-state={state}>
      <button type="button" className="lw-tool-head" aria-expanded={open} aria-controls={uid} onClick={() => setOpen(o => !o)}>
        <Icon name={open ? "chevron-down" : "chevron-right"} size={14} />
        <span className="lw-tool-dot" aria-hidden="true" />
        <span className="lw-tool-name">{name}</span>
        <span className="lw-tool-sum">{summary}</span>
        {duration != null && <span className="lw-tool-dur">{duration}ms</span>}
        <span className="lw-sr-only">{state === "error" ? "failed" : "succeeded"}</span>
      </button>
      {open && <div className="lw-tool-body" id={uid}>{body}</div>}
    </div>
  );
}

const SIGN = { add: "+", del: "−", mod: "~" };
const KIND = { add: "added: ", del: "removed: ", mod: "changed: " };

/* `.lw-diff` — one decision per hunk, then a bulk row. */
function Diff({ hunks, decisions, onDecide, onAcceptAll, onRejectAll }) {
  const pending = hunks.filter(h => !decisions[h.id]).length;
  return (
    <div className="lw-diff" role="group" aria-label="Proposed changes">
      {hunks.map((h) => {
        const d = decisions[h.id];
        return (
          <div key={h.id} className="lw-diff-hunk" data-decision={d}>
            <div className="lw-diff-head">
              <Icon name="file" size={14} className="lw-diff-ic" />
              <span className="lw-diff-file">{h.file}{h.range ? " · " + h.range : ""}</span>
            </div>
            <div className="lw-diff-lines">
              {h.lines.map((l, i) => (
                <div key={i} className="lw-diff-line" data-kind={l.kind}>
                  <span className="n">{l.n ?? ""}</span>
                  <span className="s" aria-hidden="true">{SIGN[l.kind] || ""}</span>
                  <span className="t">
                    {l.kind && <span className="lw-sr-only">{KIND[l.kind]}</span>}
                    {l.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="lw-diff-foot">
              <span className="lw-diff-state">
                {d === "accepted" ? "Accepted" : d === "rejected" ? "Rejected" : h.note || ""}
              </span>
              {d ? (
                <Button size="sm" variant="ghost" onClick={() => onDecide(h.id, null)}>
                  <Icon name="undo" size={14} />Undo
                </Button>
              ) : (
                <>
                  <Button size="sm" variant="ghost" onClick={() => onDecide(h.id, "rejected")}>Reject</Button>
                  <Button size="sm" onClick={() => onDecide(h.id, "accepted")}>Accept</Button>
                </>
              )}
            </div>
          </div>
        );
      })}
      <div className="lw-diff-foot">
        <span className="lw-diff-state" aria-live="polite">
          {pending ? pending + " of " + hunks.length + " still to review" : "All " + hunks.length + " reviewed"}
        </span>
        <Button size="sm" variant="ghost" onClick={onRejectAll} disabled={!pending}>Reject all</Button>
        <Button size="sm" onClick={onAcceptAll} disabled={!pending}>Accept all</Button>
      </div>
    </div>
  );
}

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
        <ol className="lw-trace">
          <li data-state="done"><span className="step">Parsed the question</span></li>
          <li data-state="done"><span className="step">Retrieved 8 passages</span></li>
          <li data-state="active"><span className="step">Drafting the answer</span></li>
        </ol>
        <div style={{marginTop:12}}>
          <Tool name="search_index" summary="contracts/2024 · 8 hits" duration={214} state="ok"
            body={<><span className="k">arguments</span><pre>{'{\n  "query": "termination notice period",\n  "top_k": 8\n}'}</pre>
                   <span className="k">result</span><pre>{'{\n  "hits": 8,\n  "best_score": 0.91\n}'}</pre></>} />
          <Tool name="fetch_document" summary="doc_4182 — 404" duration={88} state="error"
            body={<><span className="k">error</span><pre className="err">Not found: doc_4182</pre></>} />
        </div>
      </div>

      <div><span className="lbl-eyebrow lbl-above">diff review — accept or reject per hunk</span>
        <Diff hunks={hunks} decisions={dec}
          onDecide={(id,d)=>setDec(x=>({...x,[id]:d}))}
          onAcceptAll={()=>setDec({a:"accepted",b:"accepted"})}
          onRejectAll={()=>setDec({a:"rejected",b:"rejected"})} />
      </div>

      {/* `.lw-artifact` — versioned, revertible, manually editable. */}
      <div><span className="lbl-eyebrow lbl-above">artifact — versioned, revertible, manually editable</span>
        <div className="lw-artifact">
          <div className="lw-artifact-head">
            <Icon name="file" size={15} className="lw-artifact-ic" />
            <span className="lw-artifact-title">Termination clause summary</span>
            <button type="button" className="lw-icon-btn" aria-label="Previous version" disabled={v <= 1} onClick={()=>setV(n=>n-1)}>
              <Icon name="chevron-left" size={15} />
            </button>
            <span className="lw-artifact-ver">v{v} / 4</span>
            <button type="button" className="lw-icon-btn" aria-label="Next version" disabled={v >= 4} onClick={()=>setV(n=>n+1)}>
              <Icon name="chevron-right" size={15} />
            </button>
          </div>
          <div className="lw-artifact-body">
            <p style={{margin:0,fontSize:"var(--lw-text-sm)",lineHeight:1.65,color:"var(--lw-fg-muted)"}}>
              Either party may terminate for convenience on 60 days' written notice. The notice period rises to 90 days
              after the second renewal term.</p>
          </div>
          <div className="lw-artifact-foot">
            <button type="button" className="lw-btn lw-btn-ghost lw-btn-sm"><Icon name="edit" size={14} />Edit manually</button>
            <button type="button" className="lw-btn lw-btn-ghost lw-btn-sm" onClick={()=>setV(1)}><Icon name="undo" size={14} />Revert</button>
            <span className="lw-spacer" />
            <Button size="sm">Insert into doc</Button>
          </div>
        </div>
      </div>

      {/* `.lw-feedback` — aria-pressed, deliberately: thumbs can be cleared, so
          these are two independent toggles rather than a one-of-N group. */}
      <div><span className="lbl-eyebrow lbl-above">feedback</span>
        <div className="lw-feedback">
          <button type="button" className="lw-icon-btn" aria-label="Helpful" aria-pressed={fb === "up"}
            onClick={()=>setFb(f => f === "up" ? null : "up")}><Icon name="thumbs-up" size={15} /></button>
          <button type="button" className="lw-icon-btn" aria-label="Not helpful" aria-pressed={fb === "down"}
            onClick={()=>setFb(f => f === "down" ? null : "down")}><Icon name="thumbs-down" size={15} /></button>
          <span className="lw-feedback-note">Was this grounded in the right source?</span>
        </div>
        <form className="lw-feedback-form" onSubmit={(e)=>e.preventDefault()}>
          <textarea className="lw-textarea" rows={2} aria-label="What was wrong?" placeholder="What was wrong?" />
          <div className="lw-feedback-actions">
            <button type="button" className="lw-btn lw-btn-ghost lw-btn-sm">Cancel</button>
            <button type="submit" className="lw-btn lw-btn-sm">Send</button>
          </div>
        </form>
      </div>
    </Stack>
  );
}
ReactDOM.createRoot(document.getElementById("light")).render(<Demo />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Demo />);
