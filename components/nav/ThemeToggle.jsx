import { Icon } from "../primitives/Icon.jsx";
const cx = (...a) => a.filter(Boolean).join(" ");


const LABELS = { light: "Light", dark: "Dark", system: "Auto" };
// Mode -> glyph name. The paths live in Icon, not here: a control that redraws
// an icon it could name is the first place the set drifts out of step.
const GLYPHS = { light: "sun", dark: "moon", system: "monitor" };

/**
 * Light / dark by default. Every LeanWise surface is authored in both, so two is
 * what the product ships and two is what the control offers — the supported set
 * is declared, never a third segment hidden with CSS.
 *
 * `system` is still a first-class mode: pass `modes={["light","dark","system"]}`
 * wherever a product honours the OS preference. It is worth offering, because a
 * two-state toggle silently overrides `prefers-color-scheme` forever after the
 * first click — it is simply not a promise THIS product keeps on every screen.
 *
 * Uncontrolled by default — reads and writes `document.documentElement` and
 * localStorage. Pass value + onChange to drive it yourself.
 *
 * A page that paints its OWN theme wrapper (a `.dark` / `data-band` container
 * rather than the document root) must pass value + onChange. Left uncontrolled
 * it writes the root while the wrapper keeps its own value, and the page renders
 * half a theme — dark chips on a light ground.
 *
 * Glyphs, not words: the control sits in app chrome where three text labels cost
 * more room than the choice is worth. Each button is named for assistive tech
 * and carries a title, so the meaning survives without the text.
 */
export function ThemeToggle({ value, onChange, modes = ["light", "dark"], className, ...rest }) {
  const [internal, setInternal] = React.useState(modes.includes("system") ? "system" : modes[0]);
  React.useEffect(() => {
    if (value !== undefined) return;
    try {
      const saved = localStorage.getItem("lw-theme");
      if (saved && modes.includes(saved)) setInternal(saved);
    } catch (e) {}
  }, [value]);
  const mode = value !== undefined ? value : internal;
  const apply = (m) => {
    if (value === undefined) setInternal(m);
    onChange && onChange(m);
    try { localStorage.setItem("lw-theme", m); } catch (e) {}
    const dark = m === "dark" || (m === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const el = document.documentElement;
    el.classList.toggle("dark", dark);
    el.setAttribute("data-theme", dark ? "dark" : "light");
  };
  return (
    <div className={cx("lw-segmented", className)} role="group" aria-label="Colour theme" {...rest}>
      {modes.map((m) => (
        <button key={m} type="button" aria-pressed={mode === m} onClick={() => apply(m)}
          aria-label={LABELS[m] || m} title={LABELS[m] || m}>
          <Icon name={GLYPHS[m] || "monitor"} size={16} />
        </button>
      ))}
    </div>
  );
}
