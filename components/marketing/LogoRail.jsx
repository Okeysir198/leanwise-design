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
 * THE MASK READS THE IMAGE'S ALPHA, AND NOTHING ELSE. So the asset contract is
 * a transparent, single-colour silhouette: every pixel that should be ink is
 * opaque, every pixel that should be ground is transparent. A JPEG, a PNG on a
 * white card, or a mark whose lettering is painted in opaque white INSIDE a
 * filled shape all mask to one solid blob — the lettering is opaque too, so it
 * becomes ink. That is the v2.2.0 `mode="mono"` case: the mark is drawn as an
 * <img> under `grayscale()` and the rail's opacity, so a multi-tone raster keeps
 * its internal contrast. Per logo via `logo.mode`, or for the rail via `mode`.
 * Prefer fixing the asset — mono is a fallback for a mark you cannot re-cut.
 *
 * `marquee` duplicates the track for a slow loop. The duplicate lives in the
 * markup rather than being cloned in JS, so reduced motion can simply hide it
 * and fall back to a static wrap.
 */
export function LogoRail({ logos = [], marquee = false, mode = "mask", className, ...rest }) {
  const cells = logos.map((l, i) => {
    if (!l.src) return <span key={i} className="lw-logo-item is-text">{l.name}</span>;
    if ((l.mode ?? mode) === "mono") return <img key={i} className="lw-logo-item is-image" src={l.src} alt={l.name} decoding="async" />;
    return <span key={i} className="lw-logo-item" style={{ "--lw-logo-src": `url("${l.src}")` }} role="img" aria-label={l.name} />;
  });
  return (
    <div className={cx("lw-logo-rail", marquee && "marquee", className)} {...rest}>
      {marquee
        ? <><div className="lw-logo-track">{cells}</div><div className="lw-logo-track" aria-hidden="true">{cells}</div></>
        : cells}
    </div>
  );
}
