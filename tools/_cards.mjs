/* The card list the browser gates enumerate: _ds_manifest.json says which cards should
   exist, the filesystem says which do, and any disagreement (or an empty list) throws. */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

export function collectCards(ROOT) {
  const manifestPath = join(ROOT, "_ds_manifest.json");
  if (!existsSync(manifestPath)) throw new Error("_cards: _ds_manifest.json is missing");
  const declared = JSON.parse(readFileSync(manifestPath, "utf8")).cards ?? [];
  if (!declared.length) throw new Error("_cards: _ds_manifest.json declares no cards");

  const found = [];
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.name.startsWith(".") || e.name === "node_modules") continue;
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".html") && readFileSync(p, "utf8").startsWith("<!-- @dsCard")) found.push(p);
    }
  };
  walk(ROOT);

  const onDisk = new Set(found.map((p) => relative(ROOT, p)));
  const inManifest = new Set(declared.map((c) => c.path));
  const missing = [...inManifest].filter((p) => !onDisk.has(p));
  const unlisted = [...onDisk].filter((p) => !inManifest.has(p));
  if (missing.length || unlisted.length) {
    throw new Error([
      "_cards: the manifest and the filesystem disagree about which cards exist.",
      ...missing.map((p) => "  declared but not on disk: " + p),
      ...unlisted.map((p) => "  on disk but not declared: " + p),
    ].join("\n"));
  }
  return declared.map((c) => join(ROOT, c.path));
}
