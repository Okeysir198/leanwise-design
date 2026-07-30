const cx = (...a) => a.filter(Boolean).join(" ");


/** The panel beside the answer. Each entry carries where it came from — an
 *  answer whose provenance is not inspectable is not verifiable. */
export function SourceList({ sources = [], className, ...rest }) {
  return (
    <div className={cx("lw-source-list", className)} {...rest}>
      {sources.map((s, i) => {
        // An <a> with no href is not focusable and not announced as a control —
        // so an item without a URL renders as the button it actually is.
        const Tag = s.href ? "a" : "button";
        return (
        <Tag key={s.id ?? i} className="lw-source-item" href={s.href || undefined}
          type={s.href ? undefined : "button"} onClick={s.onClick}>
          <span className="n">{s.n ?? i + 1}</span>
          <span className="lw-source-main">
            <span className="t">{s.title}</span>
            {s.meta && <span className="m">{s.meta}</span>}
          </span>
        </Tag>
        );
      })}
    </div>
  );
}
