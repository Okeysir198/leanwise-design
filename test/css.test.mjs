/** tools/_css.mjs — the one CSS reader every static gate shares. */
import { test } from "node:test";
import assert from "node:assert/strict";
import * as css from "../tools/_css.mjs";

const { splitRules, declarationsIn, stripComments } = css;

test("splitRules: @import statement, nested @media, url() and quoted braces", () => {
  const src = `@import url("./fonts.css");
:root { --lw-a: 1; background: url("a{b}"); content: "}"; }
@media (prefers-color-scheme: dark) { :root { --lw-a: 2; } }
.x { --lw-b: 3 }`;
  const rules = splitRules(src);
  const sels = rules.map((r) => r.selector);
  assert.deepEqual(sels, [":root", "@media (prefers-color-scheme: dark)", ":root", ".x"]);
  // The @import must not be glued onto the front of the first selector.
  assert.equal(rules[0].selector, ":root");
  assert.equal(rules[2].atRule, "@media (prefers-color-scheme: dark)");
  assert.equal(rules[0].atRule, "");
  // Braces inside url() and a string are content, not structure.
  assert.match(rules[0].body, /url\("a\{b\}"\)/);
  assert.match(rules[0].body, /content: "\}"/);
});

test("splitRules: directBody excludes nested children, body includes them", () => {
  const src = `@media (x) { --lw-outer: 1; :root { --lw-inner: 2; } --lw-after: 3; }`;
  const [media, root] = splitRules(src);
  assert.equal(media.selector, "@media (x)");
  assert.match(media.body, /--lw-inner/);
  assert.doesNotMatch(media.directBody, /--lw-inner/);
  assert.match(media.directBody, /--lw-outer/);
  assert.match(media.directBody, /--lw-after/);
  assert.deepEqual(declarationsIn(root.directBody), { inner: "2" });
});

test("declarationsIn keeps a final declaration without a semicolon", () => {
  assert.deepEqual(declarationsIn("--lw-a: 1; --lw-b: two words"), { a: "1", b: "two words" });
});

test("splitRules throws on an unbalanced }", () => {
  assert.throws(() => splitRules(".a { } }"), /unbalanced/);
  assert.throws(() => splitRules(".a { "), /unterminated/);
});

test("stripComments removes block comments", () => {
  assert.equal(stripComments("a /* 1.8s */ b"), "a  b");
});

test("splitSelectorList keeps :where(a, b) and [data-x=\"a,b\"] intact", { skip: !css.splitSelectorList && "WS1's _css.mjs#splitSelectorList not exported yet" }, () => {
  const out = css.splitSelectorList(`:where(a, button) .x, [data-x="a,b"], .y`);
  assert.deepEqual(out, [`:where(a, button) .x`, `[data-x="a,b"]`, ".y"]);
});
