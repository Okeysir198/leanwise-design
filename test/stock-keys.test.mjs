import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./_root.mjs";
import { STOCK_OVERRIDES } from "../scripts/lib/theme.mjs";

/* An override keyed on a stock class matches NOTHING once shadcn renames that class, and
   nothing else notices: the page just drifts back to the stock look. */
test("every STOCK_OVERRIDES key still exists in the stock component source", () => {
  const missing = [];
  for (const r of STOCK_OVERRIDES)
    for (const [file, cls] of r.keys) {
      const src = fs.readFileSync(path.join(ROOT, "preview/src/ui", `${file}.tsx`), "utf8");
      if (!src.includes(cls)) missing.push(`${file}.tsx lacks ${cls} (for ${r.sel[0]})`);
    }
  assert.deepEqual(missing, []);
});
