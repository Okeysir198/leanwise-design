// Loads the LeanWise design system into this template. In a consuming project,
// point `base` at the bound DS folder relative to this file (e.g. '_ds/<folder>'
// at the project root, '../_ds/<folder>' one level down) — one line to edit.
//
// Four stylesheets, in order. tokens.css is the source of truth (it @imports
// fonts.css). base.css is the SHARED layer — buttons, cards, chips, type — and
// nothing can drop it. marketing.css is grounds, heroes and feature grids: a
// product app drops that one. product.css is layout, forms, data and overlays: a
// marketing page drops that one. These templates mix both, so they load all four.
//
// (lw.css and app.css still exist as shims for one full major. Do not load them
// alongside these: the same rules would apply twice and reorder the cascade.)
(() => {
  const base = '../..';
  // Load each asset AT MOST ONCE per document. A host runtime may already have
  // injected this design system; appending a second copy of a stylesheet is not
  // harmless (later rules win, so a duplicate can silently reorder the cascade),
  // and a second copy of the bundle can only pin the stale first one in place,
  // because the bundle guards with `window.NS = window.NS || {}`.
  const seen = (name) => [...document.querySelectorAll('link[rel="stylesheet"],script[src]')]
    .some(n => (n.href || n.src || '').split('?')[0].endsWith('/' + name));
  for (const p of ["tokens.css", "base.css", "marketing.css", "product.css"]) {
    if (seen(p)) continue;
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = base + '/' + p;
    document.head.appendChild(l);
  }
  const bundle = base + '/_ds_bundle.js';
  if (seen('_ds_bundle.js')) return;
  const s = document.createElement('script');
  s.src = bundle;
  s.onerror = () => console.error('ds-base.js: failed to load ' + bundle + ' — if this is a consuming project, point the base line in ds-base.js at the bound _ds/<folder> tree relative to this page; in a fresh design system this can just mean the bundle is not compiled yet');
  document.head.appendChild(s);
})();
