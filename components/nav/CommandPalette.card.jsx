const LW = window.LeanWiseDesign_f2d907;
const { Icon } = LW;

/* v3.0.0 removed `CommandPalette` — no consumer imported it, and the part that
   was genuinely ours was never the Radix Dialog shell (that is `Dialog`) nor
   the listbox rows (those are `.lw-menu-*`): it was `.lw-cmdk`, the fixed
   560px panel, its search header and its hint foot. Those rules still ship, so
   this specimen paints them OPEN.

   Open, and inside a `.stage`. `.lw-cmdk` is `position: fixed`, so without a
   paint-contained stage the panel would join every shot on the page — the same
   reason `ground.card.html` exists in that shape. This is the card making a
   fixed layer measurable, not a specimen edited to suit a gate. */

const commands=[
  {id:1,group:"Sources",label:"Open database",icon:"database",kbd:"⌘O"},
  {id:2,group:"Sources",label:"Re-index contracts/2024",icon:"retry"},
  {id:3,group:"Sources",label:"Upload documents",icon:"upload"},
  {id:4,group:"Workspace",label:"Invite a teammate",icon:"users",kbd:"⌘I"},
  {id:5,group:"Workspace",label:"Switch theme",icon:"moon"},
  {id:6,group:"Workspace",label:"Open settings",icon:"settings",kbd:"⌘,"},
  {id:7,group:"Danger",label:"Delete this workspace",icon:"trash"},
];

function Palette({ query, active }) {
  const uid = React.useId();
  let lastGroup = null;
  return (
    <div className="lw-cmdk">
      <div className="lw-cmdk-input">
        <Icon name="search" size={17} />
        {/* combobox + listbox, with aria-activedescendant naming the row the
            arrow keys are on: focus never leaves the input, so the highlighted
            row has to be announced from here. */}
        <input type="text" role="combobox" aria-expanded="true" aria-controls={uid}
          aria-activedescendant={uid + "-" + active} aria-label="Command palette"
          placeholder="Type a command…" defaultValue={query} />
      </div>
      <ul className="lw-cmdk-list lw-menu" id={uid} role="listbox" aria-label="Command palette">
        {commands.map((c, i) => {
          const head = c.group !== lastGroup ? (lastGroup = c.group) : null;
          return (
            <React.Fragment key={c.id}>
              {head && <li className="lw-menu-label" role="presentation">{head}</li>}
              <li id={uid + "-" + i} role="option" aria-selected={i === active}
                className="lw-menu-item" data-active={i === active ? "true" : undefined}
                style={i === active ? { background: "var(--lw-bg-subtle)" } : undefined}>
                <span className="lw-menu-lead"><Icon name={c.icon} size={15} /></span>
                <span className="lw-menu-text">{c.label}</span>
                {c.kbd && <span className="lw-menu-kbd">{c.kbd}</span>}
              </li>
            </React.Fragment>
          );
        })}
      </ul>
      <div className="lw-cmdk-foot"><span>↑↓ to move</span><span>⏎ to run</span><span>esc to close</span></div>
    </div>
  );
}

function Demo(){
  return (
    <div className="stage">
      <div className="lw-backdrop" />
      <Palette query="" active={1} />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("light")).render(<Demo />);
ReactDOM.createRoot(document.getElementById("dark")).render(<Demo />);
