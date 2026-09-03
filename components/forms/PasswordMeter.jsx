import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * Four segments and a word. `.lw-pwmeter` has been in product.css since v1.2
 * with nothing emitting it — a stranded style, which `REVIEW.md` names as its
 * own class of defect.
 *
 * ⚠️ NEVER COLOUR ALONE. The CSS comment beside the class says it: the label
 * next to the bar carries the judgement in words, because four green bars and
 * four red bars are the same picture in greyscale and to a colour-blind reader.
 *
 * ⚠️ IT SCORES NOTHING. `level` is the consumer's, from whatever estimator they
 * already trust — zxcvbn, a server policy, a length rule. A design system that
 * shipped its own scoring would be making a security claim it cannot support,
 * and would disagree with the server that actually enforces the rule.
 */
export function PasswordMeter({ level = 0, label, labels, className, ...rest }) {
  const clamped = Math.max(0, Math.min(4, Math.round(level)));
  const word = label ?? labels?.[clamped];
  return (
    <div className={cx("lw-pw-strength", className)} {...rest}>
      <div className="lw-pwmeter" data-level={clamped || undefined} aria-hidden="true">
        <span /><span /><span /><span />
      </div>
      {word ? (
        /* Announced, not merely present: strength changes as the user types and
           a silent bar tells a screen-reader user nothing at all. */
        <p className="lw-help" role="status">
          {clamped >= 3 ? <Icon name="check" size={13} /> : null}
          {word}
        </p>
      ) : null}
    </div>
  );
}
