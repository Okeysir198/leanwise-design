/** lw-subset — the subset generator for consumers that cannot import. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const TOOL = new URL("../tools/lw-subset.mjs", import.meta.url).pathname;
const TOKENS = readFileSync(new URL("../tokens.css", import.meta.url), "utf8");
const dir = mkdtempSync(join(tmpdir(), "lw-subset-"));

function run(manifest, extra = []) {
  const p = join(dir, `${createHash("sha256").update(JSON.stringify(manifest)).digest("hex").slice(0, 8)}.json`);
  writeFileSync(p, JSON.stringify(manifest));
  return execFileSync(process.execPath, [TOOL, `--manifest=${p}`, ...extra], { encoding: "utf8" });
}

/** Every `--lw-*` name tokens.css declares, parsed the way the tool must: by
 *  declaration, not by line. */
const ALL = [...new Set([...TOKENS.matchAll(/(--lw-[A-Za-z0-9_-]+)\s*:/g)].map((m) => m[1]))];

test("the digest is byte-identical to lw-inline's, so one parser reads both", () => {
  const inline = execFileSync(process.execPath, [new URL("../tools/lw-inline.mjs", import.meta.url).pathname], { encoding: "utf8" });
  const want = inline.match(/tokens\.css sha256:([0-9a-f]{12})/)[1];
  const got = run({ seeds: ["--lw-brand-500"] }).match(/tokens\.css sha256:([0-9a-f]{12})/)[1];
  assert.equal(got, want);
  assert.equal(got, createHash("sha256").update(TOKENS).digest("hex").slice(0, 12));
});

test("seeding every token reproduces every declaration — the round trip", () => {
  const out = run({ seeds: ALL });
  const emitted = new Set([...out.matchAll(/(--lw-[A-Za-z0-9_-]+)\s*:/g)].map((m) => m[1]));
  const missing = ALL.filter((n) => !emitted.has(n));
  assert.deepEqual(missing, [], `subset dropped ${missing.length} token(s) the source declares`);
});

test("declarations packed on ONE line are parsed separately", () => {
  // tokens.css writes `--lw-space-4: 4px;  --lw-space-8: 8px;  --lw-space-12: 12px;`
  // on a single line. A line-based extractor takes the first and silently drops the
  // rest, or emits all three when only one was asked for.
  const out = run({ seeds: ["--lw-space-8"] });
  assert.match(out, /--lw-space-8:\s*8px;/);
  assert.doesNotMatch(out, /--lw-space-4:/);
  assert.doesNotMatch(out, /--lw-space-12:/);
});

test("the var() closure is transitive, so a derived colour brings its channel triple", () => {
  const out = run({ seeds: ["--lw-brand-500"] });
  assert.match(out, /--lw-brand-500-c:/, "the -c triple must come along or the hsl() resolves to nothing");
  assert.match(out, /--lw-brand-500:\s*hsl\(var\(--lw-brand-500-c\)\)/);
});

test("a retained token keeps its OWN trailing comment", () => {
  // lw-inline rejects comment-STRIPPING; that rejection is honoured for every token
  // the consumer actually ships.
  const out = run({ seeds: ["--lw-brand-500"] });
  assert.match(out, /--lw-brand-500-c:[^\n]*\/\*/);
});

test("a seed that does not exist fails loudly instead of emitting nothing", () => {
  // A silently-absent token resolves to nothing at runtime: a padding collapses and
  // every other check still passes.
  assert.throws(() => run({ seeds: ["--lw-not-a-real-token"] }), /do not exist/);
});

test("the selection digest changes when the seed set changes, and not otherwise", () => {
  const a = run({ seeds: ["--lw-brand-500", "--lw-space-8"] });
  const b = run({ seeds: ["--lw-space-8", "--lw-brand-500"] });   // order must not matter
  const c = run({ seeds: ["--lw-brand-500"] });
  const sel = (s) => s.match(/selection sha256:([0-9a-f]{12})/)[1];
  assert.equal(sel(a), sel(b), "seed order is not a design change");
  assert.notEqual(sel(a), sel(c), "a different seed set must be distinguishable from a stale artifact");
});

test("--format=ts produces a literal that PARSES and carries the whole subset", async () => {
  // tokens.css contains 320 backticks. An unescaped one ends the template literal
  // early, and the result is a half-stylesheet that still compiles — which is the
  // failure mode a string assertion cannot see. So evaluate it.
  const out = run({ seeds: ["--lw-brand-500", "--lw-space-8"] }, ["--format=ts"]);
  const mod = await import(`data:text/javascript,${encodeURIComponent(out)}`);
  assert.equal(typeof mod.LW_TOKENS, "string");
  assert.match(mod.LW_TOKENS, /--lw-brand-500-c:/);
  assert.match(mod.LW_TOKENS, /--lw-space-8:\s*8px;/);
  assert.match(mod.LW_TOKENS, /tokens\.css sha256:[0-9a-f]{12}/, "the provenance must survive into the artifact");
});
