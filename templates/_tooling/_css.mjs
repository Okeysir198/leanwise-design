/**
 * The one CSS reader the gates share.
 *
 * There were three: a brace-walker in lw-contrast-check.mjs, a byte-identical
 * copy in lw-token-lint.mjs, and a regex block-matcher in lw-tokens-dtcg.mjs.
 * That is not a style problem — it is a bug multiplier. The `@import` defect
 * below was found once, fixed in the contrast gate, fixed again by hand in the
 * DTCG generator (whose comment says "lw-contrast-check.mjs solves the same
 * case the same way"), and was still live in the lint's copy: a third parser
 * nobody remembered to visit. Its cost was not hypothetical — the same defect
 * shipped a gutted tokens.json at v1.1.2 and made the theme-parity gate vacuous.
 *
 * One parser, one place to fix the next one.
 */

/**
 * Split a stylesheet into (selector, body) pairs by walking brace depth.
 *
 * Nested rules — a `:root` inside `@media (prefers-color-scheme: dark)` —
 * surface as their OWN pair carrying their direct body, so a scope's
 * declarations are extracted exactly once. The enclosing at-rule is emitted
 * too; callers filter it by selector.
 *
 * `start`/`end` are offsets into `src`, which is what lets a caller ask whether
 * one rule is nested inside another rather than guessing from selector text.
 *
 * Returns [{ selector, body, start, end }] in source order.
 */
export function splitRules(src) {
  const rules = [];
  const stack = [];
  let buf = "";
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (c === "{") {
      // Everything after the last `;` is the selector. A STATEMENT at-rule —
      // the leading `@import url("./fonts.css");` — terminates with a semicolon
      // rather than a block, so without this trim it is glued onto the front of
      // the next selector. The palette `:root` then matches nothing and every
      // channel in the file reads as unresolved.
      stack.push({ selector: buf.slice(buf.lastIndexOf(";") + 1).trim(), start: i + 1 });
      buf = "";
    } else if (c === "}") {
      const top = stack.pop();
      if (top) rules.push({ selector: top.selector, body: src.slice(top.start, i), start: top.start, end: i });
      buf = "";
    } else {
      buf += c;
    }
  }
  return rules;
}

/** Strip comments so prose mentioning `1.8s` or a hex cannot trip a rule. */
export const stripComments = (raw) => raw.replace(/\/\*[\s\S]*?\*\//g, "");

/**
 * Custom-property declarations in one rule body, as { bareName: value } with
 * the `--lw-` prefix removed.
 *
 * The final declaration in a block may omit its semicolon; requiring one
 * dropped that token silently, and a dropped channel reads downstream as
 * "unresolved" rather than as the authoring slip it is.
 */
export function declarationsIn(body) {
  const out = {};
  const re = /--lw-([a-z0-9-]+)\s*:\s*([^;]+)(?:;|$)/g;
  let m;
  while ((m = re.exec(body))) out[m[1]] = m[2].trim();
  return out;
}
