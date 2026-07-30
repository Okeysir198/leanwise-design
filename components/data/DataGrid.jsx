import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * The data grid — sticky header, resizable and pinnable columns, bulk selection
 * and optional row windowing.
 *
 * It is deliberately NOT an extension of `Table`. A grid owns its own scroll
 * box and a pile of machinery a static table never needs; merging them would
 * make every simple table pay for it. Reach for `Table` first.
 */
export function DataGrid({
  columns = [], rows = [], rowKey = (r, i) => r.id ?? i,
  sort, onSort, selectable, selected = [], onSelectionChange,
  height = 420, rowHeight = 44, virtualize, overscan = 8,
  onRowClick, empty = "No rows", selectionActions, label = "Data grid", className, ...rest
}) {
  const [widths, setWidths] = React.useState(() => columns.map(c => c.width || 160));
  const [scrollTop, setScrollTop] = React.useState(0);
  const scrollRef = React.useRef(null);
  const drag = React.useRef(null);

  React.useEffect(() => { setWidths(columns.map((c, i) => widths[i] || c.width || 160)); }, [columns.length]);

  const selSet = React.useMemo(() => new Set(selected), [selected]);
  const allOn = rows.length > 0 && rows.every((r, i) => selSet.has(rowKey(r, i)));
  const someOn = !allOn && rows.some((r, i) => selSet.has(rowKey(r, i)));

  const toggleAll = () => onSelectionChange && onSelectionChange(allOn ? [] : rows.map(rowKey));
  const toggleRow = (k) => {
    if (!onSelectionChange) return;
    const next = new Set(selSet);
    next.has(k) ? next.delete(k) : next.add(k);
    onSelectionChange(Array.from(next));
  };

  // Pinned columns stack, so each one's offset is the SUM of the widths before
  // it — a fixed left per column only works while there is exactly one.
  const pinLefts = React.useMemo(() => {
    let acc = selectable ? 44 : 0;
    return columns.map((c, i) => {
      if (!c.pin) return null;
      const l = acc; acc += widths[i] || 160; return l;
    });
  }, [columns, widths, selectable]);
  const lastPin = columns.reduce((last, c, i) => (c.pin ? i : last), -1);

  const onResizeDown = (i, e) => {
    e.preventDefault();
    drag.current = { i, x: e.clientX, w: widths[i] || 160 };
    const move = (ev) => {
      const d = drag.current;
      if (!d) return;
      const min = columns[d.i].minWidth || 72;
      setWidths(w => w.map((v, n) => (n === d.i ? Math.max(min, d.w + ev.clientX - d.x) : v)));
    };
    const up = () => { drag.current = null; window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  // The handle is also a real button, so a keyboard user can size a column.
  const onResizeKey = (i, e) => {
    const d = e.key === "ArrowRight" ? 16 : e.key === "ArrowLeft" ? -16 : 0;
    if (!d) return;
    e.preventDefault();
    const min = columns[i].minWidth || 72;
    setWidths(w => w.map((v, n) => (n === i ? Math.max(min, (v || 160) + d) : v)));
  };

  const win = virtualize && rows.length * rowHeight > height;
  const start = win ? Math.max(0, Math.floor(scrollTop / rowHeight) - overscan) : 0;
  const visibleCount = win ? Math.ceil(height / rowHeight) + overscan * 2 : rows.length;
  const slice = win ? rows.slice(start, start + visibleCount) : rows;
  const padTop = win ? start * rowHeight : 0;
  const padBottom = win ? Math.max(0, (rows.length - start - slice.length) * rowHeight) : 0;

  const total = (selectable ? 44 : 0) + widths.reduce((s, w) => s + (w || 160), 0);

  return (
    <div className={cx("lw-dgrid", className)} {...rest}>
      {selectable && selSet.size > 0 && (
        <div className="lw-dgrid-selbar">
          <span className="count">{selSet.size}</span>
          <span>selected</span>
          <span className="lw-dgrid-selbar-spacer" />
          {selectionActions}
          <button type="button" className="lw-filter-clear" onClick={() => onSelectionChange && onSelectionChange([])}>Clear</button>
        </div>
      )}
      <div ref={scrollRef} className="lw-dgrid-scroll" style={{ maxHeight: height }}
        onScroll={win ? (e) => setScrollTop(e.currentTarget.scrollTop) : undefined}>
        <table style={{ minWidth: total }} aria-label={label} aria-rowcount={rows.length}>
          <colgroup>
            {selectable && <col style={{ width: 44 }} />}
            {columns.map((c, i) => <col key={c.key} style={{ width: widths[i] || 160 }} />)}
          </colgroup>
          <thead>
            <tr>
              {selectable && (
                <th data-pin="true" style={{ left: 0 }} scope="col">
                  <span className="lw-dgrid-check">
                    <label className="lw-check" style={{ gap: 0 }}>
                      <input type="checkbox" checked={allOn}
                        ref={(el) => { if (el) el.indeterminate = someOn; }}
                        onChange={toggleAll} aria-label={allOn ? "Clear selection" : "Select all rows"} />
                      <span className="box" />
                    </label>
                  </span>
                </th>
              )}
              {columns.map((c, i) => {
                const dir = sort && sort.key === c.key ? sort.dir : null;
                return (
                  <th key={c.key} scope="col" className={cx(c.num && "num")}
                    data-pin={c.pin ? "true" : undefined}
                    data-pin-last={c.pin && i === lastPin ? "true" : undefined}
                    style={c.pin ? { left: pinLefts[i] } : undefined}
                    aria-sort={dir ? (dir === "asc" ? "ascending" : "descending") : undefined}>
                    {c.sortable && onSort ? (
                      <button type="button" className="lw-dgrid-sort"
                        onClick={() => onSort({ key: c.key, dir: dir === "asc" ? "desc" : "asc" })}>
                        {c.header}
                        <Icon name={dir === "asc" ? "sort-asc" : dir === "desc" ? "sort-desc" : "chevrons-up-down"} size={13} />
                      </button>
                    ) : c.header}
                    {c.resizable !== false && (
                      <button type="button" className="lw-dgrid-resize" aria-label={"Resize " + (typeof c.header === "string" ? c.header : c.key)}
                        onPointerDown={(e) => onResizeDown(i, e)} onKeyDown={(e) => onResizeKey(i, e)} />
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {padTop > 0 && <tr aria-hidden="true" style={{ height: padTop }}><td colSpan={columns.length + (selectable ? 1 : 0)} style={{ padding: 0, border: 0 }} /></tr>}
            {slice.map((r, n) => {
              const i = start + n;
              const k = rowKey(r, i);
              const on = selSet.has(k);
              return (
                <tr key={k} aria-selected={on || undefined} aria-rowindex={i + 2}
                  style={{ height: rowHeight, cursor: onRowClick ? "pointer" : undefined }}
                  onClick={onRowClick ? () => onRowClick(r, i) : undefined}>
                  {selectable && (
                    <td data-pin="true" style={{ left: 0 }} onClick={(e) => e.stopPropagation()}>
                      <span className="lw-dgrid-check">
                        <label className="lw-check" style={{ gap: 0 }}>
                          <input type="checkbox" checked={on} onChange={() => toggleRow(k)}
                            aria-label={"Select row " + (i + 1)} />
                          <span className="box" />
                        </label>
                      </span>
                    </td>
                  )}
                  {columns.map((c, ci) => (
                    <td key={c.key} className={cx(c.num && "num")}
                      data-pin={c.pin ? "true" : undefined}
                      data-pin-last={c.pin && ci === lastPin ? "true" : undefined}
                      style={c.pin ? { left: pinLefts[ci] } : undefined}>
                      {c.render ? c.render(r, i) : r[c.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
            {padBottom > 0 && <tr aria-hidden="true" style={{ height: padBottom }}><td colSpan={columns.length + (selectable ? 1 : 0)} style={{ padding: 0, border: 0 }} /></tr>}
          </tbody>
        </table>
        {!rows.length && <div className="lw-dgrid-empty">{empty}</div>}
      </div>
    </div>
  );
}
