import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./_root.mjs";

const registry = JSON.parse(fs.readFileSync(path.join(ROOT, "registry.json"), "utf8"));
const blocks = registry.items.filter((i) => i.type === "registry:block").map((i) => i.name);

test("registry/blocks is the one source: the preview compiles it, no second copy", () => {
  assert.ok(blocks.length > 0);
  assert.ok(!fs.existsSync(path.join(ROOT, "preview/src/blocks")), "preview/src/blocks must not exist");
  const index = fs.readFileSync(path.join(ROOT, "preview/src/index.ts"), "utf8");
  const exported = [...index.matchAll(/"\.\.\/\.\.\/registry\/blocks\/([\w-]+)"/g)].map((m) => m[1]).sort();
  assert.deepEqual(exported, [...blocks].sort());
});

test("every stock ui a block imports is a registryDependency", () => {
  for (const item of registry.items.filter((i) => i.type === "registry:block")) {
    const src = fs.readFileSync(path.join(ROOT, item.files[0].path), "utf8");
    const used = [...src.matchAll(/"@\/components\/ui\/([\w-]+)"/g)].map((m) => m[1]);
    for (const u of used) assert.ok(item.registryDependencies.includes(u), `${item.name} imports ${u}`);
  }
});
