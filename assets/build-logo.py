#!/usr/bin/env python3
"""Regenerates the LeanWise logo SVGs. Never hand-edit the SVGs — edit this.

The mark is AUTHORED geometry, not an autotrace: a regular pointy-top hexagon
plus two stroked polylines and two node dots. Two things about the numbers below
that will bite if you re-derive them:

  * The source renditions disagree. logo-4.png's mark is 451x519 (ratio .8690,
    a whisker off a true regular hexagon's .8660); the square rendition is ~5%
    x-stretched at .912 AND places the interior art differently. Everything here
    comes from the lockup rendition — mixing the two is what put the chart out
    of register on the first pass.
  * The source states the mark's outer height INCLUDING stroke, so the hexagon
    PATH spans 519 - 26.5. Scaling by the outer height draws the ring oversize.
  * Vertices were fitted by coordinate descent against the original raster
    (IoU 0.845): measuring a thick stroke's centreline by a geodesic walk cuts
    the inside of every corner, so a naive measurement makes the zigzag too
    shallow. The values below are the corrected ones.

The wordmark IS traced (wordmark-paths.txt) — it is type, not geometry.

    python3 assets/build-logo.py
"""
import math
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
TOKENS = os.path.join(HERE, os.pardir, 'tokens.css')


def token_hex(name):
    """Resolve an --lw-*-c HSL triple from tokens.css to a hex literal.

    The emitted SVG must carry literal stops (see GRAD), but this generator must
    NOT: hardcoding them here would make "regenerate when the ramp moves" a lie,
    and v0.7.0 moved the brand hue 19 degrees. Only :root is scanned — the logo
    is theme-independent, and the dark blocks re-point these same names.
    """
    root = re.split(r'^\s*[.\[@:][^\n{]*\{', open(TOKENS).read(), flags=re.M)[1]
    m = re.search(rf'--lw-{name}-c:\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%', root)
    if not m:
        raise SystemExit(f'build-logo: --lw-{name}-c not found in tokens.css')
    h, s, l = (float(g) for g in m.groups())
    r, g, b = _hsl_to_rgb(h, s / 100, l / 100)
    return '#%02X%02X%02X' % (round(r * 255), round(g * 255), round(b * 255))


def _hsl_to_rgb(h, s, l):
    c = (1 - abs(2 * l - 1)) * s
    x = c * (1 - abs((h / 60) % 2 - 1))
    m = l - c / 2
    rgb = [(c, x, 0), (x, c, 0), (0, c, x), (0, x, c), (x, 0, c), (c, 0, x)][int(h // 60) % 6]
    return [v + m for v in rgb]


# --- geometry, in source pixels of logo-4.png's 451x519 mark -----------------
CX, CY, R = 56.0, 64.0, 60.0                 # target: regular hexagon, 120 tall
K = math.sqrt(3) / 2
HEX = [(CX, CY - R), (CX + R * K, CY - R / 2), (CX + R * K, CY + R / 2),
       (CX, CY + R), (CX - R * K, CY + R / 2), (CX - R * K, CY - R / 2)]
S = 120.0 / (519.0 - 26.5)                   # units per source px

CHECK = [(117, 196), (189, 276), (307, 148)]
ZIGZAG = [(41, 365), (117, 289), (182, 380), (226, 314), (247, 353), (368, 192)]
R_DOT1, R_DOT2 = 27, 26                      # the dots terminate the two polylines
SW_HEX, SW_ART, SW_LINK = 26.5 * S, 32.0 * S, 16.0 * S


def T(x, y):
    return ((x - 225.0) * S + CX, (y - 259.0) * S + CY)


def pl(pts):
    return 'M' + ' L'.join(f'{T(*p)[0]:.2f} {T(*p)[1]:.2f}' for p in pts)


HEXPATH = 'M' + ' L'.join(f'{x:.2f} {y:.2f}' for x, y in HEX) + ' Z'
D1, D2 = T(*CHECK[-1]), T(*ZIGZAG[-1])


def art(paint):
    """The mark. One paint for strokes and dots — they are never coloured apart."""
    return f'''  <g fill="none" stroke="{paint}" stroke-linecap="round" stroke-linejoin="round">
    <path d="{HEXPATH}" stroke-width="{SW_HEX:.2f}"/>
    <path d="{pl(CHECK)}" stroke-width="{SW_ART:.2f}"/>
    <path d="{pl(ZIGZAG)}" stroke-width="{SW_ART:.2f}"/>
    <path d="M{D1[0]:.2f} {D1[1]:.2f} L{D2[0]:.2f} {D2[1]:.2f}" stroke-width="{SW_LINK:.2f}"/>
  </g>
  <circle cx="{D1[0]:.2f}" cy="{D1[1]:.2f}" r="{R_DOT1 * S:.2f}" fill="{paint}"/>
  <circle cx="{D2[0]:.2f}" cy="{D2[1]:.2f}" r="{R_DOT2 * S:.2f}" fill="{paint}"/>'''


GRAD = f'''  <!-- Stops are LITERALS on purpose: CSS custom properties do not cascade into
       an SVG loaded through an img element, so a var() here would silently
       always render its fallback. They are generated from tokens.css by
       assets/build-logo.py and checked by bin/lw-contrast-check.mjs, so they
       cannot drift. Recolouring is logo-mark-mono.svg's job (currentColor),
       which must be inlined or used as a mask. -->
  <defs>
    <linearGradient id="lwBrand" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="{token_hex('navy-700')}"/>
      <stop offset="1" stop-color="{token_hex('brand-500')}"/>
    </linearGradient>
  </defs>'''


def svg(vb_w, body):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vb_w} 128" '
            f'role="img" aria-label="LeanWise AI">\n'
            f'  <title>LeanWise AI</title>\n{body}\n</svg>\n')


# --- lockup: mark + traced wordmark ------------------------------------------
GAP = 59 * S
WORD_W, WORD_H = 931 * S, 108 * S
X0 = CX + R * K + SW_HEX / 2 + GAP
VB_W = math.ceil(X0 + WORD_W) + 2        # +2 so the final I is not clipped
Y0 = CY - WORD_H / 2

# Integer coordinates: the wordmark is drawn at scale(S) inside a 128-unit box
# rendered at 36px, so one wordmark unit is ~0.07 CSS px — two decimals encoded
# detail three orders of magnitude below a device pixel, for ~40% of the file.
with open(os.path.join(HERE, 'wordmark-paths.txt')) as fh:
    paths = [re.sub(r'(\d+)\.\d+', r'\1', p) for p in fh.read().split('\n') if p.strip()]
WORDMARK = (f'  <g fill="url(#lwBrand)" fill-rule="evenodd" '
            f'transform="translate({X0:.2f} {Y0:.2f}) scale({S:.5f})">\n'
            + '\n'.join(f'    <path d="{p}"/>' for p in paths) + '\n  </g>')

for name, body, vb in (
    ('logo-mark.svg', f'{GRAD}\n{art("url(#lwBrand)")}', 112),
    ('logo-mark-mono.svg', art('currentColor'), 112),
    ('logo-lockup.svg', f'{GRAD}\n{art("url(#lwBrand)")}\n{WORDMARK}', VB_W),
):
    path = os.path.join(HERE, name)
    with open(path, 'w') as fh:
        fh.write(svg(vb, body))
    print(f'  {name}: {os.path.getsize(path)} bytes')
