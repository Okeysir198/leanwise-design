import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");


/**
 * One turn. The assistant sits left, full measure, with a brand avatar; the
 * user's turn mirrors to the right in a bounded bubble. The asymmetry is the
 * point: a reader scanning a long session finds their own questions by shape,
 * while the answer keeps the line length that citation-dense prose needs.
 *
 * The badge is a ROLE marker, not an identity: a sparkle for the assistant and a
 * person glyph for the user. Initials would imply which teammate asked, which a
 * single-user thread cannot tell you. Pass `avatar` to override.
 *
 * `streaming` shows the caret. It must go off the moment the stream ends, or
 * the UI claims to still be thinking.
 */
// A sparkle for the assistant: the generated-answer mark users already read as
// "a model wrote this". Both glyphs come from Icon rather than being redrawn
// here — a second copy of a path is a second thing to keep in step.
export function Message({ role = "ai", who, avatar, streaming = false, footer, className, children, ...rest }) {
  const name = who || (role === "ai" ? "LeanWise" : "You");
  const glyph = avatar || <Icon name={role === "ai" ? "spark" : "user"} size={role === "ai" ? 19 : 16} />;
  return (
    <div className={cx("lw-msg", role, className)} data-streaming={streaming ? "true" : undefined} {...rest}>
      <span className="lw-msg-avatar" aria-hidden="true">{glyph}</span>
      <div className="lw-msg-main">
        <span className="who">{name}</span>
        <div className="body">{children}{footer}</div>
      </div>
    </div>
  );
}
