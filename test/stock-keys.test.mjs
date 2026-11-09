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

/* The coarse-pointer target floor is the one rule a desk check cannot see: it applies only
   under `(pointer: coarse)`. Pin that theme.css carries it for the controls a thumb hits. */
test("theme.css gives every stock control a 44px target on a coarse pointer", () => {
  const css = fs.readFileSync(path.join(ROOT, "theme.css"), "utf8");
  const blocks = [...css.matchAll(/@media \(pointer: coarse\) \{([\s\S]*?)\n\}/g)].map((m) => m[1]);
  const floor = blocks.find((b) => b.includes("min-height: 2.75rem"));
  assert.ok(floor, "no coarse-pointer min-height block in theme.css");
  for (const slot of ["button", "input", "select-trigger", "tabs-trigger", "dropdown-menu-item", "item"])
    assert.ok(floor.includes(`[data-slot="${slot}"]`), `the coarse floor misses ${slot}`);
  // A Button inside a menu trigger loses `data-slot="button"` to the trigger's own slot.
  assert.ok(floor.includes('button[data-slot$="-trigger"][data-size]'), "a Button used as a trigger misses the floor");
  // Width too, on every Button: a size="sm" one whose label is sr-only on phones is 36px wide.
  const width = blocks.find((b) => b.includes("min-width: 2.75rem"));
  assert.ok(width, "no coarse-pointer min-width block in theme.css");
  const widthSel = width.split("{")[0].split(",").map((x) => x.trim());
  for (const sel of ['[data-slot="button"]', 'button[data-slot$="-trigger"][data-size]'])
    assert.ok(widthSel.includes(sel), `${sel} is not 44px wide on touch`);
  assert.ok(blocks.some((b) => b.includes('[data-slot="checkbox"]::after') && b.includes("inset: -0.875rem")), "checkbox hit area is not 44px on touch");
});
