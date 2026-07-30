# `preview/_vendor/` — the three UMD builds the component cards run on

21 `components/**/*.card.html` cards mount real React demos. They used to pull React,
ReactDOM and Babel from `unpkg.com` at page load, which made `check:a11y` and
`check:visual` **network-dependent**: a CDN hiccup is a nondeterministic build failure,
and the gates could not run air-gapped at all. These are the same three files, on disk.

Nothing here is published, imported by the package, or reachable from `react.js` — the
cards are a fixture set, and this is their runtime.

## What is pinned

Fetched from `https://unpkg.com/<spec>` at the versions the cards already referenced.
Verify with `sha256sum -c` against this table (`cd` here first).

| File | Spec | Bytes | SHA-256 |
|---|---|---|---|
| `react.development.js` | `react@18.3.1/umd/react.development.js` | 109,931 | `28348fef6cb0ed8b2ceeb22deaf824428fd13875d84c73d38f77dd216fc24e7f` |
| `react-dom.development.js` | `react-dom@18.3.1/umd/react-dom.development.js` | 1,080,227 | `f9044a5e9c39db8bb1a204dff924e526ec0a621e695bb69de1035811be8709e4` |
| `babel.min.js` | `@babel/standalone@7.29.0/babel.min.js` | 3,137,752 | `2623a9e22809915ce789b4461154e277ddce520d5a4320c14d44332a5d0dcea0` |

**Development builds, deliberately.** A specimen card is where you *want* the key
warnings, the `act()` complaints and the component stack in a violation — the production
build strips exactly the diagnostics that make a card worth loading by hand. The size
difference (~1.1 MB) is paid by a local `file://` read, not by a consumer.

`@babel/standalone` is only shipped minified upstream; there is no choice to make there.

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
curl -sSLo babel.min.js             https://unpkg.com/@babel/standalone@7.29.0/babel.min.js
sha256sum *.js            # then update the table above
```

Bumping React means bumping it in **both** filenames and in all 21 cards
(`grep -rl _vendor components/`), and re-running `npm run check:a11y`. The bundle the
cards actually render (`_ds_bundle.js`) is built against React 18 in the Claude Design
project — do not move to 19 here without moving it there first.
