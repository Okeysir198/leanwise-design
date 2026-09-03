/** Shared by the tests: the package root and a tokens.css triple reader. */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
export const read = (rel) => readFileSync(join(ROOT, rel), "utf8");

/** `--lw-<name>-c: H S% L%` from tokens.css, first declaration (the :root one). */
export function triple(name) {
  const m = read("tokens.css").match(new RegExp(`--lw-${name}-c:\\s*([\\d.]+)\\s+([\\d.]+)%\\s+([\\d.]+)%`));
  if (!m) throw new Error(`--lw-${name}-c not in tokens.css`);
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}
