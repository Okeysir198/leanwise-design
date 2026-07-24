import type { ReactNode } from 'react';

/* =============================================================================
   <LogoRail> — a logo wall / marquee.
   Renders `.lw-logo-rail.marquee` with the track content DUPLICATED once and the
   second copy `aria-hidden` — the package CSS's `-50%` translate lands
   seamlessly only with the duplicate, and reduced motion hides the duplicate so
   the rail degrades to a static wrapping wall.

   Each item: if `mark` is provided it renders that node (an <img> or SVG);
   otherwise the `name` is typeset in mono inside an identical cell — six equal
   cells, not a scrapbook. If `href` is set the cell is wrapped in an <a>.
   ============================================================================= */

export type LogoItem = {
  id: string;
  name: string;
  /** The logo node. Omit to render the name typeset in mono. */
  mark?: ReactNode;
  /** Optional href — wraps the cell in a link. */
  href?: string;
};

export type LogoRailProps = {
  items: readonly LogoItem[];
  /** Marquee scroll. Default true; false renders a static wrapping wall. */
  marquee?: boolean;
  /** Extra classes. */
  className?: string;
  /** Accessible label for the rail. Default "Customers". */
  'aria-label'?: string;
};

export function LogoRail({
  items,
  marquee = true,
  className,
  'aria-label': ariaLabel = 'Customers',
}: LogoRailProps) {
  const cls = [
    'lw-logo-rail',
    marquee ? 'marquee' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls} aria-label={ariaLabel}>
      <div className="lw-logo-track">
        {items.map((it) => (
          <LogoCell key={it.id} item={it} />
        ))}
      </div>
      {marquee && (
        <div className="lw-logo-track" aria-hidden="true">
          {items.map((it) => (
            <LogoCell key={`${it.id}-dup`} item={it} />
          ))}
        </div>
      )}
    </div>
  );
}

function LogoCell({ item }: { item: LogoItem }) {
  const inner = item.mark ?? (
    <span className="name lw-mono">{item.name}</span>
  );

  if (item.href) {
    return (
      <a className="lw-logo-cell" href={item.href} aria-label={item.name}>
        {inner}
      </a>
    );
  }
  return (
    <div className="lw-logo-cell" role="img" aria-label={item.name}>
      {inner}
    </div>
  );
}
