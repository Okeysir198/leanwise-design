const cx = (...a) => a.filter(Boolean).join(" ");


/** The browser-frame motif: chrome, a mono stream, an optional status foot.
 *
 *  A log line is either `text` (one free-running string) or `cells` — an array
 *  of fields that align into real grid columns across every line. Use `cells`
 *  for anything tabular: padding a mono string with runs of spaces looks aligned
 *  in the source and is wrong the moment one value is longer than the author
 *  guessed, or the frame gets narrow enough to re-wrap. A cell may be a plain
 *  string, or { text, num, muted } — `num` right-aligns and tabularises.
 *
 *  The two shapes mix freely: a plain `text` line inside a columned log spans
 *  every field column rather than being squeezed into the first one, so a
 *  free-running status line can sit between two tabular ones. */
export function Console({ url = "leanwise.ai", title, lines, foot, className, children, ...rest }) {
  // Columns: the timestamp gutter, then one per cell, then a flexible spacer.
  // Every content column hugs, so a right-aligned number lands just past the
  // longest detail rather than at the far edge of the frame — a figure flung to
  // the opposite side of a wide console reads as belonging to no row at all.
  // The last cell column may shrink below max-content so long free text wraps
  // instead of overflowing the frame.
  const cellCount = lines ? lines.reduce((n, l) => Math.max(n, l.cells ? l.cells.length : 0), 0) : 0;
  const logStyle = cellCount
    ? {
        gridTemplateColumns:
          "max-content " +
          "max-content ".repeat(Math.max(0, cellCount - 1)) +
          "minmax(0, max-content) 1fr"
      }
    : undefined;
  return (
    <div className={cx("lw-console", className)} {...rest}>
      <div className="lw-console-h">
        <span className="left"><span className="lights"><i /><i /><i /></span>{title}</span>
        {url && <span className="url">{url}</span>}
      </div>
      <div className="lw-console-body">
        {lines ? (
          <div className="lw-console-log" role="log" style={logStyle}>
            {lines.map((l, i) => (
              <div key={i} className={cx("lw-console-line", l.tone)}>
                {/* The gutter column is HELD even when this line has no prefix,
                    so a line's fields start in the stream rather than sliding
                    left into the prefix column and misaligning with every line
                    that does carry one. */}
                {(l.t || cellCount > 0) && <span className="t">{l.t}</span>}
                {l.cells
                  ? l.cells.map((c, j) => {
                      const cell = typeof c === "string" ? { text: c } : c || {};
                      return (
                        <span key={j} className={cx("lw-console-cell", cell.num && "num", cell.muted && "muted")}>
                          {cell.text}
                        </span>
                      );
                    })
                  : <span className="lw-console-span">{l.text}</span>}
              </div>
            ))}
          </div>
        ) : children}
      </div>
      {foot && <div className="lw-console-foot">{foot}</div>}
    </div>
  );
}
