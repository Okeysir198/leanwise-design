import { useRef, useState, type KeyboardEvent } from 'react';
import type { ReactNode } from 'react';

/* =============================================================================
   <CodeBlock> — the always-dark mono code surface (`.lw-code`).

   Two rendering paths:
     1. `highlightedHtml` (server-produced, e.g. by refractor on the site) —
        rendered via dangerouslySetInnerHTML inside `.lw-code`. The token spans
        (`.tok-keyword`, `.tok-string`, …) are themed by the package CSS.
     2. raw `code` — escaped and rendered in a `<pre class="lw-code"><code>`.

   Optional `filename` wraps the block in a `.lw-console` frame with a
   `.lw-console-h` header (reuse of the existing console chrome).

   Optional `tabs` (`{id,label,code,lang,highlightedHtml?}[]`) renders a
   `.lw-code-tabs` tablist with roving-focus role="tab"/role="tabpanel",
   arrow-key + Home/End keyboard navigation.
   ============================================================================= */

export type CodeTab = {
  id: string;
  label: string;
  code: string;
  lang?: string;
  /** Pre-highlighted HTML for this tab (overrides `code` rendering). */
  highlightedHtml?: string;
};

export type CodeBlockProps = {
  /** Raw source code (escaped on output). Ignored when `highlightedHtml` is set. */
  code?: string;
  /** Language label shown in the header / used as a hint (no client highlighting). */
  lang?: string;
  /** Server-produced highlighted HTML; rendered verbatim inside `.lw-code`. */
  highlightedHtml?: string;
  /** When set, wraps the block in a `.lw-console` frame with a header bar. */
  filename?: string;
  /** Extra content for the header's right side (e.g. a copy button). */
  headerActions?: ReactNode;
  /** Tab set. When provided, renders `.lw-code-tabs` instead of a single block. */
  tabs?: CodeTab[];
  className?: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** The inner `.lw-code` surface for a single snippet (highlighted or raw). */
function CodeSurface({
  code,
  highlightedHtml,
}: {
  code?: string;
  highlightedHtml?: string;
}) {
  if (highlightedHtml != null) {
    return (
      <pre className="lw-code" tabIndex={0}>
        <code dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
      </pre>
    );
  }
  return (
    <pre className="lw-code" tabIndex={0}>
      <code dangerouslySetInnerHTML={{ __html: escapeHtml(code ?? '') }} />
    </pre>
  );
}

function ConsoleHeader({
  filename,
  lang,
  actions,
}: {
  filename?: string;
  lang?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="lw-console-h">
      <span className="left">
        <span className="lights" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        {filename ? <span className="url">{filename}</span> : null}
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
        {lang ? <span>{lang}</span> : null}
        {actions}
      </span>
    </div>
  );
}

export function CodeBlock({
  code,
  lang,
  highlightedHtml,
  filename,
  headerActions,
  tabs,
  className,
}: CodeBlockProps) {
  // ---- Tabs -----------------------------------------------------------------
  if (tabs && tabs.length > 0) {
    return (
      <CodeTabs
        tabs={tabs}
        filename={filename}
        headerActions={headerActions}
        className={className}
      />
    );
  }

  const hasHeader = Boolean(filename || lang || headerActions);

  if (hasHeader) {
    return (
      <div className={['lw-console', className ?? ''].filter(Boolean).join(' ')}>
        <ConsoleHeader filename={filename} lang={lang} actions={headerActions} />
        <CodeSurface code={code} highlightedHtml={highlightedHtml} />
      </div>
    );
  }

  return (
    <CodeSurface
      code={code}
      highlightedHtml={highlightedHtml}
      // No header: fold the optional className onto the surface by wrapping.
    />
  );
}

/* ---- Tabs implementation --------------------------------------------------- */

function CodeTabs({
  tabs,
  filename,
  headerActions,
  className,
}: {
  tabs: CodeTab[];
  filename?: string;
  headerActions?: ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (i: number) => {
    const idx = (i + tabs.length) % tabs.length;
    setActive(idx);
    tabRefs.current[idx]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        focusTab(i + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        focusTab(i - 1);
        break;
      case 'Home':
        e.preventDefault();
        focusTab(0);
        break;
      case 'End':
        e.preventDefault();
        focusTab(tabs.length - 1);
        break;
      default:
        break;
    }
  };

  const current = tabs[active] ?? tabs[0];

  return (
    <div className={['lw-console', className ?? ''].filter(Boolean).join(' ')}>
      <div className="lw-console-h">
        <span className="left">
          <span className="lights" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          {filename ? <span className="url">{filename}</span> : null}
        </span>
        {headerActions}
      </div>
      <div className="lw-code-tabs" role="tablist" aria-label={filename ?? 'Code'}>
        {tabs.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`lw-codetab-${t.id}`}
              aria-selected={selected}
              aria-controls={`lw-codepanel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`lw-codepanel-${current.id}`}
        aria-labelledby={`lw-codetab-${current.id}`}
        tabIndex={0}
      >
        <CodeSurface code={current.code} highlightedHtml={current.highlightedHtml} />
      </div>
    </div>
  );
}
