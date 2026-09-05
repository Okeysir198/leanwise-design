const LW = window.LeanWiseDesign_f2d907;
const { FileUpload, Field, Stack, Icon } = LW;

/* v3.0.0 removed `Stepper`, `Calendar` and `DatePicker` — no consumer imported
   any of them. Their CSS stayed: `.lw-stepper-*`, `.lw-cal-*` and
   `.lw-datefield-*` are still shipped rules a vanilla page composes, and the
   templates still lay them out. So this specimen writes that markup directly.
   Two things it does BETTER than the wrappers did:

   - the calendar is STATIC. Every state the CSS can paint — outside month,
     today, selected, range interior, both range edges, unavailable — is pinned
     on a chosen cell instead of depending on what `new Date()` returns, so the
     visual gate shoots the same 42 cells forever. The old card's today marker
     moved every midnight.
   - the ARIA is the same contract the component carried, and it is the half a
     rewrite most easily loses: role=grid needs a row layer and column headers,
     and an unavailable day is `aria-disabled`, never `disabled`, or the roving
     tabindex lands on a cell that cannot take focus. */

const DOW = ["M","T","W","T","F","S","S"];
/* July 2026 starting Monday: a 42-cell grid with a 2-day lead from June. */
const LEAD = [29,30], DAYS = 31, TRAIL = 42 - LEAD.length - DAYS;

function CalDay({ n, outside, today, selected, inRange, edge, off }) {
  return (
    <button type="button" role="gridcell" className="lw-cal-day"
      tabIndex={n === 24 && !outside ? 0 : -1}
      aria-selected={selected || undefined}
      aria-label={outside ? String(n) : n + " July 2026"}
      aria-disabled={off || undefined}
      data-outside={outside ? "true" : undefined}
      data-today={today ? "true" : undefined}
      data-in-range={inRange ? "true" : undefined}
      data-edge={edge}>{n}</button>
  );
}

function Cal({ range }) {
  const cells = [
    ...LEAD.map((n) => ({ n, outside: true })),
    ...Array.from({ length: DAYS }, (_, i) => {
      const n = i + 1;
      return {
        n,
        today: n === 17,
        selected: range ? (n === 20 || n === 29) : n === 24,
        inRange: range && n > 20 && n < 29,
        edge: range ? (n === 20 ? "start" : n === 29 ? "end" : undefined) : undefined,
        off: n > 29,
      };
    }),
    ...Array.from({ length: TRAIL }, (_, i) => ({ n: i + 1, outside: true })),
  ];
  const weeks = Array.from({ length: 6 }, (_, w) => cells.slice(w * 7, w * 7 + 7));
  return (
    <div className="lw-cal">
      <div className="lw-cal-head">
        <button type="button" className="lw-icon-btn" aria-label="Previous month"><Icon name="chevron-left" size={16} /></button>
        <div className="lw-cal-month" aria-live="polite">July 2026</div>
        <button type="button" className="lw-icon-btn" aria-label="Next month"><Icon name="chevron-right" size={16} /></button>
      </div>
      <div className="lw-cal-grid" role="grid" aria-label={range ? "Reporting period" : "Effective date"}>
        <div role="row" className="lw-cal-dow-row">
          {DOW.map((d, i) => <div key={i} role="columnheader" className="lw-cal-dow">{d}</div>)}
        </div>
        <div role="rowgroup" className="lw-cal-weeks">
          {weeks.map((week, w) => (
            <div key={w} role="row" className="lw-cal-week">
              {week.map((c, i) => <CalDay key={i} {...c} />)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* The closed trigger — `.lw-datefield` is a `.lw-input` face, which is why a
   date field lines up with a text field in the same form. */
const DateField = ({ text, placeholder }) => (
  <button type="button" className="lw-input lw-datefield" data-placeholder={text ? undefined : "true"}
    aria-label={placeholder}>
    <Icon name="calendar" size={15} className="lw-datefield-ic" />
    <span className="lw-datefield-text">{text || placeholder}</span>
  </button>
);

function Steps({ current }) {
  const steps = [{label:"Connect"},{label:"Map fields"},{label:"Review"},{label:"Publish"}];
  return (
    <div className="lw-stepper" role="group" aria-label="Progress">
      {steps.map((s, i) => {
        const state = i < current ? "done" : i === current ? "current" : "upcoming";
        return (
          <div key={i} className="lw-stepper-step" data-state={state}
            aria-current={state === "current" ? "step" : undefined}>
            <span className="lw-stepper-marker" aria-hidden="true">
              {state === "done" ? <Icon name="checkmark" size={14} /> : i + 1}
            </span>
            <span className="lw-stepper-label">{s.label}
              <span className="lw-sr-only">{" — " + (state === "done" ? "completed" : state === "current" ? "current step" : "not started")}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Demo(){
  const [files,setFiles]=React.useState([
    {id:1,name:"contracts-2024-q1.pdf",size:2411724,state:"done"},
    {id:2,name:"handbook-v9.docx",size:840112,state:"uploading",progress:62},
    {id:3,name:"scan-0042.tiff",size:51203344,state:"error",error:"Unsupported format — PDF, DOCX or TXT"},
  ]);
  return (
    <Stack gap={16}>
      <span className="lbl-eyebrow lbl-above">stepper — the marker carries the state</span>
      <Steps current={2} />
      <Field label="Effective date"><DateField text="24 July 2026" placeholder="Pick a date" /></Field>
      <span className="lbl-eyebrow lbl-above">the panel, open — every cell state at once</span>
      <div className="lw-cal-wrap"><Cal /></div>
      <Field label="Reporting period" help="Presets first — the grid is for the tenth case.">
        <DateField text="20 – 29 July 2026" placeholder="Pick a range" />
      </Field>
      {/* A preset is an ACTION that applies a range and closes the panel, so
          `aria-current` marks the live one — never `aria-pressed`, which would
          announce four toggles, three of them "not pressed". */}
      <div className="lw-cal-wrap">
        <div className="lw-cal-presets">
          <button type="button" className="lw-cal-preset">Last 7 days</button>
          <button type="button" className="lw-cal-preset" aria-current="true">Last 30 days</button>
          <button type="button" className="lw-cal-preset">This quarter</button>
          <button type="button" className="lw-cal-preset">Year to date</button>
        </div>
        <Cal range />
      </div>
      <span className="lbl-eyebrow lbl-above">upload</span>
      <FileUpload multiple accept=".pdf,.docx,.txt" maxSize={20*1024*1024} files={files}
        onFiles={fs=>setFiles(x=>[...x,...fs.map((f,i)=>({id:Date.now()+i,name:f.name,size:f.size,state:"queued"}))])}
        onRemove={f=>setFiles(x=>x.filter(y=>y.id!==f.id))} />
    </Stack>
  );
}
ReactDOM.createRoot(document.getElementById("light")).render(<Demo />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Demo />);
