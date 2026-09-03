const LW = window.LeanWiseDesign_f2d907;

const { TopBar, Sidebar, Tabs, Breadcrumbs, ThemeToggle, LocaleSwitcher, Button, Avatar, Icon, Stack, Cluster } = LW;
function Demo() {
  const [tab, setTab] = React.useState("sources");
  const [collapsed, setCollapsed] = React.useState(false);
  const [theme, setTheme] = React.useState("light");
  const [loc, setLoc] = React.useState("en");
  // The same nav model the app-shell and dashboard templates declare. Only
  // `current` differs between screens — one product, one rail.
  const items = [
    {group:"Workspace"},
    {href:"#overview",label:"Overview",icon:<Icon name="chart" size={19} />},
    {href:"#ask",label:"Ask",icon:<Icon name="spark" size={19} />},
    {href:"#sources",label:"Sources",icon:<Icon name="layers" size={19} />,badge:"12",current:true},
    {href:"#evaluations",label:"Evaluations",icon:<Icon name="check" size={19} />},
    {group:"Admin"},
    {href:"#members",label:"Members",icon:<Icon name="users" size={19} />},
    {href:"#settings",label:"Settings",icon:<Icon name="settings" size={19} />}
  ];
  const toggleLabel = collapsed ? "Expand navigation" : "Collapse navigation";
  return (
    <div className="appframe">
      <div className="rail" data-collapsed={collapsed ? "true" : undefined}>
        <div className="railhead" data-collapse-center="">
          <a href="#" aria-label="LeanWise AI — home" style={{minWidth:0,fontSize:"var(--lw-text-sm)",fontWeight:"var(--lw-fw-semibold)",letterSpacing:"-.012em",color:"var(--lw-brand-text)",textDecoration:"none"}}>
            <span style={{display:"flex",alignItems:"center",gap:9,minWidth:0}}>
              <span className="brand-mark" aria-hidden="true" />
              {!collapsed && <span>LeanWise AI</span>}
            </span>
          </a>
        </div>
        {/* The nav is the SHRINKING element, wrapped in its own scroller. It is
            not enough to put a flex:1 spacer below it: `.lw-sidebar` declares
            `flex: none` and [data-embedded] resets width and ground but never
            `flex`, so the nav claims its full content height and the footer gets
            pushed out of the clipped frame. The app shell has no such bug only
            because its session-history panel is the flex:1 absorber; a rail
            without one has to let the nav itself absorb the shortfall. */}
        <div className="lw-scroll" style={{flex:1,minHeight:0,overflowY:"auto",overflowX:"hidden"}}>
          <Sidebar items={items} collapsed={collapsed} data-embedded="true" />
        </div>
        <div className="railfoot" data-collapse-center="">
          <Avatar name="Your Name" />
          {!collapsed && (
            <span style={{minWidth:0,lineHeight:1.3}}>
              <span style={{display:"block",fontSize:"var(--lw-text-sm)",fontWeight:"var(--lw-fw-medium)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>Your Name</span>
              <span style={{display:"block",fontFamily:"var(--lw-font-mono)",fontSize:10,color:"var(--lw-fg-subtle)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>you@leanwise.ai</span>
            </span>
          )}
        </div>
      </div>
      <div className="mainc">
        <TopBar>
          <div style={{order:-1,display:"flex",alignItems:"center",gap:12,flex:"0 1 auto",minWidth:0,marginRight:16,overflow:"hidden",whiteSpace:"nowrap"}}>
            <button type="button" className="lw-icon-btn" onClick={()=>setCollapsed(c=>!c)}
              aria-expanded={!collapsed} aria-label={toggleLabel} title={toggleLabel}>
              <Icon name="sidebar" size={21} />
            </button>
            <Breadcrumbs items={[{label:"acme-legal",href:"#"},{label:"sources"}]} />
          </div>
          <Button size="sm" title="Start a new session"><Icon name="plus" size={17} /><span>New chat</span></Button>
          {/* Two modes, because every LeanWise app surface is authored light and dark. */}
          <ThemeToggle modes={["light","dark"]} value={theme} onChange={setTheme} />
          {/* Endonyms, always — a reader looking for their own language looks for
              its name in that language. `compact` opens a menu rather than
              cycling: a language you cannot read is one you cannot predict. */}
          <LocaleSwitcher compact value={loc} onChange={setLoc}
            locales={["en","vi"]} localeLabels={{en:"English", vi:"Tiếng Việt"}} />
        </TopBar>
        <div style={{flex:1,minHeight:0,overflow:"auto",padding:20,display:"grid",gap:14,alignContent:"start"}} className="lw-scroll">
          <Tabs label="Source detail" value={tab} onChange={setTab} tabs={[
            {value:"sources",label:"Documents",count:1284},{value:"chunks",label:"Chunks",count:"41k"},
            {value:"evals",label:"Evaluations"},{value:"log",label:"Activity"}]} />
          <p style={{margin:0,fontSize:13.5,color:"var(--lw-fg-muted)"}}>Panel for <b>{tab}</b>. Arrow keys move between tabs; Home and End jump to the ends.</p>
        </div>
      </div>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<Demo />);
