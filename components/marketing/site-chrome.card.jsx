const LW = window.LeanWiseDesign_f2d907;
const { TopBar, SiteFooter, Button, Icon, Cluster } = LW;

/* The `AnnounceBar` wrapper was removed in v3.0.0 (no consumer imported it).
   `.lw-announce` still ships; it is `role="status"`, because a bar that
   appears above the header is an announcement, not a landmark. */
const Announce = ({ onDismiss, children }) => (
  <div className="lw-announce" role="status">
    {children}
    <button type="button" className="lw-icon-btn" aria-label="Dismiss announcement" onClick={onDismiss}>
      <Icon name="close" size={14} />
    </button>
  </div>
);

const navLinks = [
  { href: "#", label: "Product" },
  { href: "#", label: "Customers" },
  { href: "#", label: "Resources", current: true },
  { href: "#", label: "Pricing" }
];

const columns = [
  { heading: "Product", links: [
    { href: "#", label: "Overview" },
    { href: "#", label: "Retrieval" },
    { href: "#", label: "Evaluation" },
    { label: "SOC 2 — in progress" }
  ] },
  { heading: "Resources", links: [
    { href: "#", label: "Resources", current: true },
    { href: "#", label: "Docs", external: true },
    { href: "#", label: "Changelog" }
  ] },
  { heading: "Company", links: [
    { href: "#", label: "About" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Contact" }
  ] }
];

const social = (
  <Cluster>
    <button type="button" className="lw-icon-btn" aria-label="Email us"><Icon name="mail" size={16} /></button>
    <button type="button" className="lw-icon-btn" aria-label="Source repository"><Icon name="code" size={16} /></button>
    <button type="button" className="lw-icon-btn" aria-label="Status page"><Icon name="link" size={16} /></button>
  </Cluster>
);

const legal = "LeanWise AI is a retrieval and review tool. It does not provide legal advice, and an answer it grounds in your documents is a starting point for review rather than a determination.";

ReactDOM.createRoot(document.getElementById("chrome")).render(
  <div style={{border:"1px solid var(--lw-line)",borderRadius:"var(--lw-radius-lg)",overflow:"hidden"}}>
    <Announce onDismiss={() => {}}>
      Retrieval evaluation is now on by default. <a href="#">Read the note</a>
    </Announce>
    {/* `logo` is ON, and it is worth saying why it once was not. `.brand-mark` is
        a per-theme background-image, and through v1.2 `lw-visual` flipped the
        theme and screenshot in the same frame with no image-decode wait — so the
        DARK shot caught the newly-referenced SVG undecoded and this card drifted
        0.0293%, well over both thresholds. The first fix was to take the logo
        out, i.e. to edit the specimen to suit the gate. v1.3.0 put a decode wait
        in the gate instead (tools/lw-visual.mjs `decoded()`), so the mark is
        back where it belongs: this card is the site chrome, and site chrome has
        a logo in it. */}
    <TopBar brand="LeanWise AI" brandHref="#" logo links={navLinks} className="nav-center">
      <Button variant="brand" size="sm">Book a walkthrough</Button>
    </TopBar>
    <div style={{padding:"28px 20px",color:"var(--lw-fg-subtle)",fontSize:13}}>
      The header sits 36px down, not at zero. Scroll a real page and the strip stays; the header stays under it.
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById("footer-light")).render(
  <SiteFooter
    brand={<b>LeanWise AI</b>}
    desc="Answers grounded in your own documents, with the passage they came from attached."
    columns={columns} legal={legal}
    bottom={<><span>© LeanWise AI</span>{social}</>} />
);

ReactDOM.createRoot(document.getElementById("footer-dark")).render(
  <SiteFooter dark
    brand={<b>LeanWise AI</b>}
    desc="The same markup, one attribute different. No child carries a dark variant."
    columns={columns} legal={legal}
    bottom={<><span>© LeanWise AI</span>{social}</>} />
);
