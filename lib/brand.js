/**
 * Per-tenant brand theming.
 *
 * A tenant supplies one hex; this derives a coherent, accessible theme from it by
 * overriding exactly three CSS variables on a subtree.
 *
 * Three rules the previous implementations each got wrong:
 *
 * 1. **Override --primary, never --accent.** In shadcn, `--accent` is the
 *    ghost-button hover and menu highlight — a faint *surface*, not a brand color.
 *    VSS overrode it with a saturated hash-picked color, which is why its hover
 *    states shout. The brand belongs in `--primary` (and `--ring`).
 *
 * 2. **There is no "no-brand" state.** With no tenant color we return `{}` and the
 *    tokens fall through to LeanWise teal. VSS instead left `--accent` at the
 *    shadcn zinc default on unauthenticated routes, so the Brandmark and the
 *    AuthCard's "accent wash" rendered as near-invisible grey on /login and /signup.
 *
 * 3. **Clamp what the tenant gives you.** A customer will eventually pick #000000
 *    or #FFFF00. Unclamped, the first makes every primary button vanish into the
 *    text color and the second makes it unreadable. We clamp lightness into a band
 *    that stays legible against both themes, and force a saturation floor so a grey
 *    "brand" cannot masquerade as a disabled control. The ink on top is then chosen
 *    by measured luminance, not by guessing.
 */

/** Lightness band a brand fill must sit in to stay legible. Tighter on light. */
const L_MIN_LIGHT = 32;
const L_MAX_LIGHT = 62;
const L_MIN_DARK = 42;
const L_MAX_DARK = 70;
/** Below this saturation a "brand color" is indistinguishable from a disabled grey. */
const S_MIN = 25;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

function hexToRgb(hex) {
  const s = hex.trim().replace(/^#/, "");
  const full = s.length === 3 ? s.split("").map((c) => c + c).join("") : s;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

/** WCAG relative luminance. */
function luminance([r, g, b]) {
  const lin = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/**
 * Pick the readable ink for text on a given fill: near-black navy or white.
 * The threshold is the crossover where contrast against #0B1220 overtakes white —
 * which is why the LeanWise teal and orange both take navy ink.
 */
export function inkOn(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#FFFFFF";
  return luminance(rgb) > 0.35 ? "#0B1220" : "#FFFFFF";
}

/** hex → the `H S% L%` triple shadcn composes with, clamped into the legible band. */
export function hexToHslTriple(hex, dark = false) {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const [r, g, b] = rgb.map((v) => v / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  const H = h * 360;
  const S = clamp(s * 100, S_MIN, 100);
  const L = clamp(l * 100, dark ? L_MIN_DARK : L_MIN_LIGHT, dark ? L_MAX_DARK : L_MAX_LIGHT);
  return `${H.toFixed(1)} ${S.toFixed(1)}% ${L.toFixed(1)}%`;
}

/**
 * The CSS-variable bundle to spread onto a container's `style` prop.
 *
 * Returns `{}` for a missing/unparseable color so the subtree inherits the
 * LeanWise teal from tokens.css — the "no-brand" state does not exist.
 *
 *   <div style={brandVars(org?.accent)}>…</div>
 *
 * Scope it to the tenant's workspace, NOT to <html>: marketing chrome, auth pages
 * and the platform-admin console must stay LeanWise teal, not the customer's color.
 */
export function brandVars(accent, dark = false) {
  if (!accent) return {};
  const triple = hexToHslTriple(accent, dark);
  if (!triple) return {};

  // The clamp may have moved the color, so pick ink from the CLAMPED value —
  // choosing it from the raw hex would be a lie about what is actually rendered.
  const [h, s, l] = triple.replace(/%/g, "").split(/\s+/).map(Number);
  const ink = inkOn(hslToHex(h, s, l));

  return {
    "--primary": triple,
    "--primary-foreground": ink === "#0B1220" ? "220 48.8% 8.4%" : "0 0% 100%",
    "--ring": triple,
    // Chip/badge tint, derived from the same hue so it always harmonizes.
    "--primary-soft": `${h} ${s}% ${dark ? 18 : 95}%`,
  };
}

function hslToHex(h, s, l) {
  const S = s / 100;
  const L = l / 100;
  const k = (n) => (n + h / 30) % 12;
  const a = S * Math.min(L, 1 - L);
  const f = (n) => L - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const to255 = (v) => Math.round(v * 255).toString(16).padStart(2, "0");
  return `#${to255(f(0))}${to255(f(8))}${to255(f(4))}`;
}

/** Two-letter monogram from a display name — the avatar/logo fallback. */
export function monogram(name) {
  if (!name) return "??";
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "??";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}
