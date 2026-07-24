import type { KeyboardEvent, ReactElement } from 'react';
import { useTheme } from './use-theme';
import type { Theme } from './use-theme';
import { Sun, Moon, Auto } from './icons/index';

/* =============================================================================
   <ThemeToggle> — a segmented Light / Dark / System control.
   Renders `.lw-theme-toggle` with three `<button>` segments; the active segment
   carries aria-pressed="true" (the package CSS keys the active style off it).

   role="group" + aria-label so a screen reader announces the three buttons as
   one themed control. Roving tabindex: Tab lands on the active segment once,
   Arrow keys move between the three. Each is a real native <button>
   (keyboard-reachable, :focus-visible from the package CSS).
   ============================================================================= */

export type ThemeToggleProps = {
  /** Accessible label for the group. Default "Theme". */
  'aria-label'?: string;
  /** Show the leading icon on each segment. Default true. */
  showIcons?: boolean;
  /** Show the text label on each segment. Default true. */
  showLabels?: boolean;
  /** Extra classes on the `.lw-theme-toggle` shell. */
  className?: string;
};

const SEGMENTS: ReadonlyArray<{
  value: Theme;
  label: string;
  Icon: (p: { size?: number | string }) => ReactElement;
}> = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'system', label: 'System', Icon: Auto },
];

export function ThemeToggle({
  'aria-label': ariaLabel = 'Theme',
  showIcons = true,
  showLabels = true,
  className,
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const move = (e: KeyboardEvent<HTMLButtonElement>, delta: number) => {
    e.preventDefault();
    const root = e.currentTarget.parentElement;
    if (!root) return;
    const btns = Array.from(root.querySelectorAll<HTMLButtonElement>('button'));
    const idx = btns.indexOf(e.currentTarget);
    const next = btns[(idx + delta + btns.length) % btns.length];
    if (!next) return;
    // Drive selection from the segment's value (kept in data-lw-theme on the node).
    setTheme(next.getAttribute('data-lw-theme') as Theme);
    next.focus();
  };

  return (
    <div
      className={['lw-theme-toggle', className ?? ''].filter(Boolean).join(' ')}
      role="group"
      aria-label={ariaLabel}
    >
      {SEGMENTS.map(({ value, label, Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            data-lw-theme={value}
            aria-pressed={active}
            // Roving tabindex: the active segment is the one Tab reaches.
            tabIndex={active ? 0 : -1}
            onClick={() => setTheme(value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') move(e, 1);
              else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') move(e, -1);
              else if (e.key === 'Home') {
                e.preventDefault();
                const root = e.currentTarget.parentElement;
                const first = root?.querySelector<HTMLButtonElement>('button');
                first && setTheme(first.getAttribute('data-lw-theme') as Theme);
                first?.focus();
              } else if (e.key === 'End') {
                e.preventDefault();
                const root = e.currentTarget.parentElement;
                const all = root?.querySelectorAll<HTMLButtonElement>('button');
                const last = all?.[all.length - 1];
                last && setTheme(last.getAttribute('data-lw-theme') as Theme);
                last?.focus();
              }
            }}
          >
            {showIcons ? <Icon size={14} /> : null}
            {showLabels ? <span>{label}</span> : null}
          </button>
        );
      })}
    </div>
  );
}

export type { Theme } from './use-theme';
