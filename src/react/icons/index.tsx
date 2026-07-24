/* =============================================================================
   Inline-SVG icon set.
   Each icon is a named React component: currentColor stroke, 24×24 viewBox,
   width/height via `size` (default 16). Decorative by default (aria-hidden);
   pass a `title` to make it a labelled, focusable role="img".
   Never raw hex; never imported CSS. Stroke-based to match the mono technical voice.
   ============================================================================= */
import type { SVGProps } from 'react';

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'ref'> & {
  /** Square size (sets both width and height). Default 16. */
  size?: number | string;
  /** When provided, the svg becomes role="img" with a <title> and is NOT aria-hidden. */
  title?: string;
};

function base({ size = 16, title, ...rest }: IconProps): {
  svg: SVGProps<SVGSVGElement>;
  titleId?: string;
  title?: string;
} {
  // Stable id derived from the title text so SSR and client agree (React 19's
  // useId would force a hook; a content hash keeps these stateless components).
  const titleId = title ? `lw-icon-${slug(title)}` : undefined;
  const svg: SVGProps<SVGSVGElement> = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': title ? undefined : true,
    role: title ? 'img' : undefined,
    'aria-labelledby': titleId,
    focusable: title ? false : undefined,
    ...rest,
  };
  return { svg, titleId, title };
}

function slug(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

export function Check(props: IconProps) {
  const { svg, titleId, title } = base(props);
  return (
    <svg {...svg}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function Warning(props: IconProps) {
  const { svg, titleId, title } = base(props);
  return (
    <svg {...svg}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

/** "Failed" — an X mark. */
export function Cross(props: IconProps) {
  const { svg, titleId, title } = base(props);
  return (
    <svg {...svg}>
      {title ? <title id={titleId}>{title}</title> : null}
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/** "Cannot check" — a minus / dash. */
export function Dash(props: IconProps) {
  const { svg, titleId, title } = base(props);
  return (
    <svg {...svg}>
      {title ? <title id={titleId}>{title}</title> : null}
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function Sun(props: IconProps) {
  const { svg, titleId, title } = base(props);
  return (
    <svg {...svg}>
      {title ? <title id={titleId}>{title}</title> : null}
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

export function Moon(props: IconProps) {
  const { svg, titleId, title } = base(props);
  return (
    <svg {...svg}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
    </svg>
  );
}

/** "System" — a contrast circle (half-filled). */
export function Auto(props: IconProps) {
  const { svg, titleId, title } = base(props);
  return (
    <svg {...svg}>
      {title ? <title id={titleId}>{title}</title> : null}
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Solid play triangle (Run). */
export function Play(props: IconProps) {
  const { svg, titleId, title } = base(props);
  return (
    <svg {...svg} fill="currentColor" stroke="none">
      {title ? <title id={titleId}>{title}</title> : null}
      <polygon points="6 3 20 12 6 21" />
    </svg>
  );
}

/** Skip-to-next (Step) — play triangle + trailing bar. */
export function Step(props: IconProps) {
  const { svg, titleId, title } = base(props);
  return (
    <svg {...svg}>
      {title ? <title id={titleId}>{title}</title> : null}
      <polygon points="5 4 15 12 5 20" fill="currentColor" stroke="none" />
      <line x1="19" y1="5" x2="19" y2="19" />
    </svg>
  );
}

export function File(props: IconProps) {
  const { svg, titleId, title } = base(props);
  return (
    <svg {...svg}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

export function ChevronRight(props: IconProps) {
  const { svg, titleId, title } = base(props);
  return (
    <svg {...svg}>
      {title ? <title id={titleId}>{title}</title> : null}
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/** Namespace access: `Icon.Check`, `Icon.Play`, etc. */
export const Icon = {
  Check,
  Warning,
  Cross,
  Dash,
  Sun,
  Moon,
  Auto,
  Play,
  Step,
  File,
  ChevronRight,
};
