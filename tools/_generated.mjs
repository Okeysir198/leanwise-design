/**
 * The one "generated, committed, staleness-checked" harness.
 *
 * Five generators (tokens.json, react.d.ts + Icon.d.ts, _ds_bundle.js,
 * logo-favicon.svg, r/*.json) each carried their own copy of the same tail:
 * build the content, then either write it or compare it with what is on disk
 * and fail on missing/stale. Five copies meant five slightly different
 * messages, five places to forget the "missing" branch, and — the real cost —
 * no single place to assert that a generated file names ITSELF and its
 * regeneration command when it is stale.
 *
 *   const problems = await generated({ name, files, hint, check });
 *
 * `files` is a Map<absolutePath, string | Buffer>. In check mode every entry is
 * compared byte-for-byte with disk; each missing or stale file is printed to
 * stderr as `<name>: <relpath> is missing|stale — <hint>` and the COUNT is
 * returned, so the caller decides how to exit (most exit 1 immediately; the
 * registry folds it into a larger problem list). In write mode every entry is
 * written (parent directories created) and one summary line is printed.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

export const relpathOf = (p, root = ROOT) => relative(root, p) || p;

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
