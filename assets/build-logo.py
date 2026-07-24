#!/usr/bin/env python3
"""Regenerates the LeanWise logo SVGs from measured geometry.

The mark is AUTHORED geometry, not an autotrace: a regular pointy-top hexagon
plus two stroked polylines and two node dots. Vertices were fitted by
coordinate descent against logo-4.png (the near-regular rendition), reaching
IoU 0.845 against the original raster.

The wordmark IS traced (wordmark-paths.txt) because it is type, not geometry.

Run from anywhere:  python3 assets/build-logo.py
Requires: numpy, opencv-python (for the fit only — this script just emits).
"""
import math, os
OUT='/srv/share/01_project-dev/leanwise-design/assets'

# --- mark geometry, normalised to a TRUE regular pointy-top hexagon ----------
# Source rendition measured 560x614 (ratio .912); the lockup rendition measures
# .869. A regular hexagon is .866 — so the square rendition is ~5% x-stretched.
# The vector rebuild normalises to regular and remaps the interior art with the
# same anisotropic correction, so mark and interior stay in register.
CX,CY,R = 56.0, 64.0, 60.0
K = math.sqrt(3)/2
HEX=[(CX,CY-R),(CX+R*K,CY-R/2),(CX+R*K,CY+R/2),(CX,CY+R),(CX-R*K,CY+R/2),(CX-R*K,CY-R/2)]
# The source mark measures 519px OUTER (stroke included); the hexagon PATH spans
# 519 - 26.5 = 492.5. Scaling by the outer height drew the ring ~5% oversize
# relative to the interior art.
S  = 120.0/(519.0-26.5)              # units per source px (lockup rendition)
def T(x,y): return ((x-225.0)*S+CX, (y-259.0)*S+CY)

# All geometry derived from logo-4.png's mark (451x519, ratio .8690 - the
# rendition already within a whisker of a regular hexagon). The square rendition
# is ~5% x-stretched and places the interior differently; mixing the two is what
# put the chart out of register on the first pass. Vertices were then fitted by
# coordinate descent against the original raster (IoU 0.850): a geodesic walk
# through a thick stroke cuts the inside of every corner, so the measured
# amplitude of the zigzag came out systematically shallow.
CHECK  = [(117,196),(189,276),(307,148)]
ZIGZAG = [(41,365),(117,289),(182,380),(226,314),(247,353),(368,192)]
DOT1, DOT2 = (307,148,27), (368,192,26)
SW_HEX, SW_ART, SW_LINK = 26.5*S, 32.0*S, 16.0*S

def pl(pts): return 'M'+' L'.join(f'{T(*p)[0]:.2f} {T(*p)[1]:.2f}' for p in pts)
hexpath='M'+' L'.join(f'{x:.2f} {y:.2f}' for x,y in HEX)+' Z'
d1=T(DOT1[0],DOT1[1]); d2=T(DOT2[0],DOT2[1])
r1=DOT1[2]*S; r2=DOT2[2]*S

def art(stroke, fill):
    return f'''  <g fill="none" stroke="{stroke}" stroke-linecap="round" stroke-linejoin="round">
    <path d="{hexpath}" stroke-width="{SW_HEX:.2f}"/>
    <path d="{pl(CHECK)}" stroke-width="{SW_ART:.2f}"/>
    <path d="{pl(ZIGZAG)}" stroke-width="{SW_ART:.2f}"/>
    <path d="M{d1[0]:.2f} {d1[1]:.2f} L{d2[0]:.2f} {d2[1]:.2f}" stroke-width="{SW_LINK:.2f}"/>
  </g>
  <circle cx="{d1[0]:.2f}" cy="{d1[1]:.2f}" r="{r1:.2f}" fill="{fill}"/>
  <circle cx="{d2[0]:.2f}" cy="{d2[1]:.2f}" r="{r2:.2f}" fill="{fill}"/>'''

GRAD = '''  <!-- Stops mirror the lw-navy-700 and lw-brand-500 tokens as literals ON
       PURPOSE: CSS custom properties do not cascade into an SVG loaded through
       an img element, so a var() here would silently always render its
       fallback. Recolouring is the job of logo-mark-mono.svg (currentColor),
       which is meant to be inlined. If the brand ramp moves, regenerate with
       assets/build-logo.py. -->
  <defs>
    <linearGradient id="lwBrand" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="#1A4D7E"/>
      <stop offset="1" stop-color="#1AB0D5"/>
    </linearGradient>
  </defs>'''

HEAD = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vb}" '
        'role="img" aria-label="{label}">')

mark = f'''{HEAD.format(vb="112 128", label="LeanWise AI")}
  <title>LeanWise AI</title>
{GRAD}
{art("url(#lwBrand)", "url(#lwBrand)")}
</svg>
'''
mono = f'''{HEAD.format(vb="112 128", label="LeanWise AI")}
  <title>LeanWise AI</title>
{art("currentColor", "currentColor")}
</svg>
'''
open(f'{OUT}/logo-mark.svg','w').write(mark)
open(f'{OUT}/logo-mark-mono.svg','w').write(mono)

# --- lockup ------------------------------------------------------------------
UPS = S            # units per source px of the lockup art
GAP = 59*UPS
WORD_W, WORD_H = 931*UPS, 108*UPS
X0 = CX + R*K + SW_HEX/2 + GAP
VB_W = math.ceil(X0 + WORD_W) + 2   # ceil + margin: %.0f truncation clipped the final I
Y0 = CY - WORD_H/2
paths=[p for p in open(os.path.join(os.path.dirname(__file__),'wordmark-paths.txt')).read().split('\n') if p.strip()]
wp='\n'.join(f'    <path d="{p}"/>' for p in paths)
lock = f'''{HEAD.format(vb=f"{VB_W:.0f} 128", label="LeanWise AI")}
  <title>LeanWise AI</title>
{GRAD}
{art("url(#lwBrand)", "url(#lwBrand)")}
  <g fill="url(#lwBrand)" fill-rule="evenodd" transform="translate({X0:.2f} {Y0:.2f}) scale({UPS:.5f})">
{wp}
  </g>
</svg>
'''
open(f'{OUT}/logo-lockup.svg','w').write(lock)
print('viewBox lockup: 0 0 %.0f 128   (mark 112 + gap %.1f + word %.1f)'%(VB_W,GAP,WORD_W))
print('wrote logo-mark.svg, logo-mark-mono.svg, logo-lockup.svg')
for f in ['logo-mark.svg','logo-mark-mono.svg','logo-lockup.svg']:
    print(f'  {f}: {os.path.getsize(OUT+"/"+f)//1024 or 1}KB')
