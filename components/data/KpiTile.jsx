import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");


/**
 * One number, its label, at most one delta. Anything more is a Card.
 *
 * `direction` is which way the number moved (the arrow). `tone` is whether that
 * is good (the ink). They agree for revenue and disagree for latency, so they
 * are two props — fusing them paints every latency improvement red. Tone
 * defaults to direction when you do not say otherwise.
 *
 * The delta sits on the number's baseline to its RIGHT, not under it: the two
 * are one statement — "18.4k, up 12.1%" — and stacking them reads as two
 * separate figures. `icon` marks the tile's subject and sits opposite the
 * label, where it identifies the tile without competing with the number.
 *
 * `accent` tints the icon by SUBJECT — what the tile measures — and is a
 * different fact from `tone`, which judges how the number moved. Defaulting the
 * accent to the tone would paint three of four tiles green on a healthy
 * dashboard and say nothing the delta has not already said. Failures are the
 * danger family because failures are what they are, whichever way the count went.
 *
 * The chip's class sits on a WRAPPER, never on the Icon itself. A class shared
 * with the svg would be styled by a box rule the svg's own inline size always
 * outranks — so any mismatch between this file and the stylesheet would paint a
 * tinted 16px square rather than falling back to a plain glyph.
 */
export function KpiTile({ label, value, icon, accent = "brand", delta, direction, tone, note, className, ...rest }) {
  const ink = tone || (direction === "up" ? "pos" : direction === "down" ? "neg" : undefined);
  return (
    <div className={cx("lw-kpi", className)} {...rest}>
      <span className="lw-kpi-head">
        <span className="k">{label}</span>
        {icon && (
          <span className="lw-kpi-badge" data-accent={accent}>
            <Icon name={icon} size={18} />
          </span>
        )}
      </span>
      <span className="lw-kpi-row">
        <span className="v">{value}</span>
        {(delta || note) && (
          <span className={cx("d", direction, ink)}>
            {direction && <Icon name={direction === "up" ? "arrow-up" : "arrow-down"} size={13} />}
            {delta}{note && <span className="w">{note}</span>}
          </span>
        )}
      </span>
    </div>
  );
}
