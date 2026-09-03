const { Icon } = window.LeanWiseDesign_f2d907;

/* Both panes render THIS, once. A specimen that duplicates its own markup per
   ground is a specimen that can drift from itself between the two. */
function Article() {
  return (
    <article className="lw-prose">
      <h2>Validating an Internal TSS</h2>
      <p>The validator reads a supplier's test specification and reports each checkpoint as
        <mark> pass, warn or fail</mark> — never as a score. A number would imply a
        threshold nobody agreed on.</p>
      <h3>What a checkpoint is</h3>
      <p>A checkpoint is one rule with one source. It cites the clause it came from, so a
        disagreement is settled by reading the clause rather than by trusting the tool. See the
        <a href="#reference">reference table</a> below.</p>
      <ul>
        <li>Every rule names the document it came from.</li>
        <li>A rule with no source is not shipped.</li>
        <li>Warnings are ordered by the cost of being wrong.</li>
      </ul>
      <h4>Running it locally</h4>
      <p>Set <code>TSS_STRICT=1</code> to promote every warning to a failure, then:</p>
      {/* The tok-* spans are not decoration here: they are what makes this card a
          GATE for the rule above. axe scores a semi-transparent foreground as
          "incomplete" rather than a violation, so a comment span alone (white at
          0.48) cannot fail the run — measured, with the guard removed. The
          keyword and string tiers are SOLID, so a light chip appearing behind
          this always-dark surface drops them to ~1.6:1 and check:a11y goes red,
          which is the whole point of keeping the specimen. */}
      <pre className="lw-code"><code><span className="tok-keyword">tss</span>{` validate `}<span className="tok-string">--strict</span>{` ./fixtures/`}<span className="tok-comment">{`   # 412 checkpoints`}</span></code></pre>
      <blockquote>The point is not that the tool is right. The point is that it says where it
        got the rule, so you can tell when it is wrong.</blockquote>
      <h3 id="reference">Reference</h3>
      <table>
        <thead><tr><th>Phase</th><th>Input</th><th>Result</th></tr></thead>
        <tbody>
          <tr><td>parse</td><td>PDF</td><td>pages</td></tr>
          <tr><td>extract</td><td>pages</td><td>fields</td></tr>
          <tr><td>validate</td><td>fields</td><td>checkpoints</td></tr>
        </tbody>
      </table>
      <figure>
        {/* An empty 16:5 SVG. The specimen is the BORDER, the radius and the
            `block-size: auto` — not the picture, which would be a second home
            for a palette value the moment it had one. */}
        <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 5'/>"
             alt="Placeholder for a pipeline diagram" />
        <figcaption>Figure 1 — the four phases, end to end.</figcaption>
      </figure>
      <hr />
      <p>Ordered lists take the same measure:</p>
      <ol><li>Parse.</li><li>Extract.</li><li>Validate.</li></ol>
    </article>
  );
}

/* Hand-composed rather than rendered from <Disclosure>, because the specimen has
   to prove the CSS contract holds for plain HTML with no component at all — that
   is the claim the zero-JavaScript argument rests on. The component emits
   exactly this. */
function Faq() {
  const rows = [
    ["Does it need JavaScript?", "No. <details> owns the open state, so every row works before hydration, with a failed bundle, and with JS off."],
    ["Why no height animation?", "<details> cannot animate its own height portably — the closed box has no height to interpolate from. Only the chevron moves."],
    ["Where does the chevron come from?", "<Icon name=“chevron-down”>. One drawing, one owner; the CSS rotates it on [open] and never draws a triangle of its own."],
  ];
  return (
    <div>
      {rows.map(([q, a], i) => (
        <details className="lw-disclosure" key={i} open={i === 0 || undefined}>
          <summary><span>{q}</span><Icon name="chevron-down" size={18} /></summary>
          <div className="lw-disclosure-body">{a}</div>
        </details>
      ))}
    </div>
  );
}

function Pane() {
  return (
    <React.Fragment>
      <span className="lbl-eyebrow lbl-above">prose</span>
      <Article />
      <span className="lbl-eyebrow lbl-above" style={{marginTop:14}}>disclosure</span>
      <Faq />
    </React.Fragment>
  );
}
for (const id of ["light", "dark"]) {
  ReactDOM.createRoot(document.getElementById(id)).render(<Pane />);
}
