/**
 * The card list the two browser gates enumerate — from BOTH sources, cross-checked.
 *
 * Both gates used to walk the tree for `.html` files whose first 200 bytes
 * contain `@dsCard`. Two silent-pass holes in one line:
 *
 *   1. An empty result is a PASS. `Promise.all([])` resolves at once and the
 *      a11y gate prints "0 cards × 2 grounds — no violations", exit 0. A moved
 *      preview/, a renamed marker, a partial checkout — all report clean. This
 *      is the worst defect class in a gate: a glob that matches nothing is
 *      indistinguishable from a run that found nothing wrong.
 *   2. The 200-byte prefix is fragile. A card that grows a longer preamble
 *      drops out of BOTH gates, one card at a time, with no diagnostic.
 *
 * _ds_manifest.json is the declaration surface (CLAUDE.md: "a card declares
 * itself with a first-line @dsCard marker"), so it is the authority on WHAT
 * should exist; the filesystem is the authority on what DOES. Disagreement in
 * either direction is an error, which turns both holes into a loud failure:
 * a card added to disk but not the manifest, or listed and then deleted.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

export function collectCards(ROOT) {
  const manifestPath = join(ROOT, "_ds_manifest.json");
  if (!existsSync(manifestPath)) {
    throw new Error("_cards: _ds_manifest.json is missing — cannot tell which cards should exist. Refusing to report a clean run.");
  }
  const declared = JSON.parse(readFileSync(manifestPath, "utf8")).cards ?? [];
  if (!declared.length) throw new Error("_cards: _ds_manifest.json declares no cards. Refusing to report a clean run.");

  const found = [];
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.name.startsWith(".") || e.name === "node_modules") continue;
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      // Read the whole file rather than a 200-byte prefix: the marker is
      // first-line by convention, but a gate must not silently drop a card
      // because a licence header pushed it past an arbitrary byte offset.
      else if (e.name.endsWith(".html") && readFileSync(p, "utf8").includes("@dsCard")) found.push(p);
    }
  };
  walk(ROOT);

  const onDisk = new Set(found.map((p) => relative(ROOT, p)));
  const inManifest = new Set(declared.map((c) => c.path));
  const missing = [...inManifest].filter((p) => !onDisk.has(p));
  const unlisted = [...onDisk].filter((p) => !inManifest.has(p));

  if (missing.length || unlisted.length) {
    const lines = [
      "_cards: the manifest and the filesystem disagree about which cards exist.",
      ...missing.map((p) => "  · declared in _ds_manifest.json but not found (or missing its @dsCard marker): " + p),
      ...unlisted.map((p) => "  · carries an @dsCard marker but is not in _ds_manifest.json: " + p),
      "  Both gates enumerate from this list, so a disagreement means cards are going unchecked.",
    ];
    throw new Error(lines.join("\n"));
  }
  return declared.map((c) => join(ROOT, c.path));
}
