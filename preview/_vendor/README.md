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
the repo and from every one of the card loads the visual gate makes per run —
a compiler the browser parsed and ran to transpile a few kilobytes that never changed.

## What is pinned

Fetched from `https://unpkg.com/<spec>`. Verify with `sha256sum -c` against this table
(`cd` here first).

| File | Spec | Bytes | SHA-256 |
|---|---|---|---|
| `react.production.min.js` | `react@18.3.1/umd/react.production.min.js` | 10,751 | `d949f1c3687aedadcedac85261865f29b17cd273997e7f6b2bfc53b2f9d4c4dd` |
| `react-dom.production.min.js` | `react-dom@18.3.1/umd/react-dom.production.min.js` | 131,835 | `35f4f974f4b2bcd44da73963347f8952e341f83909e4498227d4e26b98f66f0d` |

**React 18, not 19, and that is forced.** React 19 ships no UMD build, and a card is a
plain `file://` page with three `<script src>` tags and no bundler. The package's
`peerDependencies` range (`>=18`) is what governs consumers; this pin governs only what
the fixtures render on.

## Production builds since v3.0.0 — the reversal, and why

Through v2.3.0 these were the **development** builds, deliberately: a specimen card is
where you *want* the key warnings, the `act()` complaints and the component stack in a
violation. Two things changed that.

1. **`package.json#files` now carries `preview/`.** Every `*.card.html` had always
   shipped in the tarball while the three things it loads — `preview/_card.css`,
   `preview/_vendor/react*.js` and `_ds_bundle.js` — did not, so **the cards in the
   published package had never once rendered** (REVIEW.md open item 3). Shipping what
   they need is the fix; shipping 1.19 MB of development React to do it is not.
2. **No gate reads a React warning.** `lw-a11y.mjs` listens on `pageerror` and nothing
   else, and the production build still throws — so the render guard, the page-error
   check and axe all behave identically. The warnings were for a human opening a card
   by hand, which is a real loss and a small one.

Net: **−1.19 MB from the clone** and from every card load both browser gates make, and
~45 KB gzipped in the tarball instead of ~255 KB.

If you are debugging a card by hand and want the warnings back, drop the two
development builds in beside these and re-point the two `<script src>` tags in the one
card you are looking at. Do not commit that.

## Why the `integrity` / `crossorigin` attributes went away

They guarded a *network* fetch. On a relative `file://` path there is no origin to be
anonymous about, and SRI over `file:` is not enforced — keeping them would have been a
check that reads as protection while verifying nothing. The hashes above are the
replacement, and they are checkable without a browser.

## Re-pinning

```bash
cd preview/_vendor
curl -sSLo react.production.min.js     https://unpkg.com/react@18.3.1/umd/react.production.min.js
curl -sSLo react-dom.production.min.js https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js
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
