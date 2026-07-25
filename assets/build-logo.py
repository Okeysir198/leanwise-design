#!/usr/bin/env python3
"""Regenerates the LeanWise logo SVGs. Never hand-edit the SVGs — edit this.

    python3 assets/build-logo.py

Geometry and colour are deliberately separated:

  * GEOMETRY lives in logo-paths.json — an autotrace of logo-4.png, the rendition
    Truong pointed at. Through v0.7.x the mark was AUTHORED (a regular hexagon
    plus fitted polylines) and topped out around IoU 0.845; the trace reaches
    0.9944 for the mark and 0.9854 for the wordmark, the residual being
    anti-aliasing rather than shape. It is committed so this script needs nothing
    but the stdlib. Re-run tools/trace-logo.py (which needs vtracer) only when the
    ART changes — a colour change is just this script.

  * COLOUR is resolved from tokens.css at build time. The emitted SVG must carry
    LITERAL stops, because CSS custom properties do not cascade into an SVG loaded
    through <img> — a var() there silently renders its fallback forever. That
    makes the SVG a second home for a brand value, so bin/lw-contrast-check.mjs
    fails if the two ever disagree. lw-token-lint cannot see inside .svg, so that
    gate is the only thing guarding it.

The lockup gives the mark and the wordmark their own gradients rather than one
spanning both: in the source, the wordmark restarts at navy on the "L" instead of
continuing the mark's sweep.
"""
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
TOKENS = os.path.join(HERE, os.pardir, 'tokens.css')
PATHS = os.path.join(HERE, 'logo-paths.json')


def token_hex(name):
    """Resolve an --lw-*-c HSL triple from tokens.css to a hex literal.

    Only :root is scanned — the logo is theme-independent, and the dark blocks
    re-point these same names.
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


ART = json.load(open(PATHS))
NAVY = token_hex('navy-700')
# The MARK's cyan, not brand-500 — see --lw-logo-cyan-c in tokens.css for why
# the UI fill is deliberately darker than the artwork.
CYAN = token_hex('logo-cyan')

# The mark's sweep runs from the lower-left vertex to the upper-right one, which
# is what x1/y1 -> x2/y2 describe in objectBoundingBox units.
GRAD = ('<linearGradient id="{id}" x1="0" y1="1" x2="1" y2="0">'
        f'<stop offset="0" stop-color="{NAVY}"/>'
        f'<stop offset="1" stop-color="{CYAN}"/>'
        '</linearGradient>')


def _paths(part, fill, dx=0.0):
    shift = f' transform="translate({dx:g},0)"' if dx else ''
    return "".join(f'<path{shift} d="{d}" fill="{fill}"/>' for d in ART[part]['paths'])


def svg(view_w, view_h, body, defs=''):
    # width/height as well as viewBox. A viewBox-only SVG has an intrinsic RATIO
    # but no intrinsic SIZE, and `mask-size: contain` has nothing to resolve
    # against — the dark-ground masked mark renders as nothing at all.
    return ('<svg xmlns="http://www.w3.org/2000/svg" '
            f'width="{view_w:g}" height="{view_h:g}" '
            f'viewBox="0 0 {view_w:g} {view_h:g}" role="img" '
            'aria-label="LeanWise AI">'
            + (f'<defs>{defs}</defs>' if defs else '') + body + '</svg>\n')


def build():
    mw, mh = ART['mark']['viewBox']
    ww = ART['wordmark']['viewBox'][0]
    gap = ART['gap']
    out = {}

    out['logo-mark.svg'] = svg(mw, mh, _paths('mark', 'url(#g)'), GRAD.format(id='g'))

    # currentColor, for dark grounds. Must be INLINED or used as a CSS mask —
    # through <img>, currentColor resolves against the SVG's own root and paints
    # black. See leanwise-ai/src/styles/chrome.css (.lw-logo .mark).
    out['logo-mark-mono.svg'] = svg(mw, mh, _paths('mark', 'currentColor'))

    out['logo-lockup.svg'] = svg(
        mw + gap + ww, mh,
        _paths('mark', 'url(#gm)') + _paths('wordmark', 'url(#gw)', dx=mw + gap),
        GRAD.format(id='gm') + GRAD.format(id='gw'))

    for name, text in out.items():
        p = os.path.join(HERE, name)
        open(p, 'w').write(text)
        print(f'{name:22} {len(text):7,d} B')
    print(f'\ngradient  {NAVY} -> {CYAN}   (from tokens.css)')
    print(f'fidelity  mark IoU {ART["iou"]["mark"]}, wordmark IoU {ART["iou"]["wordmark"]}')


if __name__ == '__main__':
    build()
