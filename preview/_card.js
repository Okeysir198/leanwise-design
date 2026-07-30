// Cards render inside the Design System pane, which may be light or dark.
// Mirror the host's theme onto our own root so tokens.css resolves correctly.
(function () {
  var m = window.matchMedia('(prefers-color-scheme: dark)');
  var root = document.documentElement;
  // Defer to an explicit host choice. This ran unconditionally at parse time and
  // on every OS change, overwriting whatever data-theme the host pane — or a gate
  // mid-run — had already set. The file's own header says "mirror the host's
  // theme"; mirroring means following it, not overwriting it.
  var owned = !root.hasAttribute('data-theme');
  function apply() {
    if (!owned) return;
    root.setAttribute('data-theme', m.matches ? 'dark' : 'light');
  }
  apply();
  m.addEventListener('change', apply);
})();

// ---------------------------------------------------------------------------
// Swatch hydration — no card carries a hex or a ratio as literal text.
//
// A baked hex is a second home for a value that already has one, and it goes
// stale silently. So a swatch declares only a TOKEN NAME: the fill comes from
// tokens.css via var(), the hex is read back off the resolved computed style,
// and the ratio is measured with the same WCAG 2.1 math as the contrast gate.
// Re-sample the brand and every card follows on the
// next render, with no card edited.
//
//   <div class="sw" data-swatch="brand-500" data-ink="white"><b>500</b></div>
//
// data-ink is optional. Omit it and the ink is CHOSEN by measurement — which
// makes the card demonstrate the "ink follows the fill's lightness" rule rather
// than assert it. Pass white/navy to pin it when the point is the pinned value.
// ---------------------------------------------------------------------------
(function () {
  var WHITE = [255, 255, 255];
  var NAVY = [11, 18, 32]; // --lw-text-1 #0B1220

  function chan(v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  }
  function lum(c) { return 0.2126 * chan(c[0]) + 0.7152 * chan(c[1]) + 0.0722 * chan(c[2]); }
  function ratio(a, b) {
    var x = lum(a), y = lum(b);
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
  }
  function parse(s) {
    var n = (s || '').match(/[\d.]+/g);
    return n ? [+n[0], +n[1], +n[2]] : WHITE;
  }
  /* The page ground, resolved ONCE per hydrate. flatten() needs it for every
     translucent swatch and the ancestor walk almost always misses (each card's
     panes are transparent to the root), so this was a probe insert + forced
     layout per swatch to re-derive one value. */
  var pageGround = WHITE;
  function resolveGround() {
    var probe = document.createElement('span');
    probe.style.cssText = 'display:none;background:var(--lw-bg)';
    document.body.appendChild(probe);
    var pm = (getComputedStyle(probe).backgroundColor || '').match(/[\d.]+/g);
    probe.remove();
    pageGround = pm ? [+pm[0], +pm[1], +pm[2]] : WHITE;
  }

  /** Composite a computed color over a KNOWN ground. */
  function over(css, ground) {
    var n = (css || '').match(/[\d.]+/g);
    if (!n) return ground;
    var c = [+n[0], +n[1], +n[2]];
    var a = n.length > 3 ? +n[3] : 1;
    if (a >= 1) return c;
    return c.map(function (v, i) { return a * v + (1 - a) * ground[i]; });
  }

  /** Composite a possibly-translucent computed color over its opaque ancestor. */
  function flatten(css, host) {
    var n = (css || '').match(/[\d.]+/g);
    if (!n) return WHITE;
    var c = [+n[0], +n[1], +n[2]];
    var a = n.length > 3 ? +n[3] : 1;
    if (a >= 1) return c;
    // Walk to the first OPAQUE ancestor background. Every ancestor is usually
    // transparent up to the root, so the fallback matters more than the walk:
    // it must be --lw-bg (which re-points on dark), never a hardcoded white —
    // assuming white is how the dark cta-soft swatch got navy ink at 1.26.
    var under = null;
    for (var el = host; el && el.nodeType === 1; el = el.parentNode) {
      var m = (getComputedStyle(el).backgroundColor || '').match(/[\d.]+/g);
      if (m && (m.length < 4 || +m[3] >= 1)) { under = [+m[0], +m[1], +m[2]]; break; }
    }
    if (!under) under = pageGround;
    return c.map(function (v, i) { return a * v + (1 - a) * under[i]; });
  }

  function hex(c) {
    return '#' + c.map(function (v) {
      return ('0' + Math.round(v).toString(16)).slice(-2);
    }).join('').toUpperCase();
  }

  /* A token name -> a CSS colour EXPRESSION, resolved against `scope`.
     Several families ship channels only (--lw-success-text-c, no
     --lw-success-text), and a var() that does not resolve silently falls back
     to inherited ink — which is how all four status rows once read the same
     18.72 against white and looked like measured data. Returns null so the
     caller can render "—" rather than a plausible number.

     Written twice (once inline as a nested ternary for [data-hex], once named
     for [data-ratio]) until the hex copy was found to be missing the title/warn
     path the ratio copy had. */
  function expr(scope, name) {
    if (scope.getPropertyValue('--lw-' + name).trim()) return 'var(--lw-' + name + ')';
    if (scope.getPropertyValue('--lw-' + name + '-c').trim()) return 'hsl(var(--lw-' + name + '-c))';
    return null;
  }

  /* Paint an expression on a hidden probe and read back what the browser
     computed. The probe is the only honest way to resolve a var() chain. */
  function measure(host, cssColor) {
    var probe = document.createElement('div');
    probe.style.cssText = 'position:absolute;visibility:hidden;background:' + cssColor;
    host.appendChild(probe);
    // flatten(), not parse(): a `-soft` token is `hsl(<channel> / .14)` and parse()
    // hands back the OPAQUE channel. That is the same bug the swatch path carries
    // an eight-line comment about, and it was live here too.
    var v = flatten(getComputedStyle(probe).backgroundColor, host);
    probe.remove();
    return v;
  }

  function hydrate() {
    resolveGround();
    var sw = document.querySelectorAll('[data-swatch]');
    Array.prototype.forEach.call(sw, function (el) {
      var token = el.getAttribute('data-swatch');
      el.style.background = 'var(--lw-' + token + ')';

      // The `-soft` tints are authored as `hsl(<channel> / .14)`, so the computed
      // background is rgba and parse() would hand back the OPAQUE channel — for
      // cta-soft, full amber. The picker then chose navy ink and painted it on a
      // near-black tint: 1.26:1, on the very card whose job is to publish ratios.
      // Flatten over what the swatch actually sits on before deciding.
      var bg = flatten(getComputedStyle(el).backgroundColor, el.parentNode);
      var pin = el.getAttribute('data-ink');
      var ink = pin === 'white' ? WHITE
              : pin === 'navy' ? NAVY
              : ratio(WHITE, bg) >= ratio(NAVY, bg) ? WHITE : NAVY;

      el.style.color = hex(ink);
      el.setAttribute('data-resolved-ink', ink === WHITE ? 'white' : 'navy');

      // Label: the token's own tier name stays authored (it is structure, not a
      // value); hex + ratio are appended, and replaced on re-render.
      Array.prototype.forEach.call(el.querySelectorAll('[data-derived]'), function (n) {
        n.remove();
      });
      var h = document.createElement('span');
      h.setAttribute('data-derived', '');
      h.textContent = hex(bg);
      var r = document.createElement('span');
      r.setAttribute('data-derived', '');
      r.textContent = ratio(ink, bg).toFixed(2) + ':1';
      el.appendChild(h);
      el.appendChild(r);
    });

    // Inline hex readouts in prose: <b data-hex="warning"></b>. Prose quoted its
    // hexes by hand, and #FA9C02 sat three lines under a swatch reading #FC9D03 —
    // a value with two homes drifts, so prose reads the token like the swatch does.
    Array.prototype.forEach.call(document.querySelectorAll('[data-hex]'), function (el) {
      var name = el.getAttribute('data-hex');
      var host = el.closest('.pane, .card') || document.body;
      var scope = getComputedStyle(host);
      var v = expr(scope, name);
      if (!v) {
        el.textContent = '—';
        el.title = 'unresolved token: --lw-' + name;
        if (typeof console !== 'undefined') console.warn('card: no token for "' + name + '" — hex not resolved');
        return;
      }
      el.textContent = hex(measure(host, v));
    });

    // Inline ratio readouts in prose/tables: <span data-ratio="brand-500 on bg"></span>
    var cells = document.querySelectorAll('[data-ratio]');
    Array.prototype.forEach.call(cells, function (el) {
      var pair = el.getAttribute('data-ratio').split(/\s+on\s+/);
      if (pair.length !== 2) return;
      var host = el.closest('.pane, .card') || document.body;
      // Resolve each side to a real colour EXPRESSION first. Several families
      // ship channels only (--lw-success-text-c, no --lw-success-text), and a
      // var() that does not resolve silently falls back to inherited ink — which
      // is how all four status rows once read the same 18.72 against white and
      // looked like measured data. A name that resolves to nothing renders "—"
      // and warns; it never renders a plausible number.
      var scope = getComputedStyle(host);
      var ink = expr(scope, pair[0]), ground = expr(scope, pair[1]);
      if (!ink || !ground) {
        el.textContent = '—';
        el.title = 'unresolved token: ' + (!ink ? '--lw-' + pair[0] : '--lw-' + pair[1]);
        if (typeof console !== 'undefined') console.warn('card: no token for "' + (!ink ? pair[0] : pair[1]) + '" — ratio not measured');
        return;
      }
      var probe = document.createElement('div');
      probe.style.cssText = 'position:absolute;visibility:hidden;color:' + ink + ';background:' + ground;
      host.appendChild(probe);
      var cs = getComputedStyle(probe);
      // Both sides need compositing, and each over a DIFFERENT ground: the tint
      // over whatever the probe sits on, the ink over the tint. Reading them with
      // parse() took the opaque channel of each, so every ratio published against
      // a `-soft` token was computed against the full-strength colour — the whole
      // soft-tint column of the status card, printed as measured data.
      var groundRgb = flatten(cs.backgroundColor, host);
      el.textContent = ratio(over(cs.color, groundRgb), groundRgb).toFixed(2);
      probe.remove();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hydrate);
  } else {
    hydrate();
  }
  /* A theme flip re-points the tokens, so every derived value must follow. ONE
     trigger: the observer below. Watching prefers-color-scheme separately was
     redundant — the IIFE at the top of this file already writes `data-theme` on
     that event, so the observer sees it, and listening to both queued two full
     hydrations per OS flip.

     A consumer flips the theme by setting `.dark` AND `data-theme`, which is two
     mutations; coalesce so that is one pass, not two. */
  var pending = false;
  new MutationObserver(function () {
    if (pending) return;
    pending = true;
    setTimeout(function () { pending = false; hydrate(); }, 0);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
})();
