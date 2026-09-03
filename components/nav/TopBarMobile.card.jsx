const { TopBar, Icon } = window.LeanWiseDesign_f2d907;

const LINKS = [
  { href: "#product", label: "Product" },
  { href: "#customers", label: "Customers" },
  { href: "#pricing", label: "Pricing" },
  { href: "#company", label: "Company", current: true },
];

/* Hand-composed rather than rendered from <NavToggle>, for the reason the
   whole pattern exists: the markup has to be correct as plain HTML before any
   component emits it. <NavToggle> emits exactly this, plus the state. Both
   frames are pinned open/closed rather than interactive, so the pixel gate
   scores a settled shot instead of whichever frame it caught. */
function Frame({ open, id }) {
  const panelId = id + "-panel";
  return (
    <div className={"mobileframe" + (open ? " open" : "")}>
      <TopBar brand="LeanWise AI" logo brandHref="#home" links={LINKS}>
        <button type="button" className="lw-topbar-toggle lw-icon-btn lw-hit"
          aria-expanded={open} aria-controls={panelId}
          aria-label={open ? "Close menu" : "Menu"}>
          <Icon name={open ? "close" : "menu"} size={20} />
        </button>
        <div id={panelId} className="lw-topbar-panel" hidden={!open}>
          <nav aria-label="Primary, narrow">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} aria-current={l.current ? "page" : undefined}>{l.label}</a>
            ))}
          </nav>
        </div>
      </TopBar>
      <div className="body">Page content stays visible and interactive — the panel is a
        disclosure, not a modal.</div>
    </div>
  );
}

function Pane({ side }) {
  return (
    <React.Fragment>
      <span className="lbl-eyebrow lbl-above">closed</span>
      <Frame open={false} id={side + "-closed"} />
      <span className="lbl-eyebrow lbl-above" style={{marginTop:14}}>open</span>
      <Frame open id={side + "-open"} />
    </React.Fragment>
  );
}
for (const id of ["light", "dark"]) {
  ReactDOM.createRoot(document.getElementById(id)).render(<Pane side={id} />);
}
