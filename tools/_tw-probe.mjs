/**
 * The one Tailwind probe compiler the two v4 gates share.
 *
 * There were two: lw-presence.mjs asks "does every name theme.css registers
 * actually yield a utility?", lw-registry.mjs asks "does every class the
 * registry components use actually compile?". Different questions — but the
 * apparatus is identical, and the part that matters is the IMPORT CHAIN:
 *
 *     @import "tailwindcss" source(none);
 *     @source "<probe.html>";
 *     tokens.css -> shadcn.css -> theme.css
 *
 * That chain is the documented consumer setup, and it is the whole point of
 * both gates — they are only meaningful insofar as they compile what an app
 * compiles. Two hand-maintained copies of it is the same bug multiplier
 * `_css.mjs` was written to end, with a nastier failure mode: if the chain grows
 * a layer and only one copy is updated, the other probes a stale chain and still
 * reports OK. A gate measuring the wrong thing and passing is worse than no gate.
 *
 * The chain is deliberately SHORTER than the consumer's import list: `fonts.css`,
 * `reset.css`, `base.css` and `product.css` register nothing, so they cannot
 * change whether a utility is emitted, and including them would only let a rule
 * in one of them mask a missing registration. Registration layers only.
 *
 * `source(none)` is load-bearing: without it a utility can appear in the output
 * because some template in the repo happens to use it, and the probe stops
 * being the only thing that decides. Both gates depended on it; only one said so.
 *
 * postcss and @tailwindcss/postcss are resolved through `ROOT/package.json`
 * rather than bare-specifier imported, so the gates still work when this package
 * is running as an installed dependency and its devDeps are not on the caller's
 * resolution path.
 *
 * Throws on any failure — the callers own their diagnostics, which differ
 * deliberately (presence explains that a missing Tailwind must not be treated as
 * a skip; registry reports the offending class list).
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

/**
 * Compile `classes` against the documented import chain and return the CSS.
 *
 * @param {string}   ROOT     package root — the chain's files are resolved from it.
 * @param {Iterable<string>} classes  the class names to probe for.
 * @param {string}   label    short tool name, used for the temp dir and the
 *                            `from:` filename so a postcss error names its gate.
 */
export async function compileProbe(ROOT, classes, label) {
  const req = createRequire(path.join(ROOT, "package.json"));
  const postcss = (await import(pathToFileURL(req.resolve("postcss")))).default;
  const tw = (await import(pathToFileURL(req.resolve("@tailwindcss/postcss")))).default;

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `lw-${label}-`));
  try {
    const probe = path.join(tmp, "probe.html");
    fs.writeFileSync(probe, `<div class="${[...classes].join(" ")}"></div>`);
    const entry = [
      `@import "tailwindcss" source(none);`,
      `@source "${probe}";`,
      `@import "${path.join(ROOT, "tokens.css")}";`,
      `@import "${path.join(ROOT, "shadcn.css")}";`,
      `@import "${path.join(ROOT, "theme.css")}";`,
    ].join("\n");
    return (await postcss([tw()]).process(entry, { from: path.join(ROOT, `.lw-${label}-probe.css`) })).css;
  } finally {
    // `finally`, not a trailing call: a throw used to leak the temp dir, and on
    // CI that is a slow leak nobody attributes to the gate that caused it.
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}
