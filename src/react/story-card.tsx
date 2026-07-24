import type { ReactNode } from 'react';
import { Eyebrow } from './eyebrow';
import { monogram as nameToMonogram } from '../../lib/brand';

/* =============================================================================
   <StoryCard> — one customer-story card.

   Composes the package's card + glow + spotlight surface. The mark slot takes a
   ReactNode (an <img> from the site, or an inline SVG); when absent, the
   company name degrades to a two-letter monogram tile (the brand.js helper, so
   the fallback is identical to every other LeanWise product).

   No-fabrication rule (load-bearing): the optional `quote` block renders ONLY
   when ALL of quote / person / role are present and non-empty. A partial quote
   is how invented testimonials slip in; empty → renders nothing.

   NOTE: `.lw-story` (the card's internal layout) is NOT in the package's lw.css
   — it is site-local in leanwise-ai/src/styles/resources.css. Pass it via
   `className` to get the full layout; without it the card renders a clean
   default stack on the `.lw-card` surface. (Flagged to the foundation owner.)
   ============================================================================= */

export type StoryStatus = 'live' | 'pilot';

export type StoryQuote = {
  /** The verbatim quote. All three fields must be present to render. */
  quote: string;
  /** The person attribution (e.g. "Nguyen Van A"). */
  person: string;
  /** The role/title (e.g. "Quality Lead, TALIMEX"). */
  role: string;
};

export type StoryCardProps = {
  /** The company/customer name (card heading). */
  company: ReactNode;
  /** Industry or category eyebrow. */
  industry?: ReactNode;
  /** Short description body. */
  description?: ReactNode;
  /** The logo/mark node. Omit to fall back to the monogram tile. */
  mark?: ReactNode;
  /** Used for the monogram fallback when `mark` is absent. Defaults to `company`. */
  monogramName?: string;
  /** Live/Pilot status chip. Omit to hide. */
  status?: StoryStatus;
  /** Optional override for the chip's text. */
  statusLabel?: string;
  /** Optional quote — rendered only when quote, person AND role are all present. */
  quote?: Partial<StoryQuote> | null;
  /** KPI line (e.g. "98% first-pass"). Optional. */
  kpi?: ReactNode;
  /** Optional secondary KPI line. */
  kpiSub?: ReactNode;
  /** Wrap the card in a link. */
  href?: string;
  /** Extra classes on the card (e.g. "lw-story" for the site's layout). */
  className?: string;
  /** Click handler (use with href for analytics, etc.). */
  onClick?: () => void;
};

export function StoryCard({
  company,
  industry,
  description,
  mark,
  monogramName,
  status,
  statusLabel,
  quote,
  kpi,
  kpiSub,
  href,
  className,
  onClick,
}: StoryCardProps) {
  const cls = ['lw-card', 'lw-card-glow', 'lw-spotlight', className ?? '']
    .filter(Boolean)
    .join(' ');

  // No-fabrication: render the blockquote ONLY when all three are present.
  const hasQuote = Boolean(
    quote && quote.quote && quote.person && quote.role,
  );

  const inner = (
    <>
      {mark != null ? (
        <div className="logo">{mark}</div>
      ) : (
        <div className="logo lw-monogram" aria-hidden="true">
          {nameToMonogram(
            typeof monogramName === 'string'
              ? monogramName
              : typeof company === 'string'
                ? company
                : '',
          )}
        </div>
      )}

      <div className="body">
        {industry ? (
          <Eyebrow muted className="lw-mb-3" style={{ fontSize: 10 }}>
            {industry}
          </Eyebrow>
        ) : null}

        <h3>{company}</h3>
        {description ? <p>{description}</p> : null}

        {(kpi || kpiSub) && (
          <div className="meta">
            {kpi ? <span className="kpi">{kpi}</span> : null}
            {kpiSub ? (
              <span className="kpi-sub">
                {typeof kpiSub === 'string' ? kpiSub.toUpperCase() : kpiSub}
              </span>
            ) : null}
          </div>
        )}

        {status && (
          <span className="lw-status-chip" data-variant={status}>
            {statusLabel ?? status}
          </span>
        )}

        {hasQuote && quote && (
          <blockquote className="lw-story-quote">
            <p>{quote.quote}</p>
            <footer>
              <span className="person">{quote.person}</span>
              <span className="role">{quote.role}</span>
            </footer>
          </blockquote>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <a className={cls} href={href} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <div
      className={cls}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {inner}
    </div>
  );
}
