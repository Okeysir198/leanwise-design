"use client";
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
export function DiffReview({
  hunks = [], decisions = {}, onDecide, onAcceptAll, onRejectAll,
  label = "Proposed changes",
  acceptLabel = "Accept", rejectLabel = "Reject", undoLabel = "Undo",
  acceptAllLabel = "Accept all", rejectAllLabel = "Reject all",
  acceptedLabel = "Accepted", rejectedLabel = "Rejected",
  kindLabels = { add: "added: ", del: "removed: ", mod: "changed: " },
  formatProgress = (p, t) => (p ? p + " of " + t + " still to review" : "All " + t + " reviewed"),
  className, ...rest
}) {
  const pending = hunks.filter(h => !decisions[h.id]).length;
  return (
    <div className={cx("lw-diff", className)} role="group" aria-label={label} {...rest}>
      {hunks.map((h) => {
        const d = decisions[h.id];
        return (
          <div key={h.id} className="lw-diff-hunk" data-decision={d}>
            <div className="lw-diff-head">
              <Icon name="file" size={14} className="lw-diff-ic" />
              <span className="lw-diff-file">{h.file}{h.range ? " · " + h.range : ""}</span>
            </div>
            <div className="lw-diff-lines">
              {h.lines.map((l, i) => (
                <div key={i} className="lw-diff-line" data-kind={l.kind}>
                  <span className="n">{l.n ?? ""}</span>
                  <span className="s" aria-hidden="true">{SIGN[l.kind] || ""}</span>
                  <span className="t">
                    {l.kind && <span className="lw-sr-only">{kindLabels[l.kind] ?? kindLabels.mod}</span>}
                    {l.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="lw-diff-foot">
              <span className="lw-diff-state">
                {d === "accepted" ? acceptedLabel : d === "rejected" ? rejectedLabel : h.note || ""}
              </span>
              {d ? (
                <Button size="sm" variant="ghost" onClick={() => onDecide && onDecide(h.id, null)}>
                  <Icon name="undo" size={14} />{undoLabel}
                </Button>
              ) : (
                <>
                  <Button size="sm" variant="ghost" onClick={() => onDecide && onDecide(h.id, "rejected")}>{rejectLabel}</Button>
                  <Button size="sm" onClick={() => onDecide && onDecide(h.id, "accepted")}>{acceptLabel}</Button>
                </>
              )}
            </div>
          </div>
        );
      })}
      {hunks.length > 1 && (
        <div className="lw-diff-foot">
          <span className="lw-diff-state" aria-live="polite">
            {formatProgress(pending, hunks.length)}
          </span>
          <Button size="sm" variant="ghost" onClick={onRejectAll} disabled={!pending}>{rejectAllLabel}</Button>
          <Button size="sm" onClick={onAcceptAll} disabled={!pending}>{acceptAllLabel}</Button>
        </div>
      )}
    </div>
  );
}
