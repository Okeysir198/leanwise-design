/* The one report shape. A check passes `checked`/`minChecked` so it refuses to
   pass vacuously: reading zero of the thing it measures is a failure. */

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
