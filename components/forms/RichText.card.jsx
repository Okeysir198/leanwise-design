const LW = window.LeanWiseDesign_f2d907;
const { RichText, Field } = LW;
function Demo(){
  const [html,setHtml]=React.useState("<h2>Termination clause</h2><p>Either party may terminate for convenience on <strong>60 days'</strong> written notice.</p><ul><li>Rises to 90 days after the second renewal</li><li>Notice must be in writing</li></ul>");
  return (<>
    <Field label="Summary" help="Bold, italic, headings, lists, quote, code and links.">
      <RichText value={html} onChange={setHtml} maxLength={600} label="Summary" />
    </Field>
    <div><span className="lbl-eyebrow lbl-above">read-only — same chrome, no editing</span>
      <RichText value="<p>Locked while the source re-indexes.</p>" readOnly label="Locked summary" />
    </div>
  </>);
}
ReactDOM.createRoot(document.getElementById("light")).render(<Demo />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Demo />);
