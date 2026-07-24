import { useRef, type KeyboardEvent } from 'react';
import type { ReactNode } from 'react';
import { Play, Step as StepIcon, File } from './icons/index';

/* =============================================================================
   <Console> — a presentational shell for the hero validation console.
   Composes the package's console chrome + file tree + run controls into one
   accessible surface. It is PRESENTATIONAL: the site supplies the data (files,
   rows) and drives playback via useDeterministicCascade; this component only
   renders state and calls back.

   Layout:
     ┌ .lw-console.log ─────────────────────────────┐
     │ header: filename + actions                    │
     ├───────────────┬──────────────────────────────┤
     │ .lw-file-tree │ body (children = rows)        │
     │ (explorer)    │                               │
     ├───────────────┴──────────────────────────────┤
     │ .lw-run-controls (Run / Step / Scrub)         │
     └───────────────────────────────────────────────┘

   The file tree is a role="listbox" with roving-focus role="option" items and
   arrow-key / Home / End navigation; selection follows focus.
   ============================================================================= */

export type ConsoleFile = {
  id: string;
  label: string;
};

export type ConsoleProps = {
  /** Header filename / URL shown in the console chrome. */
  filename?: ReactNode;
  /** Right-side header actions (e.g. a replay button). */
  headerActions?: ReactNode;
  /** Accessible label for the whole console. */
  'aria-label'?: string;

  /** Explorer pane entries. When omitted, the file-tree pane is not rendered. */
  files?: ConsoleFile[];
  /** The currently-selected file id (controlled). */
  activeFileId?: string;
  /** Called when a file is selected (by click or keyboard). */
  onSelectFile?: (id: string) => void;
  /** Optional content per file row (e.g. a status dot). */
  renderFileMeta?: (file: ConsoleFile) => ReactNode;

  /** Body rows (the site supplies its validation rows here). */
  children?: ReactNode;

  // ---- Run controls --------------------------------------------------------
  /** Called when Run is pressed. Omit to hide the whole run-controls row. */
  onRun?: () => void;
  /** Called when Step is pressed. Requires onRun to also be present. */
  onStep?: () => void;
  /** Total steps for the scrubber. */
  stepCount?: number;
  /** Current step for the scrubber + label. */
  stepIndex?: number;
  /** Called when the scrubber moves. */
  onScrub?: (index: number) => void;
  /** Whether playback is auto-running (drives Run button aria state). */
  isRunning?: boolean;
  /** Label for the Run button. Default "Run". */
  runLabel?: string;
  /** Label for the Step button. Default "Step". */
  stepLabel?: string;

  className?: string;
};

export function Console({
  filename,
  headerActions,
  'aria-label': ariaLabel,
  files,
  activeFileId,
  onSelectFile,
  renderFileMeta,
  children,
  onRun,
  onStep,
  stepCount = 0,
  stepIndex = 0,
  onScrub,
  isRunning = false,
  runLabel = 'Run',
  stepLabel = 'Step',
  className,
}: ConsoleProps) {
  const showRunRow = typeof onRun === 'function';
  const stepClamped = Math.max(0, Math.min(stepIndex, stepCount));

  return (
    <div
      className={['lw-console', 'log', className ?? ''].filter(Boolean).join(' ')}
      role="group"
      aria-label={ariaLabel ?? (typeof filename === 'string' ? filename : 'Validation console')}
    >
      {(filename || headerActions) && (
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
      )}

      <div className="lw-console-body" style={bodyStyle(files != null)}>
        {files != null && (
          <FileTree
            files={files}
            activeId={activeFileId}
            onSelect={onSelectFile}
            renderMeta={renderFileMeta}
          />
        )}
        <div className="lw-console-rows" style={{ flex: 1, minWidth: 0 }}>
          {children}
        </div>
      </div>

      {showRunRow && (
        <div className="lw-console-foot">
          <div className="lw-run-controls">
            <button
              type="button"
              className="lw-btn lw-btn-brand"
              onClick={onRun}
              aria-pressed={isRunning}
            >
              <Play size={14} />
              <span>{runLabel}</span>
            </button>
            {typeof onStep === 'function' && (
              <button type="button" className="lw-btn lw-btn-ghost" onClick={onStep}>
                <StepIcon size={14} />
                <span>{stepLabel}</span>
              </button>
            )}
            {typeof onScrub === 'function' && stepCount > 0 && (
              <>
                <input
                  type="range"
                  min={0}
                  max={stepCount}
                  value={stepClamped}
                  aria-label={`Step ${stepClamped} of ${stepCount}`}
                  onChange={(e) => onScrub(Number(e.target.value))}
                />
                <span
                  className="lw-console-step"
                  style={{ fontFamily: 'var(--lw-font-mono)', fontSize: 11 }}
                  aria-hidden="true"
                >
                  {stepClamped}/{stepCount}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function bodyStyle(hasTree: boolean): React.CSSProperties {
  return hasTree
    ? { display: 'flex', alignItems: 'stretch', gap: 0 }
    : { display: 'block' };
}

/* ---- File tree (role=listbox) ---------------------------------------------- */

function FileTree({
  files,
  activeId,
  onSelect,
  renderMeta,
}: {
  files: ConsoleFile[];
  activeId?: string;
  onSelect?: (id: string) => void;
  renderMeta?: (f: ConsoleFile) => ReactNode;
}) {
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  const focusAt = (i: number) => {
    const idx = (i + files.length) % files.length;
    const f = files[idx];
    onSelect?.(f.id);
    itemRefs.current[idx]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLLIElement>, i: number) => {
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        focusAt(i + 1);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        focusAt(i - 1);
        break;
      case 'Home':
        e.preventDefault();
        focusAt(0);
        break;
      case 'End':
        e.preventDefault();
        focusAt(files.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onSelect?.(files[i].id);
        break;
      default:
        break;
    }
  };

  return (
    <ul
      className="lw-file-tree"
      role="listbox"
      aria-label="Documents"
      style={{ minWidth: 200, maxWidth: 260, flex: '0 0 auto' }}
    >
      {files.map((f, i) => {
          const selected = f.id === activeId;
          return (
            <li
              key={f.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              role="option"
              aria-selected={selected}
              data-active={selected ? '' : undefined}
              tabIndex={selected ? 0 : -1}
              onClick={() => onSelect?.(f.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <File size={13} />
              <span style={{ flex: 1, minWidth: 0 }}>{f.label}</span>
              {renderMeta?.(f)}
            </li>
          );
        })}
    </ul>
  );
}
