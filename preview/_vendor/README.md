# `preview/_vendor/` — the two UMD builds the component cards run on

The `components/**/*.card.html` cards mount real React demos. They used to pull React,
ReactDOM and Babel from `unpkg.com` at page load, which made `check:a11y` and
`check:visual` **network-dependent**: a CDN hiccup is a nondeterministic build failure,
and the gates could not run air-gapped at all. These are the same React files, on disk.

**Babel is gone (v1.13.0).** The cards no longer inline JSX in a
`<script type="text/babel">` block; each card's body is a `<name>.card.jsx` source
file beside it, compiled ahead of time by `tools/lw-cards.mjs` (esbuild, classic
`React.createElement` transform) into a committed `<name>.card.js`, checked for
staleness by `npm run check:cards`. That removed 3.1 MB of `@babel/standalone` from
the repo and from every one of the 108 card loads the visual gate makes per run —
a compiler the browser parsed and ran to transpile a few kilobytes that never changed.

Nothing here is published, imported by the package, or reachable from `react.js` — the
cards are a fixture set, and this is their runtime.

## What is pinned

Fetched from `https://unpkg.com/<spec>` at the versions the cards already referenced.
Verify with `sha256sum -c` against this table (`cd` here first).

| File | Spec | Bytes | SHA-256 |
|---|---|---|---|
| `react.development.js` | `react@18.3.1/umd/react.development.js` | 109,931 | `28348fef6cb0ed8b2ceeb22deaf824428fd13875d84c73d38f77dd216fc24e7f` |
| `react-dom.development.js` | `react-dom@18.3.1/umd/react-dom.development.js` | 1,080,227 | `f9044a5e9c39db8bb1a204dff924e526ec0a621e695bb69de1035811be8709e4` |

**Development builds, deliberately.** A specimen card is where you *want* the key
warnings, the `act()` complaints and the component stack in a violation — the production
build strips exactly the diagnostics that make a card worth loading by hand. The size
difference (~1.1 MB) is paid by a local `file://` read, not by a consumer.

## Why the `integrity` / `crossorigin` attributes went away

They guarded a *network* fetch. On a relative `file://` path there is no origin to be
anonymous about, and SRI over `file:` is not enforced — keeping them would have been a
check that reads as protection while verifying nothing. The hashes above are the
replacement, and they are checkable without a browser.

## Re-pinning

```bash
cd preview/_vendor
curl -sSLo react.development.js     https://unpkg.com/react@18.3.1/umd/react.development.js
curl -sSLo react-dom.development.js https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js
sha256sum *.js            # then update the table above
```

Bumping React means bumping it in **both** filenames and in every card
(`grep -rl _vendor components/`), and re-running `npm run check:a11y`.

The bundle the cards actually render (`_ds_bundle.js`) is built **here** by
`npm run bundle` as of v1.1.7 — it used to be cut in the Claude Design project, which is
why an earlier draft of this file said so. It takes React from the page globals (these
files) rather than bundling its own, so the version the cards run is decided *here* and
nowhere else. Bump these and the bundle follows on the next `npm run bundle`; the
`peerDependencies` range in `package.json` is what governs consumers.
