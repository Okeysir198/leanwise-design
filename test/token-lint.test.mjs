import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ROOT } from "./_root.mjs";

/** Lint one throwaway page.tsx and return { code, out }. */
function lint(source) {
  const dir = mkdtempSync(join(tmpdir(), "lw-token-lint-"));
  writeFileSync(join(dir, "page.tsx"), source);
  const r = spawnSync(process.execPath, [join(ROOT, "tools/lw-token-lint.mjs"), dir], { encoding: "utf8" });
  return { code: r.status, out: r.stdout + r.stderr };
}

const HERO = `<Button variant="cta">Start a free trial</Button>`;

test("one amber per file passes", () => {
  assert.equal(lint(HERO).code, 0);
});

test("a second amber fails as multiple-cta", () => {
  const r = lint(`${HERO}\n<Button variant="cta">Start a free trial</Button>`);
  assert.notEqual(r.code, 0);
  assert.match(r.out, /\[multiple-cta\]  2 × variant="cta"/);
});

test("a repeat marked on the line above or its own line is exempt", () => {
  const above = `${HERO}\n{/* lw-token-lint-allow multiple-cta: the closing band, never on screen with the hero */}\n<Button variant="cta">Start a free trial</Button>`;
  assert.equal(lint(above).code, 0);
  const same = `${HERO}\n<Button variant="cta">Start a free trial</Button> {/* lw-token-lint-allow multiple-cta */}`;
  assert.equal(lint(same).code, 0);
});

test("the bare arbitrary-token escape does not reach multiple-cta", () => {
  const r = lint(`${HERO}\n{/* lw-token-lint-allow */}\n<Button variant="cta">Start a free trial</Button>`);
  assert.notEqual(r.code, 0);
  assert.match(r.out, /\[multiple-cta\]/);
});

test("an exempt repeat does not excuse a third, unmarked amber", () => {
  const r = lint(
    `${HERO}\n{/* lw-token-lint-allow multiple-cta */}\n<Button variant="cta">a</Button>\n<p />\n<Button variant="cta">b</Button>`,
  );
  assert.notEqual(r.code, 0);
  assert.match(r.out, /\[multiple-cta\]  2 × variant="cta"/);
});
