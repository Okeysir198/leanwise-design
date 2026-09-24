/* Write-or-check harness for a generator: `--check` fails on a stale file. */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

/* Internal: only `generated()` below reports paths. */
const relpathOf = (p, root = ROOT) => relative(root, p) || p;

export async function generated({ name, files, hint, check }) {
  if (!(files instanceof Map)) throw new TypeError("generated(): `files` must be a Map<absPath, content>");
  if (!files.size) throw new Error(name + ": generated() was handed no files — a generator that produces nothing is not current, it is broken");

  if (check) {
    let problems = 0;
    for (const [abs, want] of files) {
      const rel = relpathOf(abs);
      if (!existsSync(abs)) {
        console.error(`${name}: ${rel} is missing — ${hint}`);
        problems++;
        continue;
      }
      const have = readFileSync(abs);
      const wantBuf = Buffer.isBuffer(want) ? want : Buffer.from(want, "utf8");
      if (!have.equals(wantBuf)) {
        console.error(`${name}: ${rel} is stale — ${hint}`);
        problems++;
      }
    }
    return problems;
  }

  const written = [];
  for (const [abs, content] of files) {
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, content);
    written.push(relpathOf(abs));
  }
  const list = written.length > 6 ? written.slice(0, 5).join(", ") + `, … ${written.length - 5} more` : written.join(", ");
  console.log(`${name}: wrote ${written.length} file(s) — ${list}`);
  return 0;
}
