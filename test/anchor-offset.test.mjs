import { test } from "node:test";
import assert from "node:assert/strict";
import { read } from "./_root.mjs";

// A #fragment has to land below the sticky header. Header height and anchor offset
// are one value: a literal anywhere else is a second copy that drifts on its own.
const css = read("marketing.css").replace(/\/\*[\s\S]*?\*\//g, "");
const decls = (prop) => [...css.matchAll(new RegExp(`(?:^|[;{\\s])(${prop}[\\w-]*)\\s*:\\s*([^;}]+)`, "g"))];

test("the anchor offset derives from the header height", () => {
  const root = css.match(/:root\s*\{([^}]*)\}/)[1];
  assert.match(root, /--header-h\s*:\s*[^;]+;/, "--header-h is not defined in :root");
  assert.match(root, /--anchor-offset\s*:\s*[^;]*var\(--header-h\)/, "--anchor-offset does not read --header-h");
});

test("the sticky header is sized by --header-h", () => {
  const rule = css.match(/\.lw-site-header\s*>\s*\.lw-container\s*\{([^}]*)\}/)[1];
  assert.match(rule, /min-height\s*:\s*var\(--header-h\)/, "the header's height is a literal, not --header-h");
});

test("every scroll-margin reads --anchor-offset", () => {
  const found = decls("scroll-margin");
  assert.ok(found.length > 0, "no scroll-margin declarations — the check measures nothing");
  for (const [, prop, value] of found) {
    assert.match(value, /var\(--anchor-offset\)/, `${prop}: ${value.trim()} is a second copy of the offset`);
  }
});
