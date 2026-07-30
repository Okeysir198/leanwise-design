import { Icon } from "../primitives/Icon.jsx";
import { Button } from "../primitives/Button.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

const SIGN = { add: "+", del: "−", mod: "~" };

/**
 * Accept or reject a model's edits, hunk by hunk — the most under-designed
 * surface in AI products, and the one that decides whether people trust the
 * feature.
 *
 * The gutter carries the sign as well as the ground, so the diff reads in
 * greyscale and to a colour-blind reader (README rule 6), and the ground tokens
 * are GROUNDS: the text on top stays `--lw-fg`, because green-on-green is
 * unreadable at exactly the moment it matters.
 */
export function DiffReview({ hunks = [], decisions = {}, onDecide, onAcceptAll, onRejectAll, label = "Proposed changes", className, ...rest }) {
  const pending = hunks.filter(h => !decisions[h.id]).length;
  return (
    <div className={cx("lw-diff", className)} role="group" aria-label={label} {...rest}>
      {hunks.map((h) => {
        const d = decisions[h.id];
        return (
          <div key={h.id} className="lw-diff-hunk" data-decision={d}>
            <div className="lw-diff-head">
              <Icon name="file" size={14} style={{ color: "var(--lw-fg-subtle)", flex: "none" }} />
              <span className="lw-diff-file">{h.file}{h.range ? " · " + h.range : ""}</span>
            </div>
            <div className="lw-diff-lines">
              {h.lines.map((l, i) => (
                <div key={i} className="lw-diff-line" data-kind={l.kind}>
                  <span className="n">{l.n ?? ""}</span>
                  <span className="s" aria-hidden="true">{SIGN[l.kind] || ""}</span>
                  <span className="t">
                    {l.kind && <span className="lw-sr-only">{l.kind === "add" ? "added: " : l.kind === "del" ? "removed: " : "changed: "}</span>}
                    {l.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="lw-diff-foot">
              <span className="lw-diff-state">
                {d === "accepted" ? "Accepted" : d === "rejected" ? "Rejected" : h.note || ""}
              </span>
              {d ? (
                <Button size="sm" variant="ghost" onClick={() => onDecide && onDecide(h.id, null)}>
                  <Icon name="undo" size={14} />Undo
                </Button>
              ) : (
                <>
                  <Button size="sm" variant="ghost" onClick={() => onDecide && onDecide(h.id, "rejected")}>Reject</Button>
                  <Button size="sm" onClick={() => onDecide && onDecide(h.id, "accepted")}>Accept</Button>
                </>
              )}
            </div>
          </div>
        );
      })}
      {hunks.length > 1 && (
        <div className="lw-diff-foot">
          <span className="lw-diff-state" aria-live="polite">
            {pending ? pending + " of " + hunks.length + " still to review" : "All " + hunks.length + " reviewed"}
          </span>
          <Button size="sm" variant="ghost" onClick={onRejectAll} disabled={!pending}>Reject all</Button>
          <Button size="sm" onClick={onAcceptAll} disabled={!pending}>Accept all</Button>
        </div>
      )}
    </div>
  );
}
