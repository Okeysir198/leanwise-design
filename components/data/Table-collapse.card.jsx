const LW = window.LeanWiseDesign_f2d907;

const { Table, Chip } = LW;

const cols = [
  { key: "name",   header: "Inspector", sortable: true },
  { key: "role",   header: "Role" },
  { key: "status", header: "Status" },
  { key: "device", header: "Device", sortable: true },
  { key: "seen",   header: "Last seen" },
  { key: "build",  header: "App build", num: true, sortable: true },
];

/* Same shape, one header renamed: the hint specimen shows an address where the
   collapsing one shows a role, and a header has to name what is under it. */
const hintCols = cols.map(c => (c.key === "role" ? { ...c, header: "Email" } : c));

const rows = [
  { id: 1, name: "Nguyễn Thanh Trung", role: "Inspector", status: <Chip tone="success">active</Chip>,
    device: "Pixel 7a", seen: "2 min ago", build: "2.14.3" },
  { id: 2, name: "Trần Minh Khoa", role: "Approver", status: <Chip tone="success">active</Chip>,
    device: "iPhone 13", seen: "1 h ago", build: "2.14.3" },
  { id: 3, name: "Lê Hoàng Anh", role: "Inspector", status: <Chip tone="warning">invited</Chip>,
    device: "—", seen: "never", build: "—" },
];

/* A real sort, not a painted caret: the menu has to move the rows or the
   specimen is demonstrating an affordance rather than a behaviour. */
function useSortedRows() {
  const [sort, setSort] = React.useState({ key: "name", dir: "asc" });
  const sorted = React.useMemo(() => {
    const flat = (v) => (typeof v === "string" ? v : "");
    return [...rows].sort((a, b) => flat(a[sort.key]).localeCompare(flat(b[sort.key])) * (sort.dir === "desc" ? -1 : 1));
  }, [sort]);
  return { sort, setSort, sorted };
}

function Narrow() {
  const { sort, setSort, sorted } = useSortedRows();
  return (
    <Table columns={cols} rows={sorted} caption="Console users, collapsed"
      collapse="cards" detailsLabel="Details" sortLabel="Sort"
      sort={sort} onSort={setSort} />
  );
}

function Wide() {
  const { sort, setSort, sorted } = useSortedRows();
  return (
    <Table columns={cols} rows={sorted} caption="Console users"
      collapse="cards" detailsLabel="Details" sortLabel="Sort"
      sort={sort} onSort={setSort} />
  );
}

/* The same table WITHOUT `collapse`, in a track too narrow for it — the state
   every console list is in today. It is here to show the hint, which is the
   half of this change that reaches a table nobody has migrated yet.
   The values are the REAL lengths a console carries — an address, a model
   string, a stamp. Trimmed sample data is how a specimen convinces itself a
   table fits: 318px of track holds this one at a third of its width. */
const longRows = [
  { id: 1, name: "Nguyễn Thanh Trung", role: "trung.nguyen@leanwise.ai", status: <Chip tone="success">active</Chip>,
    device: "Pixel 7a · Android 15", seen: "2026-09-04 08:42 +07", build: "2.14.3" },
  { id: 2, name: "Trần Minh Khoa", role: "khoa.tran@leanwise.ai", status: <Chip tone="success">active</Chip>,
    device: "iPhone 13 · iOS 18.2", seen: "2026-09-04 07:15 +07", build: "2.14.3" },
  { id: 3, name: "Lê Hoàng Anh", role: "anh.le@leanwise.ai", status: <Chip tone="warning">invited</Chip>,
    device: "—", seen: "never", build: "—" },
];

function Hint() {
  return <Table columns={hintCols} rows={longRows} caption="Console users, uncollapsed" />;
}

ReactDOM.createRoot(document.getElementById("narrow")).render(<Narrow />);
ReactDOM.createRoot(document.getElementById("wide")).render(<Wide />);
ReactDOM.createRoot(document.getElementById("hint")).render(<Hint />);
