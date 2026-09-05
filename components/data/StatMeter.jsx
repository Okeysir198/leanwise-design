import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");


/**
 * A number that reads as a measurement rather than a decoration: a unit, a
 * direction, a bar, and — where one exists — a target marker. Without the
 * target a reader cannot tell whether 94% is good news.
 */
export function StatMeter({
  label, value, unit, delta, direction, percent, target, tone, foot, interactive = false,
  formatValueText = (p, t) => p + "% of a " + t + "% target",
  className, ...rest
}) {
  // A native <button> cannot hold the bar and the stat row — its content model
  // is phrasing content, and this tile is divs. So the interactive form takes
  // the full ARIA button contract instead of a bare tabindex: a role, and
  // Enter/Space activation. A focusable element with no role and no key handler
  // is a tab stop that does nothing.
  const onKeyDown = (e) => {
    if (!interactive || (e.key !== "Enter" && e.key !== " ")) return;
    e.preventDefault();
    rest.onClick && rest.onClick(e);
  };
  return (
    <div className={cx("lw-card", "lw-stat-tile", interactive && "lw-card-interactive", className)}
      role={interactive ? "button" : undefined} tabIndex={interactive ? 0 : undefined}
      onKeyDown={interactive ? onKeyDown : undefined} {...rest}>
      {label && <span className="lw-card-eyebrow">{label}</span>}
      <div className="lw-stat-row">
        <div className="lw-stat">
          <span className="n">{value}{unit && <span className="u">{unit}</span>}</span>
        </div>
        {delta && (
          <span className="lw-stat-delta" data-dir={direction}>
            {(direction === "up" || direction === "down") && <Icon name={"arrow-" + direction} size={13} />}
            {delta}
          </span>
        )}
      </div>
      {percent != null && (
        <div className="lw-bar" data-tone={tone} style={{ "--lw-bar-value": percent + "%" }}
          role="meter" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}
          aria-label={typeof label === "string" ? label : undefined}
          aria-valuetext={target != null ? formatValueText(percent, target) : undefined}>
          <i className="fill" />
          {/* insetInlineStart, not left: the bar is a logical row and an RTL page fills
              it from the other edge, so a physical offset puts the target marker on
              the wrong side of its own measurement. */}
          {target != null && <span className="target" style={{ insetInlineStart: target + "%" }} />}
        </div>
      )}
      {foot && <span className="lw-stat-foot">{foot}</span>}
    </div>
  );
}
