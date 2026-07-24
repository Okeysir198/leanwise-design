import type { CSSProperties, ReactNode } from 'react';

/* =============================================================================
   <FeatureGrid> — a grid of feature cards (`.lw-features` of `.lw-feature`).
   Each item pairs an icon (a ReactNode — typically one of the inline-SVG icons
   from ./icons) with a title and body. The whole grid is reveal-on-scroll ready
   (carries `.lw-reveal`; mount useReveal() upstream to drive it).

   NOTE: `.lw-features` and `.lw-feature` are NOT yet in the package's lw.css —
   they live site-local in leanwise-ai/src/styles/pages.css today. This component
   renders them faithfully so a future package release can style them; until then
   the consumer should carry the grid layout locally (or pass className).
   Flagged to the foundation owner.
   ============================================================================= */

export type Feature = {
  /** Stable key (also drives the mono index when `num` is absent). */
  id?: string;
  /** Inline-SVG icon node (see ./icons). */
  icon?: ReactNode;
  /** Optional mono index label (e.g. "01") — shown when `icon` is absent. */
  num?: string;
  title: ReactNode;
  body: ReactNode;
};

export type FeatureGridProps = {
  items: readonly Feature[];
  /** Per-instance grid overrides (e.g. a fixed column count). */
  style?: CSSProperties;
  /** Extra classes (e.g. a page-scoped override). */
  className?: string;
  /** Render each card as a spotlight (cursor highlight). Default true. */
  spotlight?: boolean;
};

export function FeatureGrid({
  items,
  style,
  className,
  spotlight = true,
}: FeatureGridProps) {
  return (
    <div
      className={['lw-features', 'lw-reveal', className ?? '']
        .filter(Boolean)
        .join(' ')}
      style={{ marginTop: 48, ...style }}
    >
      {items.map((f, i) => {
        const cls = [
          'lw-feature',
          spotlight ? 'lw-spotlight' : '',
        ]
          .filter(Boolean)
          .join(' ');
        return (
          <div key={f.id ?? f.num ?? i} className={cls}>
            {f.icon ? (
              <div className="icon" aria-hidden="true">
                {f.icon}
              </div>
            ) : f.num ? (
              <div className="num">{f.num}</div>
            ) : null}
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </div>
        );
      })}
    </div>
  );
}
