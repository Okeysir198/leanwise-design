/**
 * The one report shape the text gates share.
 *
 * Every gate ended with its own copy of the same twelve lines — a red header, a
 * dashed list, a footer, an exit code — and three of them had grown a second
 * rule nobody wrote down elsewhere: REFUSE TO PASS VACUOUSLY. lw-tone counts
 * the values it read and fails under twenty, because a parser that stops
 * matching reads nothing and "0 problems" is the shape of a gate that has
 * quietly switched itself off (`_cards.mjs` and `lw-visual.mjs` both record
 * having made that mistake). That idiom lived in one gate. Now it is an
 * argument: pass `checked` and `minChecked` and the report refuses for you.
 *
 *   process.exit(report("lw-x", { problems, summary, checked, minChecked, footer }));
 *
 * Returns the exit code rather than exiting, so a caller can print detail lines
 * first and a test can call it without dying.
 */

export const red = (s) => `\x1b[31m${s}\x1b[0m`;
export const green = (s) => `\x1b[32m${s}\x1b[0m`;
export const dim = (s) => `\x1b[2m${s}\x1b[0m`;

export function report(name, { problems = [], summary = "", checked, minChecked, footer } = {}) {
  if (minChecked !== undefined && !(checked >= minChecked)) {
    console.error(red(
      `\n${name} FAILED — only ${checked ?? 0} checked (< ${minChecked}). ` +
      "The gate is reading nothing; fix the parser, not this number.\n",
    ));
    return 1;
  }
  if (problems.length) {
    console.error(red(`\n${name}: ${problems.length} problem(s).\n`));
    for (const p of problems) console.error(`  - ${p}`);
    console.error(footer ? `\n${footer}\n` : "");
    return 1;
  }
  if (summary) console.log(green(summary));
  return 0;
}
