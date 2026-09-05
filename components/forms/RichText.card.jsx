const LW = window.LeanWiseDesign_f2d907;
const { Field, Icon } = LW;

/* v3.0.0 removed `RichText`. REVIEW.md had it marked as a shim for years — a
   `contenteditable` + `execCommand` engine, fine for a comment box, to be
   swapped before any product shipped a document editor, and nothing ever did.
   The CHROME stayed, because that is the part a design system owns: a toolbar
   and a prose surface on the type scale, which any engine (TipTap, ProseMirror,
   Lexical) renders into. This specimen is that chrome.

   The toolbar is `role="group"`, deliberately NOT `role="toolbar"`: a toolbar
   obliges left/right roving with one tab stop, and these are ten independent
   tab stops. Claiming the role without the behaviour is worse than not
   claiming it. And the body carries `lw-prose lw-editor-body` — one prose
   treatment, with the editor keeping only its box, caret and placeholder. */

const TOOLS = [
  { id: "bold", label: "Bold", glyph: "B" },
  { id: "italic", label: "Italic", glyph: "I" },
  { sep: true },
  { id: "h2", label: "Heading", glyph: "H" },
  { id: "ul", icon: "list", label: "Bulleted list" },
  { id: "ol", icon: "sort-asc", label: "Numbered list" },
  { id: "quote", icon: "quote", label: "Quote" },
  { id: "code", icon: "code", label: "Code" },
  { sep: true },
  { id: "link", icon: "link", label: "Link" },
  { id: "clear", icon: "undo", label: "Clear formatting" },
];

function Bar({ active = {}, readOnly }) {
  return (
    <div className="lw-editor-bar" role="group" aria-label="Formatting">
      {TOOLS.map((t, i) => t.sep
        ? <span key={"s" + i} className="sep" aria-hidden="true" />
        : (
          <button key={t.id} type="button" className="lw-icon-btn" aria-label={t.label} title={t.label}
            aria-pressed={!!active[t.id]} disabled={readOnly}>
            {t.glyph
              ? <span className="lw-editor-glyph" data-glyph={t.id}>{t.glyph}</span>
              : <Icon name={t.icon} size={15} />}
          </button>
        ))}
    </div>
  );
}

function Editor({ readOnly, count, children }) {
  return (
    <div className="lw-editor">
      <Bar active={readOnly ? {} : { bold: true }} readOnly={readOnly} />
      <div className="lw-prose lw-editor-body" role="textbox" aria-multiline="true"
        aria-label={readOnly ? "Locked summary" : "Summary"} aria-readonly={readOnly || undefined}>
        {children}
      </div>
      {count && (
        <div className="lw-editor-foot">
          <span className="lw-spacer" />
          <span className="lw-editor-count" aria-live="polite">{count}</span>
        </div>
      )}
    </div>
  );
}

function Demo(){
  return (<>
    <Field label="Summary" help="Bold, italic, headings, lists, quote, code and links.">
      <Editor count="218 / 600">
        <h2>Termination clause</h2>
        <p>Either party may terminate for convenience on <strong>60 days'</strong> written notice.</p>
        <ul><li>Rises to 90 days after the second renewal</li><li>Notice must be in writing</li></ul>
      </Editor>
    </Field>
    <div><span className="lbl-eyebrow lbl-above">read-only — same chrome, no editing</span>
      <Editor readOnly>
        <p>Locked while the source re-indexes.</p>
      </Editor>
    </div>
    {/* The over-limit ink is its own state and no product ever demoed it. */}
    <div><span className="lbl-eyebrow lbl-above">over the limit</span>
      <div className="lw-editor">
        <Bar />
        <div className="lw-prose lw-editor-body" role="textbox" aria-multiline="true" aria-label="Long summary">
          <p>A summary that has run past what the field will accept.</p>
        </div>
        <div className="lw-editor-foot">
          <span className="lw-spacer" />
          <span className="lw-editor-count" data-over="true" aria-live="polite">641 / 600</span>
        </div>
      </div>
    </div>
  </>);
}
ReactDOM.createRoot(document.getElementById("light")).render(<Demo />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Demo />);
