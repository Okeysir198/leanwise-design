// Loads the LeanWise design system into this template: the fonts, the compiled
// Tailwind + theme stylesheet, and the component bundle. React 19 is loaded by the
// template's own <head>, before support.js. In a consuming project, point `base` at
// the bound DS folder relative to this file — one line to edit.
(() => {
  const base = '../..';
  const seen = (name) => [...document.querySelectorAll('link[rel="stylesheet"],script[src]')]
    .some(n => (n.href || n.src || '').split('?')[0].endsWith('/' + name));
  for (const p of ['fonts.css', 'preview/preview.css']) {
    if (seen(p.split('/').pop())) continue;
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = base + '/' + p;
    document.head.appendChild(l);
  }
  if (seen('_ds_bundle.js')) return;
  const s = document.createElement('script');
  s.src = base + '/_ds_bundle.js';
  s.onerror = () => console.error('ds-base.js: failed to load ' + s.src + ' — point `base` at the bound design-system folder');
  document.head.appendChild(s);
})();
