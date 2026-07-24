# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The **`@leanwise/design` token core** — the canonical source of colors, radii, type scale,
motion, and the WCAG contrast contract for every LeanWise product. **Tokens + a Tailwind preset
+ two enforcement CLIs.** It ships **no component primitives** (no Button/Select/Eyebrow) —
each consumer owns its own shadcn copy; this package owns the *contract* those copies render
against. README is the user-facing doc; this file is the *maintainer* doc.

### Consumers (the suite — keep them in lockstep)

| Consumer | Pin | Consumes | Package manager |
|---|---|---|---|
| `P20260707-vss/frontend` | `#v0.2.2` | `tokens.css` + `shadcn.css` + Tailwind preset + `./brand` | pnpm |
| `leanwise-ai` | `#v0.2.2` | `tokens.css` + `lw.css` (the `.lw-*` marketing layer) | pnpm |
| `P20260706-rag-service/frontend` | `#v0.2.2` | `tokens.css` (vanilla CSS, no preset) | npm |

A token change is a reviewable one-line bump in each consumer, on that consumer's schedule.
**Suite skew is the failure mode** — when one consumer lags, it re-hand-rolls the very patterns
the package factored out (leanwise-ai hand-composed `--lw-brand-500-c` radials for a release
because `bg-hero-aside`/`bg-brand-wash` didn't exist at its pinned tag). After any release, bump
all three; the lockfile-check gotcha below is how a "bump" silently no-ops.

## Layout

```
tokens.css          THE source of truth — HSL channel triples + derived colors, light + dark.
                      Authored once as a triple (--lw-brand-500-c: 173.4 80.4% 40%) and derived
                      (--lw-brand-500: hsl(var(--lw-brand-500-c))). Edit the triple; NEVER the
                      derived line; never a hex in a consumer.
shadcn.css          maps --primary/--background/--accent/… onto tokens (no values of its own).
tailwind-preset.js  Tailwind v3 preset — registers cta/success/warning/brand/navy as REAL
                      utilities so devs never reach for the bg-[hsl(var(--x))] escape hatch.
lw.css              the .lw-* marketing classes (+ 44px touch targets, iOS-zoom guard) — only
                      leanwise-ai consumes this layer.
fonts.css + fonts/  Geist + Geist Mono, self-hosted, incl. Vietnamese subsets.
lib/brand.js        brandVars() / inkOn() / monogram() — runtime per-tenant theming.
bin/                the two CLIs (below).
```

## The two CLIs — both must stay green

`bin/lw-token-lint.mjs` — **the load-bearing part of the package.** A shared token file does not
make products consistent; nothing stops a dev writing `bg-emerald-500` next to it. This turns the
style guide into build failures. Four rules: `raw-hex`, `palette-escape` (covers
`bg|text|border|ring|fill|stroke|from|to|via|accent|caret|divide|outline|decoration` + the
Tailwind palette names), `arbitrary-token` (any `var(--…)` inside `[…]`), and `>1 variant="cta"`
per file. **It is a deny-list, not a contract checker** — it cannot detect a utility the preset
no longer registers, so a removed utility compiles, lints green, and renders unstyled. The
current consumers are safe only by coincidence; if you remove a utility, grep the consumers for
it before cutting the tag.

`bin/lw-contrast-check.mjs` — the WCAG AA gate. Parses `tokens.css` for the authored triples,
scoped per block (`:root` and `.dark` separately — scanning the whole file lets the last
declaration win and silently resolves a light token to its dark value), and fails if any of the
pair in the MANIFEST drops under 4.5:1 (63 pairs as of v0.6.7). **Run it on every token change.**
It exists because white-on-teal (2.49) and white-on-orange (2.80) shipped in a doc for months; a
number in CI catches what an eyeball doesn't.

Coverage is manifest-driven: `MANIFEST` at the top of the script is the single place a pair is
added, and the resolver supplies the color by chasing `var()` chains. That is what makes a
**role-token entry** (`fg: "cta-text"`) worth more than a literal one (`fg: "cta-400"`) — it
fails the moment someone re-points the alias, in the theme they broke it in. Prefer role tokens
when adding coverage; keep the literal entry too when the palette value itself is load-bearing.

```bash
node bin/lw-contrast-check.mjs     # all MANIFEST pairs ≥ AA
npx lw-token-lint <consumer>/src   # run in each consumer
```

## Three rules that are not obvious (defended by the contrast gate)

1. **Brand fills carry NAVY ink, not white.** White on teal is 2.49:1 (fails); navy `#0B1220` is
   7.52:1. `--lw-on-brand` is navy. Same for CTA (orange) and the status fills.
2. **A fill color is not a text color.** Teal-500 fills a button but scores 2.49 as a link. Use
   `--lw-brand-700` for teal-as-text on light (5.06), `--lw-brand-400`/`--lw-cta-400` on dark.
   This is the three-way `fill` / `text` / `ink` split — most systems conflate it.
3. **`--primary` is teal; orange is the `cta` *variant*, one per view.** Shadcn's `--primary`
   drives the default Button; putting orange there makes every button a CTA. And `--accent` is a
   ghost-button **hover surface**, not a brand color — per-tenant theming overrides
   `--primary`/`--ring` only (via `brandVars()`), never `--accent`.

## Releasing — the tag invariant (do not get this wrong)

The git tag, `package.json#version`, and the committed content **must all agree.** This bit us:
`v0.2.2` was cut without bumping `package.json` past `0.2.1`, so every installed copy *reported*
`0.2.1` while containing v0.2.2 content — and any future `version >= 0.2.2` check lies. For a
package whose thesis is "consistency is a dependency, not a discipline," the metadata lie is the
one defect that most directly undercuts the pitch.

To release `vX.Y.Z`:

1. Make the token/preset change. Run **both** CLIs green from the package root.
2. Bump `package.json#version` to `X.Y.Z` **in the same commit** as the change.
3. `git tag vX.Y.Z` on that commit and `git push && git push --tags`.
4. Bump the pin in **all three consumers** (`#vX.Y(Z-1)` → `#vX.Y.Z`) and refresh each lockfile.

**Do not move a published tag** (force-push a tag someone may have cached) to fix a missed bump —
cut the next version instead. A re-pointed tag breaks reproducibility for anyone who already
fetched the tarball, and the hash mismatch surfaces as a confusing cache error, not a clean
update.

### The lockfile-no-op gotcha

After moving a consumer's pin, `pnpm install` / `npm install` may report **"up to date"** and
keep the *old* resolved commit — npm/pnpm cache git deps by commit hash and the lockfile's
`resolved` entry pins the old one. Always verify the install actually moved:

```bash
grep "leanwise-design" <consumer>/<lockfile>   # resolved commit must be the new tag's SHA
grep -c "lw-text-display" <consumer>/node_modules/@leanwise/design/tokens.css   # a marker added in the new tag
```

If it didn't move: `rm -rf node_modules/@leanwise/design` and reinstall explicitly
(`npm install @leanwise/design@github:Okeysir198/leanwise-design#vX.Y.Z`). "up to date" is not
"on the new version."

## What not to do here

- **Don't edit a derived color line** (`--lw-x: hsl(var(--lw-x-c))`) — edit the `-c` triple. The
  triple is what Tailwind composes and what `brandVars()` synthesizes tints from.
- **Don't add a 4/8-digit hex** (`#RGBA`, `#RRGGBBAA`) thinking the lint catches it — `raw-hex`
  only matches 3/6 digits. Keep hex out of `tokens.css` triples entirely (they're HSL).
- **Don't `--on-dark*` in a triple-aware way** — those tokens are raw hex/rgba, the one
  inconsistency; they can't be re-tinted by `brandVars()`. Leave them unless you're migrating the
  whole set.
- **Don't ship without both bins green**, and don't add a consumer-side escape hatch
  (`// lw-token-lint-allow`) without a reviewer's eyes — it disables the arbitrary-token rule for
  that line, the rule that exists because of a real `--accent` footgun.

## Ownership

LeanWise code → personal account **Okeysir198** (never the Vietsol org). The git dep is
`github:Okeysir198/leanwise-design#<tag>`. See the user's global CLAUDE.md for which account owns
which project folder.
