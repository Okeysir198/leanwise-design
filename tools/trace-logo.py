"""Trace the LeanWise mark + wordmark out of the source raster.

Kept OUT of assets/build-logo.py on purpose: this needs vtracer (a Rust ext) and
runs once per art change, whereas build-logo.py runs on every token change and
must work with nothing but the stdlib. The traced geometry is committed as
assets/logo-paths.json; build-logo.py composes the SVGs from that + tokens.css.
"""
from PIL import Image
import numpy as np, vtracer, re, io, cairosvg

SRC = ("/srv/share/01_project-dev/leanwise-ai/feedbacks/LeanWise AI Website/"
       "Pictures/logo-4.png")

def source_masks():
    a = np.asarray(Image.open(SRC).convert("RGB")).astype(float)
    cov = (255 - a.min(axis=2)) / 255.0
    ink = cov > 0.25
    ys, xs = np.nonzero(ink)
    cols = ink.sum(axis=0)
    gap = None
    for x in range(xs.min(), xs.max()):
        if cols[x] == 0:
            r = x
            while r < xs.max() and cols[r] == 0:
                r += 1
            if r - x > 40:
                gap = (x, r); break
    y0, y1 = ys.min(), ys.max()
    return (cov[y0:y1+1, xs.min():gap[0]+1],
            cov[y0:y1+1, gap[1]:xs.max()+1],
            round((gap[1]-gap[0]) * 1000 / (y1-y0+1), 1))

def _parse(svg):
    out = []
    for m in re.finditer(r'<path\b[^>]*/>', svg):
        tag = m.group(0)
        d = re.search(r'\sd="([^"]+)"', tag).group(1)
        tr = re.search(r'translate\(([-\d.]+),\s*([-\d.]+)\)', tag)
        out.append((d, float(tr.group(1)) if tr else 0.0,
                       float(tr.group(2)) if tr else 0.0))
    return out

def _rescale(d, tx, ty, k, prec):
    """vtracer emits absolute M/C/Z with a per-path translate. Bake the translate
    into the coordinates and scale into the target viewBox. Dropping the
    transform is the bug that silently stacked every subpath at the origin."""
    toks = re.findall(r'[A-Za-z]|-?\d+\.?\d*', d)
    out, cmd, co = [], None, []
    def fmt(v):
        t = f"{v:.{prec}f}"
        if '.' in t: t = t.rstrip('0').rstrip('.')
        return t if t not in ('', '-', '-0') else '0'
    def flush():
        if cmd and co:
            out.append(cmd + " ".join(
                fmt(((v + tx) if i % 2 == 0 else (v + ty)) * k)
                for i, v in enumerate(co)))
    for t in toks:
        if t.isalpha():
            flush(); co = []
            if t in 'Zz': out.append(t); cmd = None
            else: cmd = t
        else:
            co.append(float(t))
    flush()
    return "".join(out)

def trace(sub, boxh=1000, prec=0, scale=4, **kw):
    p = dict(filter_speckle=6, length_threshold=3.5, corner_threshold=55,
             splice_threshold=45, path_precision=2)
    p.update(kw)
    g = Image.fromarray((np.clip(sub, 0, 1) * 255).astype(np.uint8), "L")
    g = g.resize((g.width*scale, g.height*scale), Image.LANCZOS)
    b = (np.asarray(g).astype(float) / 255.0) > 0.45
    pad = np.zeros((b.shape[0]+2, b.shape[1]+2), bool); pad[1:-1, 1:-1] = b
    Image.fromarray(np.where(pad[..., None], 0, 255).repeat(3, axis=2).astype(np.uint8)).save("t.png")
    vtracer.convert_image_to_svg_py("t.png", "t.svg", colormode="binary", mode="spline", **p)
    s = open("t.svg").read()
    W = int(re.search(r'width="(\d+)"', s).group(1))
    H = int(re.search(r'height="(\d+)"', s).group(1))
    k = boxh / H
    paths = [_rescale(d, tx, ty, k, prec) for d, tx, ty in _parse(s)]
    return {"viewBox": [round(W*k, 1), boxh], "paths": paths}

def iou(t, ref_cov):
    ref = ref_cov > 0.45; H, W = ref.shape
    vb = t["viewBox"]
    doc = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" '
           f'viewBox="0 0 {vb[0]} {vb[1]}">'
           + "".join(f'<path d="{p}"/>' for p in t["paths"]) + '</svg>')
    png = cairosvg.svg2png(bytestring=doc.encode(), background_color="white")
    r = np.asarray(Image.open(io.BytesIO(png)).convert("L")) < 128
    return float((r & ref).sum() / (r | ref).sum())
