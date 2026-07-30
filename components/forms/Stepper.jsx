import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * Wizard progress. The marker carries the state — the number becomes a check
 * once the step is done — so progress survives greyscale and does not depend on
 * the connector's tint (README rule 6).
 *
 * A step is only a BUTTON when it is reachable. Rendering every step as a
 * control and disabling the future ones invites a user to try; rendering them
 * as text says what is true, which is that you get there by finishing this one.
 */
export function Stepper({ steps = [], current = 0, onStepChange, vertical, label = "Progress", className, ...rest }) {
  return (
    <div className={cx("lw-stepper", vertical && "lw-stepper-vertical", className)}
      role="group" aria-label={label} {...rest}>
      {steps.map((s, i) => {
        const state = s.state || (i < current ? "done" : i === current ? "current" : "upcoming");
        const reachable = onStepChange && (state === "done" || state === "error");
        const Tag = reachable ? "button" : "div";
        return (
          <Tag key={s.key ?? i} className="lw-stepper-step" data-state={state}
            type={reachable ? "button" : undefined}
            aria-current={state === "current" ? "step" : undefined}
            onClick={reachable ? () => onStepChange(i) : undefined}>
            <span className="lw-stepper-marker" aria-hidden="true">
              {state === "done" ? <Icon name="checkmark" size={14} />
                : state === "error" ? <Icon name="close" size={14} />
                : i + 1}
            </span>
            <span className="lw-stepper-label">
              {s.label}
              {/* The state is in the marker's shape for a sighted user; a screen
                  reader needs it in words. */}
              <span className="lw-sr-only">{" — " + (state === "done" ? "completed" : state === "current" ? "current step" : state === "error" ? "needs attention" : "not started")}</span>
            </span>
            {s.hint && <span className="lw-stepper-hint">{s.hint}</span>}
          </Tag>
        );
      })}
    </div>
  );
}
