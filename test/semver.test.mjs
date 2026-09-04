import { test } from "node:test";
import assert from "node:assert/strict";
import { cmp, satisfies } from "../tools/_semver.mjs";

test("cmp orders by numeric part, not string", () => {
  assert.ok(cmp("1.13.0", "1.4.0") > 0);
  assert.ok(cmp("2.2.0", "1.13.0") > 0);
  assert.equal(cmp("v1.2.0", "1.2.0"), 0);
});

test("a one-sided range", () => {
  assert.equal(satisfies("1.2.0", "<1.3.1"), true);
  assert.equal(satisfies("1.3.1", "<1.3.1"), false);
});

test("a two-sided range holds only inside both bounds — the v2.2.1 bug", () => {
  const r = ">=1.4.0 <1.13.0";
  assert.equal(satisfies("1.4.0", r), true);
  assert.equal(satisfies("1.7.1", r), true);
  assert.equal(satisfies("1.13.0", r), false);
  assert.equal(satisfies("1.3.9", r), false);
  // The first 2.x consumer was told this advisory still applied to it.
  assert.equal(satisfies("2.2.0", r), false);
});

test("an exact range is equality", () => {
  assert.equal(satisfies("0.2.2", "0.2.2"), true);
  assert.equal(satisfies("0.2.3", "0.2.2"), false);
});
