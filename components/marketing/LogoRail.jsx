const cx = (...a) => a.filter(Boolean).join(" ");


/**
 * Logo wall. `.lw-logo-rail` is itself the flex row, so the cells are direct
 * children in the static case — the `.lw-logo-track` wrapper is only styled
 * under `.marquee`, and wrapping unconditionally stacks the rail vertically.
 *
 * A mark with `src` is MASKED to one ink (`--lw-logo-src`), never drawn as an
 * <img>: customer marks arrive in a dozen inks and two will clash. A mark with
 * only a name degrades to a mono wordmark — not a bordered placeholder box.
 *
 * `marquee` duplicates the track for a slow loop. The duplicate lives in the
 * markup rather than being cloned in JS, so reduced motion can simply hide it
 * and fall back to a static wrap.
 */
export function LogoRail({ logos = [], marquee = false, className, ...rest }) {
  const cells = logos.map((l, i) =>
    l.src
      ? <span key={i} className="lw-logo-item" style={{ "--lw-logo-src": `url("${l.src}")` }} role="img" aria-label={l.name} />
      : <span key={i} className="lw-logo-item is-text">{l.name}</span>
  );
  return (
    <div className={cx("lw-logo-rail", marquee && "marquee", className)} {...rest}>
      {marquee
        ? <><div className="lw-logo-track">{cells}</div><div className="lw-logo-track" aria-hidden="true">{cells}</div></>
        : cells}
    </div>
  );
}
