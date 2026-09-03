/** Wiring: every gate is reachable from an npm script, and CI runs the scripts. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { read } from "./_root.mjs";

const scripts = JSON.parse(read("package.json")).scripts;
const allScripts = Object.values(scripts).join("\n");
const ci = read(".github/workflows/ci.yml");

test("every tools/lw-*.mjs is named by some npm script", () => {
  const tools = readdirSync(new URL("../tools", import.meta.url)).filter((f) => /^lw-.*\.mjs$/.test(f));
  assert.ok(tools.length > 10, "found " + tools.length + " tools");
  const orphans = tools.filter((t) => !allScripts.includes("tools/" + t));
  assert.deepEqual(orphans, [], "tools no script names — a gate nobody runs is not a gate");
});

test("ci.yml runs the one list, the pack check, and both browser gates", () => {
  for (const needle of ["npm run check", "npm run check:pack", "npm run check:a11y", "lw-visual.mjs"]) {
    assert.ok(ci.includes(needle), `ci.yml lacks ${needle}`);
  }
  // The hand-listed fast steps are gone; CI must not carry a second copy of the list.
  assert.doesNotMatch(ci, /npm run check:(contrast|tokens|themes|dts|bundle|templates)\b/);
});

test("scripts.check starts with the unit tests", () => {
  assert.ok(scripts.check.startsWith("npm test &&"), scripts.check);
  assert.equal(scripts.test, "node --test test/*.test.mjs"); // the directory form breaks on Node 24
  assert.equal(scripts.inline, "node tools/lw-inline.mjs");
});
