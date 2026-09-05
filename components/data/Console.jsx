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
  //
  // EVERY track carries a zero floor, and that is what makes "hug" safe. A bare
  // `max-content` is a hard minimum: it hugs when there is room and REFUSES to
  // give any back when there is not, so on a 320px phone the frame's columns
  // summed to 296px inside a 280px box and the last field of every line was
  // clipped away by the frame's own `overflow: hidden`. Nothing scrolled and
  // nothing warned — the log simply lost a column, which only someone who knew
  // what it said could notice. `minmax(0, max-content)` hugs identically at every
  // width that fits and yields when the frame is narrower than the content;
  // `.lw-console-cell` wraps below --lw-bp-sm so the yielded space is usable.
  // (Only this file could fix it: an inline style outranks every stylesheet, so
  // no consumer override and no media query in base.css could reach these.)
  const cellCount = lines ? lines.reduce((n, l) => Math.max(n, l.cells ? l.cells.length : 0), 0) : 0;
  const logStyle = cellCount
    ? {
        gridTemplateColumns:
          "minmax(0, max-content) " +
          "minmax(0, max-content) ".repeat(Math.max(0, cellCount - 1)) +
          "minmax(0, max-content) minmax(0, 1fr)"
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
