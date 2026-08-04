"use client";
import * as React from "react";
import { Icon } from "../primitives/Icon.jsx";
import { paint, persist, THEME_EVENT, THEME_KEY } from "../../hooks.js";
import { useRadioGroup } from "../_radio-group.js";
const cx = (...a) => a.filter(Boolean).join(" ");


/* A module export, not a barrel one — the same treatment `RANGE_PRESETS` gets.
   Reachable for a wrapper that wants to spread-and-override one mode without
   growing the public API surface. */
export const THEME_LABELS = { light: "Light", dark: "Dark", system: "Auto" };
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
 *
 * `radiogroup` / `radio` / `aria-checked`, not `aria-pressed` — the modes are one
 * choice, not three independent toggles. Same call as `Segmented`, and the same
 * roving tabindex and arrow keys: see `_radio-group.js`.
 */
export function ThemeToggle({
  value, onChange, modes = ["light", "dark"],
  label = "Colour theme", modeLabels = THEME_LABELS,
  compact = false, formatCompactLabel = (l, current, next) => l + ": " + current + ". " + next,
  className, ...rest
}) {
  const [internal, setInternal] = React.useState(modes.includes("system") ? "system" : modes[0]);
  React.useEffect(() => {
    if (value !== undefined) return;
    try {
      const saved = localStorage.getItem(THEME_KEY);
      // paint(), not just setInternal(): restoring the saved mode into state
      // without applying it left the buttons and the document disagreeing.
      if (saved && modes.includes(saved)) { setInternal(saved); paint(saved); }
    } catch (e) {}
  }, [value]);
  /* Follow the DOCUMENT, not just this instance's own clicks.
   *
   * The theme has one source of truth and any number of views onto it, and since
   * v1.3.4 the top bar routinely renders two of THIS control — a segmented one
   * for a wide bar and a `compact` one for a phone. Without this the copy that
   * is off-screen keeps whatever mode it mounted with, and a resize past the
   * breakpoint reveals a control highlighting the wrong segment. Nothing throws
   * and the page is the right colour; the control simply lies. `paint()` fires
   * THEME_EVENT for exactly this, so any consumer that drives the theme from its
   * own code gets the same consistency for free. */
  React.useEffect(() => {
    if (value !== undefined) return;
    const on = (e) => { if (modes.includes(e.detail)) setInternal(e.detail); };
    window.addEventListener(THEME_EVENT, on);
    return () => window.removeEventListener(THEME_EVENT, on);
    /* modes.join, not modes: an inline array literal is a new identity on every
       render, and depending on it would tear the listener down and rebuild it in
       a loop. */
  }, [value, modes.join(",")]);
  const mode = value !== undefined ? value : internal;
  const apply = (m) => {
    if (value === undefined) setInternal(m);
    onChange && onChange(m);
    // Only the UNCONTROLLED toggle owns the global key. A controlled one is a
    // view onto the host's state; persisting behind its back is not ours to do.
    /* persist(), not a local localStorage write: the choice has to reach the
       COOKIE too or an SSR consumer cannot resolve the theme server-side. This
       component having its own copy of the write is how it missed that. */
    if (value === undefined) persist(m);
    paint(m);
  };
  /* ── compact: one button that CYCLES ──────────────────────────────────────
   *
   * A phone bar has room for the brand, one CTA and the nav toggle, and that is
   * the whole budget: the three-segment control is 144px on a 375px bar whose
   * contents do not shrink, so it is the single item that pushes the row past
   * the viewport and drags the document sideways. Shrinking the segments is not
   * an answer — they are already at the coarse-pointer floor.
   *
   * So the narrow form is a different CONTROL, not a smaller one: one button
   * showing the current mode, advancing to the next on press. That is a real
   * trade and worth naming — cycling hides the destination behind a press and
   * costs up to N-1 presses to reach a given mode, which is why it is opt-in and
   * why the wide bar keeps the segmented control that shows all N at once.
   *
   * The accessible name carries BOTH the current mode and what pressing will do,
   * because neither alone is usable: "Dark" leaves a screen-reader user unable to
   * predict the press, and "Switch to Auto" never tells them where they are. The
   * name changes on press, which is the standard toggle-button contract — AT
   * re-announces the newly focused name, so the state change is spoken.
   *
   * NOT `role="radiogroup"` with one radio, and not `aria-pressed`: one button is
   * not a group, and `aria-pressed` describes a binary that a three-mode cycle
   * is not. A plain button with a truthful name is the honest mapping. */
  if (compact) {
    const next = modes[(Math.max(0, modes.indexOf(mode)) + 1) % modes.length];
    const name = formatCompactLabel(label, modeLabels[mode] || mode, modeLabels[next] || next);
    return (
      <button
        type="button"
        /* `.lw-hit` grows the target to the 44px coarse-pointer floor with an
           absolutely positioned ::after, so the button stays 28px in the bar
           without being a 28px TOUCH target. It needs a positioned host, which
           `.lw-theme-compact` supplies. */
        className={cx("lw-icon-btn", "lw-hit", "lw-theme-compact", className)}
        aria-label={name}
        title={name}
        onClick={() => apply(next)}
        {...rest}
      >
        <Icon name={GLYPHS[mode] || "monitor"} size={18} />
      </button>
    );
  }

  const { ref, onKeyDown, tabIndexFor } = useRadioGroup(modes, mode, apply);
  return (
    <div ref={ref} className={cx("lw-segmented", className)} role="radiogroup" aria-label={label}
      onKeyDown={onKeyDown} {...rest}>
      {modes.map((m, i) => (
        <button key={m} type="button" role="radio" aria-checked={mode === m}
          tabIndex={tabIndexFor(i)} onClick={() => apply(m)}
          aria-label={modeLabels[m] || m} title={modeLabels[m] || m}>
          <Icon name={GLYPHS[m] || "monitor"} size={16} />
        </button>
      ))}
    </div>
  );
}
