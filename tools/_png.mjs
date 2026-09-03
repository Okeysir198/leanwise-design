/**
 * The PNG codec and the shot comparator, as a MODULE.
 *
 * These lived inside lw-visual.mjs, which has no main guard: importing it
 * launches Chromium and runs the gate. That made the decoder, the encoder and
 * the two-rule comparator untestable without a browser, so the only proof they
 * worked was `--self-test` — which needs Playwright and a rendered card. Here
 * they can be exercised by `node --test` against hand-built PNGs, one per
 * filter type, with no browser at all. lw-visual.mjs imports them back; the
 * behaviour is byte-identical. The rationale for every threshold and for the
 * narrow decoder is kept with the code below, unchanged.
 */
import { deflateSync, inflateSync } from "node:zlib";

/* ------------------------------------------------------------------ PNG I/O */

export const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const CHANNELS = { 0: 1, 2: 3, 4: 2, 6: 4 }; // grey, rgb, grey+a, rgba. 3 (palette) unsupported.

export function paeth(a, b, c) {
  const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
}

/**
 * Decode a non-interlaced 8-bit PNG to {width, height, data:<RGBA>}.
 * Deliberately narrow: every input is a Playwright screenshot. An interlaced,
 * 16-bit or palette PNG throws with the offending header rather than being
 * half-handled — a decoder that silently produces the wrong pixels would make
 * this gate lie in the direction it has always lied in.
 */
export function decodePng(buf) {
  if (buf.length < 8 || !buf.subarray(0, 8).equals(PNG_SIG)) throw new Error("not a PNG");
  let off = 8, hdr = null;
  const idat = [];
  while (off + 8 <= buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString("latin1", off + 4, off + 8);
    const data = buf.subarray(off + 8, off + 8 + len);
    if (type === "IHDR") {
      hdr = {
        width: data.readUInt32BE(0), height: data.readUInt32BE(4),
        depth: data[8], color: data[9], comp: data[10], filter: data[11], interlace: data[12],
      };
    } else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    off += 12 + len;
  }
  if (!hdr) throw new Error("PNG has no IHDR");
  const ch = CHANNELS[hdr.color];
  if (hdr.depth !== 8 || hdr.interlace !== 0 || hdr.comp !== 0 || hdr.filter !== 0 || !ch) {
    throw new Error(
      "lw-visual: unsupported PNG (depth=" + hdr.depth + " colorType=" + hdr.color +
      " interlace=" + hdr.interlace + "). The decoder handles the 8-bit non-interlaced " +
      "forms Playwright emits; a screenshot in another form means the screenshot call changed."
    );
  }
  if (!idat.length) throw new Error("PNG has no IDAT");

  const { width: w, height: h } = hdr;
  const bpp = ch, stride = w * bpp;
  const raw = inflateSync(Buffer.concat(idat));
  if (raw.length < h * (stride + 1)) {
    throw new Error("PNG truncated: " + raw.length + " inflated bytes, expected " + h * (stride + 1));
  }

  const out = Buffer.allocUnsafe(h * stride);
  let prev = Buffer.alloc(stride);
  for (let y = 0; y < h; y++) {
    const ft = raw[y * (stride + 1)];
    const src = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const cur = out.subarray(y * stride, (y + 1) * stride);
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? cur[x - bpp] : 0;
      const b = prev[x];
      const c = x >= bpp ? prev[x - bpp] : 0;
      let v;
      switch (ft) {
        case 0: v = src[x]; break;
        case 1: v = src[x] + a; break;
        case 2: v = src[x] + b; break;
        case 3: v = src[x] + ((a + b) >> 1); break;
        case 4: v = src[x] + paeth(a, b, c); break;
        default: throw new Error("PNG scanline " + y + " uses filter type " + ft);
      }
      cur[x] = v & 255;
    }
    prev = cur;
  }

  if (hdr.color === 6) return { width: w, height: h, data: out };
  const rgba = Buffer.allocUnsafe(w * h * 4);
  for (let i = 0, o = 0; i < w * h; i++, o += 4) {
    if (hdr.color === 2) { rgba[o] = out[i * 3]; rgba[o + 1] = out[i * 3 + 1]; rgba[o + 2] = out[i * 3 + 2]; rgba[o + 3] = 255; }
    else if (hdr.color === 0) { rgba[o] = rgba[o + 1] = rgba[o + 2] = out[i]; rgba[o + 3] = 255; }
    else { rgba[o] = rgba[o + 1] = rgba[o + 2] = out[i * 2]; rgba[o + 3] = out[i * 2 + 1]; }
  }
  return { width: w, height: h, data: rgba };
}

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();
export function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}
export function chunk(type, data) {
  const head = Buffer.allocUnsafe(8);
  head.writeUInt32BE(data.length, 0);
  head.write(type, 4, "latin1");
  const crc = Buffer.allocUnsafe(4);
  crc.writeUInt32BE(crc32(Buffer.concat([head.subarray(4), data])), 0);
  return Buffer.concat([head, data, crc]);
}
/** Encode RGBA to an 8-bit non-interlaced PNG. Only used for the diff images. */
export function encodePng(width, height, rgba) {
  const stride = width * 4;
  const raw = Buffer.allocUnsafe(height * (stride + 1));
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // filter: none. These are throwaway artifacts.
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([PNG_SIG, chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw, { level: 6 })), chunk("IEND", Buffer.alloc(0))]);
}

/* -------------------------------------------------------------- comparison */

/**
 * Two rules, because either alone has a blind spot the other covers, and both
 * far tighter than a cross-machine comparator could afford.
 *
 * WHAT THE NOISE FLOOR ACTUALLY IS. Measured, not assumed: over six full
 * compare runs against a fixed baseline (816 shots, separate browser launches
 * each time), 815 shots came back BYTE-identical and one — Chart.card on light
 * — moved 0.0002% of its pixels once, about two pixels on an antialiased curve.
 * Chromium's raster is effectively bit-deterministic on one machine, and CI
 * shoots both sides on ONE runner with one browser and one font set. So these
 * numbers are insurance against that rare two-pixel jitter, not headroom for a
 * known drift: the soft rule sits ~100× above the largest wobble ever observed,
 * and is still 5× tighter than the ~0.1% a cross-machine comparator needs.
 *
 * `soft` — channel delta > 8, fail above 0.02% of pixels. The area rule: a
 * repaint, a reflow, a shifted glyph run. 8/255 ≈ 3% is roughly the floor of a
 * visible flat-colour change, so anything under it is not a regression a person
 * could see anyway. 0.02% is ~460 px on a typical 1280×1800 card.
 *
 * `strong` — channel delta > 48, fail above 0.002% of pixels. Covers what an
 * area rule cannot: something small that changed a LOT. A 1px hairline
 * recoloured from grey to brand teal along 1200px of one card measures 0.038%
 * of that shot — a 0.1% area rule never sees it, and it is exactly the token
 * regression this repo ships. 48/255 ≈ 19% of the range is "a different
 * colour", not "a shade"; a 12-point lightness nudge (Δ≈31) stays under it on
 * purpose, because that kind of change is always broad and the area rule owns it.
 *
 * KNOWN BLIND SPOT, stated rather than tuned away: a small-area, moderate-delta
 * change on a single card — one control's border nudged two steps — sits under
 * both rules. Neither number can be lowered to catch it without inventing a
 * noise budget nobody has measured. If CI ever flakes, RAISE these with the
 * observed diff percentage quoted in the commit message; never round up "to be
 * safe", which is how a gate stops being one.
 *
 * Both rules are per-shot and never averaged across the run: 136 shots averaged
 * would hide a single card breaking completely.
 */
export const TOL = { softDelta: 8, strongDelta: 48, softRatio: 0.0002, strongRatio: 0.00002 };

export function compareShots(baseBuf, curBuf) {
  // Fast path. Baseline and candidate are recorded on the same machine by
  // design, so most shots ARE byte-identical; skipping the inflate of two
  // multi-megabyte images for those is most of the gate's wall clock.
  if (baseBuf.length === curBuf.length && baseBuf.equals(curBuf)) {
    return { ok: true, identical: true, soft: 0, strong: 0, softPct: 0, strongPct: 0 };
  }
  const a = decodePng(baseBuf), b = decodePng(curBuf);
  if (a.width !== b.width || a.height !== b.height) {
    return {
      ok: false, resized: a.width + "×" + a.height + " → " + b.width + "×" + b.height,
      soft: 0, strong: 0, softPct: 1, strongPct: 1,
    };
  }
  const n = a.width * a.height;
  const mask = Buffer.alloc(n); // 0 same, 1 soft, 2 strong
  let soft = 0, strong = 0;
  for (let i = 0, o = 0; i < n; i++, o += 4) {
    let m = Math.abs(a.data[o] - b.data[o]);
    const dg = Math.abs(a.data[o + 1] - b.data[o + 1]); if (dg > m) m = dg;
    const db = Math.abs(a.data[o + 2] - b.data[o + 2]); if (db > m) m = db;
    const da = Math.abs(a.data[o + 3] - b.data[o + 3]); if (da > m) m = da;
    if (m > TOL.strongDelta) { mask[i] = 2; strong++; soft++; }
    else if (m > TOL.softDelta) { mask[i] = 1; soft++; }
  }
  const softPct = soft / n, strongPct = strong / n;
  return {
    ok: softPct <= TOL.softRatio && strongPct <= TOL.strongRatio,
    soft, strong, softPct, strongPct, width: a.width, height: a.height, mask, base: a,
  };
}

