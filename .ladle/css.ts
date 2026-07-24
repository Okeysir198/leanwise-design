// One side-effect import every story shares — the token core + .lw-* layer + fonts, so
// components render against the real design system (not unstyled). Importing per-story
// is how Ladle handles global CSS (it has no Storybook-style preview.tsx).
import '../fonts.css';
import '../tokens.css';
import '../lw.css';
