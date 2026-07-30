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
 * Split a stylesheet into rule records by walking brace depth.
 *
 * Nested rules — a `:root` inside `@media (prefers-color-scheme: dark)` —
 * surface as their OWN record, so a scope's declarations are extracted exactly
 * once. The enclosing at-rule is emitted too; callers filter it by selector.
 *
 * Each record carries:
 *   selector    the prelude, trimmed
 *   body        the full text between the braces, INCLUDING nested children
 *   directBody  the same with every nested child excised — what you almost
 *               always want, because `declarationsIn(body)` on a parent
 *               otherwise merges its descendants' declarations upward with no
 *               marker. The contrast gate dodged that with its own nesting
 *               checks and DTCG dodged it only for at-rules; a plain nested
 *               rule or a CSS-nesting `&` would have merged silently in both.
 *   atRule      the nearest enclosing at-rule prelude, or "". The theme a rule
 *               belongs to is decided by the at-rule PLUS the selector — a
 *               `:root` inside `@media (prefers-color-scheme: dark)` is a dark
 *               scope, and reading the selector alone folded the whole dark
 *               palette into the base theme.
 *   start/end   offsets into `src`, which is what lets a caller ask whether one
 *               rule is nested inside another rather than guess from text.
 *
 * Returns the records in source order (parents before their children).
 */
export function splitRules(src) {
  const rules = [];
  const stack = [];
  let buf = "";
  // A brace inside a string or a url() is CONTENT, not structure. Miscounting one
  // desynchronises the walker for the rest of the file, and every selector and
  // body after it is garbage that still parses into plausible-looking rules —
  // the worst shape of failure for the parser all three static gates share.
  let quote = null;
  let inUrl = false;

  for (let i = 0; i < src.length; i++) {
    const c = src[i];

    if (quote) {
      if (c === "\\") { buf += c + (src[++i] ?? ""); continue; }
      if (c === quote) quote = null;
      buf += c;
      continue;
    }
    if (inUrl) {
      if (c === ")") inUrl = false;
      buf += c;
      continue;
    }
    if (c === '"' || c === "'") { quote = c; buf += c; continue; }
    if (c === "(" && /url\s*$/i.test(buf)) { inUrl = true; buf += c; continue; }

    if (c === "{") {
      // Everything after the last `;` is the selector. A STATEMENT at-rule —
      // the leading `@import url("./fonts.css");` — terminates with a semicolon
      // rather than a block, so without this trim it is glued onto the front of
      // the next selector. The palette `:root` then matches nothing and every
      // channel in the file reads as unresolved.
      const selector = buf.slice(buf.lastIndexOf(";") + 1).trim();
      const parent = stack[stack.length - 1];
      stack.push({
        selector,
        start: i + 1,
        children: [],
        atRule: parent ? (parent.selector.startsWith("@") ? parent.selector : parent.atRule) : "",
      });
      buf = "";
    } else if (c === "}") {
      const top = stack.pop();
      // An unbalanced `}` means the walker's model of the file is already wrong.
      // Silently ignoring it produced "successfully parsed" garbage.
      if (!top) throw new Error("_css: unbalanced } at offset " + i);
      const body = src.slice(top.start, i);
      let directBody = "";
      let cursor = top.start;
      for (const ch of top.children) {
        directBody += src.slice(cursor, ch.start - 1);
        cursor = ch.end + 1;
      }
      directBody += src.slice(cursor, i);
      const rec = { selector: top.selector, body, directBody, atRule: top.atRule, start: top.start, end: i };
      rules.push(rec);
      const parent = stack[stack.length - 1];
      if (parent) parent.children.push({ start: top.start, end: i });
      buf = "";
    } else {
      buf += c;
    }
  }
  if (stack.length) throw new Error("_css: unterminated block, selector " + JSON.stringify(stack[stack.length - 1].selector));
  // Emitted innermost-first by the pop order; source order is friendlier and is
  // what the callers' "last declaration wins" logic assumes.
  return rules.sort((a, b) => a.start - b.start);
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
