import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./_root.mjs";
import { FOCUS_CONTROLS, FOCUS_FIELDS } from "../scripts/lib/theme.mjs";

const css = fs.readFileSync(path.join(ROOT, "theme.css"), "utf8");
const slots = (sel) => [...sel.matchAll(/\[data-slot\$?="([\w-]+)"\]/g)].map((m) => m[1]);
/* Items and content surfaces mark focus with a background (or nothing); a ring there is the bug. */
const SURFACE = /(-content|^command.*|-list|-viewport|^(dropdown-menu|context-menu|select|command)-item)$/;

test("focus: the generic outline is layered, so stock outline-hidden on a surface wins", () => {
  const unlayered = css.replace(/@layer base \{[\s\S]*?\n\}\n/g, "");
  assert.ok(/@layer base \{\s*:focus-visible \{/.test(css), "generic :focus-visible must sit in @layer base");
  assert.ok(!/^:focus-visible \{/m.test(unlayered), "no unlayered generic :focus-visible");
  assert.ok(!/^\[data-slot\]:focus-visible/m.test(css), "no ring on every [data-slot]: that paints menus and popovers");
});

test("focus: the unlayered ring names controls only, never a content surface or menu item", () => {
  const all = [...slots(FOCUS_CONTROLS), ...slots(FOCUS_FIELDS)];
  assert.ok(all.length >= 10, "read the selector lists");
  for (const s of all) assert.ok(!SURFACE.test(s), `${s} is a surface/item, not a control`);
  assert.ok(css.includes(FOCUS_FIELDS), "theme.css carries FOCUS_FIELDS");
  assert.ok(!/[\s,(]input(?!:not|-)\b/.test(FOCUS_FIELDS), "bare input would ring the borderless CommandInput");
});
