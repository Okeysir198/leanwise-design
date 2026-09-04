/* The specimen for `.lw-figure` + `.lw-media-plate`.

   Both panes render THIS, once, and the dark pane carries `.lw-band-dark` and
   nothing else — there is no `.lw-band-dark .lw-media-plate` rule anywhere in
   the package. The plate's surface and hairline are ROLES, so they re-point
   under the band on their own.

   ⚠ The picture is an inline <svg> painted from the TIER tokens
   (`--lw-surface-*`, `--lw-border-*`, `--lw-text-*`), and that is the specimen,
   not a decoration. A tier is theme-invariant by design — it is the same value
   on both grounds — which is exactly the property a real screenshot has and the
   reason the plate exists: the picture's light ground does NOT follow the page.
   Painting it with literal hex would demonstrate the same thing and make this
   file a second home for palette values, which is why prose.card.jsx ships an
   empty SVG rather than a drawing.

   The first figure is the same media with no plate. It is here so the gate has
   the before as well as the after: on the dark pane it is the hard white slab
   the plate replaces, and a change that quietly stops the plate from painting
   would otherwise make the two figures identical with nothing to say so. */

const TILES = [
  ["7", "Passed", "success"],
  ["0", "Warning", "warning"],
  ["1", "Failed", "danger"],
  ["8", "Total", "neutral"],
];

/* 16:5-ish, the shape of a real result strip. `role="img"` + `aria-label`
   because an <svg> with neither is an unlabelled graphic to axe.

   ⚠ The inline style on the unplated copy is not decoration and not a shortcut
   for a class: `preview/_card.css` caps every loose `.pane svg` at 110px so a
   stray logo cannot blow a card open, and that cap would render the "before"
   as a thumbnail — a slab that is not slab-shaped is not the before. The
   plated copy needs none of it, because `.lw-media-plate > svg` in base.css
   is later in the cascade than the harness rule. */
function Shot({ plain = false }) {
  return (
    <svg
      viewBox="0 0 640 152"
      role="img"
      aria-label="A result strip: four status tiles reading Passed 7, Warning 0, Failed 1, Total 8"
      style={plain ? { display: "block", inlineSize: "100%", maxInlineSize: "100%", blockSize: "auto" } : undefined}
    >
      <rect width="640" height="152" fill="var(--lw-surface-2)" />
      {TILES.map(([n, label], i) => (
        <g key={label} transform={`translate(${16 + i * 154}, 16)`}>
          <rect width="138" height="120" rx="8" fill="var(--lw-surface-1)" stroke="var(--lw-border-1)" />
          <text x="69" y="62" textAnchor="middle" fontFamily="var(--lw-font-sans)" fontSize="34"
            fontWeight="600" fill="var(--lw-text-1)">{n}</text>
          <text x="69" y="90" textAnchor="middle" fontFamily="var(--lw-font-sans)" fontSize="13"
            fill="var(--lw-text-2)">{label}</text>
        </g>
      ))}
    </svg>
  );
}

function Pane() {
  return (
    <React.Fragment>
      <span className="lbl-eyebrow lbl-above">figure, no plate</span>
      <figure className="lw-figure">
        <div className="lw-cluster"><span className="lw-pill">Sample output</span></div>
        <Shot plain />
        <figcaption className="lw-figcaption">
          The picture's ground is fixed. On the dark band it is a slab with square corners,
          bleeding to the column edge — and an image is opaque to axe, so no gate can see it.
        </figcaption>
      </figure>
      <span className="lbl-eyebrow lbl-above" style={{ marginTop: 20 }}>figure on .lw-media-plate</span>
      <figure className="lw-figure">
        <div className="lw-cluster"><span className="lw-pill">Sample output</span></div>
        <div className="lw-media-plate"><Shot /></div>
        <figcaption className="lw-figcaption">
          A mat, not chrome: padding, a role surface that re-points, a hairline and two radii.
          It says "this is a picture" and claims nothing about what the picture is a picture of.
        </figcaption>
      </figure>
      <span className="lbl-eyebrow lbl-above" style={{ marginTop: 20 }}>a tighter plate</span>
      <figure className="lw-figure">
        <div className="lw-media-plate" style={{ "--lw-media-plate-pad": "var(--lw-space-8)" }}>
          <Shot />
        </div>
        <figcaption className="lw-figcaption">
          One knob, <span className="lw-mono">--lw-media-plate-pad</span>, for a dense app surface.
        </figcaption>
      </figure>
    </React.Fragment>
  );
}

for (const id of ["light", "dark"]) {
  ReactDOM.createRoot(document.getElementById(id)).render(<Pane />);
}
