import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * The side surface that holds generated output. Versioned, with a way back —
 * an artifact you cannot revert is a document the model can overwrite.
 *
 * The system rule this encodes: an AI surface is never the ONLY path to an
 * outcome. `onEdit` is not optional decoration; it is the manual equivalent of
 * whatever produced this.
 */
export function Artifact({ title, version, versionCount, onPrevVersion, onNextVersion, onRevert, onEdit, actions, className, children, ...rest }) {
  const canPrev = version > 1;
  const canNext = versionCount != null && version < versionCount;
  return (
    <div className={cx("lw-artifact", className)} {...rest}>
      <div className="lw-artifact-head">
        <Icon name="file" size={15} style={{ color: "var(--lw-fg-subtle)", flex: "none" }} />
        <span className="lw-artifact-title">{title}</span>
        {version != null && (
          <>
            <button type="button" className="lw-icon-btn" aria-label="Previous version" disabled={!canPrev} onClick={onPrevVersion}>
              <Icon name="chevron-left" size={15} />
            </button>
            <span className="lw-artifact-ver">v{version}{versionCount ? " / " + versionCount : ""}</span>
            <button type="button" className="lw-icon-btn" aria-label="Next version" disabled={!canNext} onClick={onNextVersion}>
              <Icon name="chevron-right" size={15} />
            </button>
          </>
        )}
      </div>
      <div className="lw-artifact-body">{children}</div>
      {(onRevert || onEdit || actions) && (
        <div className="lw-artifact-foot">
          {onEdit && (
            <button type="button" className="lw-btn lw-btn-ghost lw-btn-sm" onClick={onEdit}>
              <Icon name="edit" size={14} />Edit manually
            </button>
          )}
          {onRevert && (
            <button type="button" className="lw-btn lw-btn-ghost lw-btn-sm" onClick={onRevert}>
              <Icon name="undo" size={14} />Revert
            </button>
          )}
          <span style={{ flex: 1 }} />
          {actions}
        </div>
      )}
    </div>
  );
}
