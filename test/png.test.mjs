import { test } from "node:test";
import assert from "node:assert/strict";
import { deflateSync, crc32 as zlibCrc32 } from "node:zlib";
import { PNG_SIG, decodePng, crc32, chunk, encodePng, compareShots, TOL } from "../tools/_png.mjs";

// The fixture builder carries its OWN Paeth predictor. Importing the decoder's
// would test it against itself: a broken paeth then encodes and decodes
// consistently and the filter-4 case passes — which is exactly what happened on
// the first sabotage of this file.
const paethRef = (a, b, c) => {
  const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  return pb <= pc ? b : c;
};

test("encodePng → decodePng round-trips a 3×2 RGBA image", () => {
  const px = Buffer.from(Array.from({ length: 3 * 2 * 4 }, (_, i) => (i * 37) & 255));
  const out = decodePng(encodePng(3, 2, px));
  assert.equal(out.width, 3);
  assert.equal(out.height, 2);
  assert.deepEqual([...out.data], [...px]);
});

/** Build an RGBA PNG whose every scanline uses filter `ft`, from known pixels. */
function buildFiltered(width, height, rgba, ft) {
  const bpp = 4, stride = width * bpp;
  const raw = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = ft;
    for (let x = 0; x < stride; x++) {
      const cur = rgba[y * stride + x];
      const a = x >= bpp ? rgba[y * stride + x - bpp] : 0;
      const b = y > 0 ? rgba[(y - 1) * stride + x] : 0;
      const c = x >= bpp && y > 0 ? rgba[(y - 1) * stride + x - bpp] : 0;
      let pred;
      switch (ft) {
        case 0: pred = 0; break;
        case 1: pred = a; break;
        case 2: pred = b; break;
        case 3: pred = (a + b) >> 1; break;
        case 4: pred = paethRef(a, b, c); break;
      }
      raw[y * (stride + 1) + 1 + x] = (cur - pred) & 255;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([PNG_SIG, chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
}

const W = 4, H = 3;
const pixels = Buffer.from(Array.from({ length: W * H * 4 }, (_, i) => (i * 53 + 11) & 255));
for (const ft of [0, 1, 2, 3, 4]) {
  test(`decodePng unfilters scanline filter type ${ft}`, () => {
    const out = decodePng(buildFiltered(W, H, pixels, ft));
    assert.equal(out.width, W);
    assert.equal(out.height, H);
    assert.deepEqual([...out.data], [...pixels]);
  });
}

test("crc32 of a known IHDR matches the PNG spec (and zlib.crc32)", () => {
  // IHDR for a 1×1 8-bit RGBA image: the standard 4-byte type + 13 data bytes.
  const ihdr = Buffer.from([0x49, 0x48, 0x44, 0x52, 0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0]);
  // The value every PNG encoder writes for this chunk; hard-coded so this test
  // is not merely two implementations agreeing with each other.
  assert.equal(crc32(ihdr), 0x1f15c489);
  if (typeof zlibCrc32 === "function") assert.equal(crc32(ihdr), zlibCrc32(ihdr));
});

test("compareShots: identical buffers short-circuit as identical", () => {
  const png = encodePng(2, 2, Buffer.alloc(16, 200));
  const r = compareShots(png, Buffer.from(png));
  assert.equal(r.ok, true);
  assert.equal(r.identical, true);
  assert.equal(r.soft, 0);
});

test("compareShots: one pixel +50 on a channel fails the STRONG rule", () => {
  const n = 100 * 100;
  const base = Buffer.alloc(n * 4, 128);
  const cur = Buffer.from(base);
  cur[(50 * 100 + 50) * 4 + 1] += 50;
  const r = compareShots(encodePng(100, 100, base), encodePng(100, 100, cur));
  assert.equal(r.strong, 1);
  assert.equal(r.soft, 1);
  assert.ok(r.strongPct > TOL.strongRatio);
  assert.ok(r.softPct <= TOL.softRatio, "1/10000 is under the soft area rule — only the strong rule can catch this");
  assert.equal(r.ok, false);
});
