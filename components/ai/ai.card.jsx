const LW = window.LeanWiseDesign_f2d907;

const { Button, Icon, Stack } = LW;

/* v3.0.0 removed the AI React wrappers — no consumer had ever imported one, and
   the CHANGELOG announced the removal at v2.0.0. The CSS did NOT go with them:
   `.lw-msg`, `.lw-source`, `.lw-confidence`, `.lw-trace` and `.lw-prompt` are
   still shipped, still the vocabulary this product answers in, and a vanilla
   page composes them directly. So this specimen now writes the markup the
   wrappers used to emit, which is the only way the two browser gates keep
   measuring those rules. Delete a rule here and the card renders bare — which
   is the point. */

// One borderless icon control, exactly as the shell writes them.
function Act({ icon, label, title }) {
  return (
    <button type="button" className="lw-icon-btn" aria-label={label} title={title || label}>
      <Icon name={icon} size={17} />
    </button>
  );
}

/* `.lw-msg` — avatar, role label, body. The role is a mono label beside the
   prose, never a bubble. */
function Msg({ role, who, streaming, children }) {
  return (
    <div className={"lw-msg " + role} data-streaming={streaming ? "true" : undefined}>
      <span className="lw-msg-avatar" aria-hidden="true">
        <Icon name={role === "ai" ? "spark" : "user"} size={role === "ai" ? 19 : 16} />
      </span>
      <div className="lw-msg-main">
        <span className="who">{who}</span>
        <div className="body">{children}</div>
      </div>
    </div>
  );
}

/* `.lw-source` — the numbered citation chip a claim and its passage share. */
const Cite = ({ n }) => (
  <button type="button" className="lw-source" aria-label={"Source " + n}>{n}</button>
);

function Demo() {
  return (
    <Stack gap={16}>
      <span className="lbl-eyebrow">conversation</span>
      <div className="thread">
        <Msg role="user" who="You">Which contracts auto-renew before the end of Q3?
          <div className="lw-msg-actions"><Act icon="edit" label="Edit question" title="Edit" /></div>
        </Msg>
        <Msg role="ai" who="LeanWise" streaming>
          <p style={{margin:0}}>Four agreements auto-renew before 30 September.</p>
          <p style={{margin:".7em 0 0"}}>The <b>master services agreement</b> renews on 12 August with a 60-day
          notice window, so the decision date has already passed <Cite n={1} />. <b>Statement of work 3</b> and
          the <b>amended agreement</b> both renew on 1 September <Cite n={2} /><Cite n={3} />, and the
          <b> framework agreement</b> renews on 22 September under an evergreen clause <Cite n={4} />.</p>
          <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,marginTop:14}}>
            <button type="button" className="lw-icon-btn" aria-label="Show the 4 cited passages" title="4 citations"
              style={{width:"auto",gap:7,height:28,padding:"0 4px",color:"var(--lw-fg-muted)",fontFamily:"var(--lw-font-mono)",fontSize:11,letterSpacing:".04em"}}>
              <Icon name="list" size={18} />4
            </button>
            <span style={{flex:1}} />
            <div className="lw-msg-actions">
              <Act icon="copy" label="Copy answer" title="Copy" />
              <Act icon="retry" label="Regenerate answer" title="Retry" />
              <Act icon="download" label="Export answer" title="Export" />
            </div>
          </div>
        </Msg>
      </div>

      <span className="lbl-eyebrow">provenance panel</span>
      {/* `.lw-confidence` — the score lives with the evidence, not in the
          answer's footer: it grades the retrieval. Number AND bar, because a
          bar alone is unquotable and a number alone is unscannable. */}
      <span className="lw-confidence" style={{"--lw-confidence":"91%"}}
        role="meter" aria-valuenow={91} aria-valuemin={0} aria-valuemax={100} aria-label="match">
        <span className="rail" aria-hidden="true"><i /></span>
        <span>91%</span>
      </span>

      {/* `.lw-trace` — an ordered list, so the steps are a sequence to a reader
          that cannot see the rail. */}
      <ol className="lw-trace">
        <li data-state="done"><span className="step">Parsed the question</span><span className="meta">intent: date-filter · entity: contract</span></li>
        <li data-state="done"><span className="step">Retrieved 41 candidate passages</span><span className="meta">hybrid · 240ms</span></li>
        <li data-state="active"><span className="step">Reranking and grounding</span><span className="meta">cross-encoder</span></li>
        <li data-state="pending"><span className="step">Compose answer</span></li>
      </ol>

      {/* `.lw-source-list` — an item with no URL is a button, not a hrefless
          anchor: an <a> without href is neither focusable nor announced. */}
      <div className="lw-source-list">
        {[{n:1,t:"Northwind — Master Services Agreement",m:"contracts/2024 · p.14 · 94% match"},
          {n:2,t:"Orbital Systems — Statement of Work 3",m:"contracts/2024 · p.2 · 88% match"},
          {n:3,t:"Kestrel Data — MSA (amended)",m:"contracts/2023 · p.31 · 81% match"}].map((s) => (
          <button key={s.n} type="button" className="lw-source-item">
            <span className="n">{s.n}</span>
            <span className="lw-source-main"><span className="t">{s.t}</span><span className="m">{s.m}</span></span>
          </button>
        ))}
      </div>

      <span className="lbl-eyebrow">prompt</span>
      {/* `.lw-prompt` — one footer row: tools left, the hint and Send pushed
          right by a spacer. */}
      <div className="thread">
        <div className="lw-prompt">
          <textarea rows={2} aria-label="Prompt" defaultValue=""
            placeholder="Ask anything about your documents…" />
          <div className="lw-prompt-foot">
            <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:8,width:"100%"}}>
              <button type="button" className="lw-icon-btn" aria-label="Attach a document" title="Attach a document"><Icon name="paperclip" size={19} /></button>
              <button type="button" className="lw-icon-btn" aria-label="Choose which sources to search" title="All sources"><Icon name="layers" size={19} /></button>
              <span style={{flex:1}} />
              <span className="lw-prompt-hint">&#8679;&#8629; for newline</span>
              <Button size="sm" iconOnly aria-label="Send" title="Send"><Icon name="send" size={16} /></Button>
            </div>
          </div>
        </div>
        <p style={{margin:"8px 0 0",textAlign:"center",fontSize:11.5,color:"var(--lw-fg-subtle)",textWrap:"pretty"}}>AI can make mistakes. Please double-check responses.</p>
      </div>
    </Stack>
  );
}
ReactDOM.createRoot(document.getElementById("light")).render(<Demo />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Demo />);
