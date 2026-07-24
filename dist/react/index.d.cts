import * as react from 'react';
import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes, HTMLAttributes, ElementType, CSSProperties, SVGProps } from 'react';

type ButtonVariant = 'primary' | 'brand' | 'ink' | 'ghost' | 'link';
type CommonProps = {
    /** Visual variant. Default `primary`. */
    variant?: ButtonVariant;
    /** Appends an animated trailing arrow (`<span class="arrow">→</span>`). */
    arrow?: boolean;
    className?: string;
    children?: ReactNode;
};
type ButtonProps = CommonProps & (({
    as?: 'button';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>) | ({
    as: 'a';
    href?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps>));
declare const Button: react.ForwardRefExoticComponent<ButtonProps & react.RefAttributes<HTMLElement>>;

type EyebrowProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    /** Use the faint tier (`.lw-eyebrow.muted`) — for secondary section labels. */
    muted?: boolean;
    children?: ReactNode;
};
declare function Eyebrow({ muted, className, children, ...rest }: EyebrowProps): react.JSX.Element;

type CardProps = HTMLAttributes<HTMLElement> & {
    /** Brand border-glow on hover (`.lw-card-glow`). */
    glow?: boolean;
    /** Cursor spotlight on hover (`.lw-spotlight`). */
    spotlight?: boolean;
    /** Lift + border emphasis on hover (`.lw-card.hover`). */
    hover?: boolean;
    /** Render as a different element. Default `div`. */
    as?: ElementType;
    children?: ReactNode;
};
declare function Card({ glow, spotlight, hover, as: Tag, className, children, ...rest }: CardProps): react.JSX.Element;

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';
type UseThemeResult = {
    /** The user's stored preference. */
    theme: Theme;
    /** The actual applied theme (system → light/dark resolved). */
    resolvedTheme: ResolvedTheme;
    /** True when the stored preference is `system`. */
    isSystem: boolean;
    /** Set and persist a new preference. */
    setTheme: (theme: Theme) => void;
    /** Convenience: cycle system → light → dark → system. */
    toggle: () => void;
};
declare function useTheme(): UseThemeResult;

type ThemeToggleProps = {
    /** Accessible label for the group. Default "Theme". */
    'aria-label'?: string;
    /** Show the leading icon on each segment. Default true. */
    showIcons?: boolean;
    /** Show the text label on each segment. Default true. */
    showLabels?: boolean;
    /** Extra classes on the `.lw-theme-toggle` shell. */
    className?: string;
};
declare function ThemeToggle({ 'aria-label': ariaLabel, showIcons, showLabels, className, }: ThemeToggleProps): react.JSX.Element;

type CodeTab = {
    id: string;
    label: string;
    code: string;
    lang?: string;
    /** Pre-highlighted HTML for this tab (overrides `code` rendering). */
    highlightedHtml?: string;
};
type CodeBlockProps = {
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
declare function CodeBlock({ code, lang, highlightedHtml, filename, headerActions, tabs, className, }: CodeBlockProps): react.JSX.Element;

type ConsoleFile = {
    id: string;
    label: string;
};
type ConsoleProps = {
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
declare function Console({ filename, headerActions, 'aria-label': ariaLabel, files, activeFileId, onSelectFile, renderFileMeta, children, onRun, onStep, stepCount, stepIndex, onScrub, isRunning, runLabel, stepLabel, className, }: ConsoleProps): react.JSX.Element;

type StoryStatus = 'live' | 'pilot';
type StoryQuote = {
    /** The verbatim quote. All three fields must be present to render. */
    quote: string;
    /** The person attribution (e.g. "Nguyen Van A"). */
    person: string;
    /** The role/title (e.g. "Quality Lead, TALIMEX"). */
    role: string;
};
type StoryCardProps = {
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
    /** Extra classes on the card (e.g. "lw-story" for the package's story layout). */
    className?: string;
    /** Click handler (use with href for analytics, etc.). */
    onClick?: () => void;
};
declare function StoryCard({ company, industry, description, mark, monogramName, status, statusLabel, quote, kpi, kpiSub, href, className, onClick, }: StoryCardProps): react.JSX.Element;

type Feature = {
    /** Stable key (also drives the mono index when `num` is absent). */
    id?: string;
    /** Inline-SVG icon node (see ./icons). */
    icon?: ReactNode;
    /** Optional mono index label (e.g. "01") — shown when `icon` is absent. */
    num?: string;
    title: ReactNode;
    body: ReactNode;
};
type FeatureGridProps = {
    items: readonly Feature[];
    /** Per-instance grid overrides (e.g. a fixed column count). */
    style?: CSSProperties;
    /** Extra classes (e.g. a page-scoped override). */
    className?: string;
    /** Render each card as a spotlight (cursor highlight). Default true. */
    spotlight?: boolean;
};
declare function FeatureGrid({ items, style, className, spotlight, }: FeatureGridProps): react.JSX.Element;

type LogoItem = {
    id: string;
    name: string;
    /** The logo node. Omit to render the name typeset in mono. */
    mark?: ReactNode;
    /** Optional href — wraps the cell in a link. */
    href?: string;
};
type LogoRailProps = {
    items: readonly LogoItem[];
    /** Marquee scroll. Default true; false renders a static wrapping wall. */
    marquee?: boolean;
    /** Extra classes. */
    className?: string;
    /** Accessible label for the rail. Default "Customers". */
    'aria-label'?: string;
};
declare function LogoRail({ items, marquee, className, 'aria-label': ariaLabel, }: LogoRailProps): react.JSX.Element;

type IconProps = Omit<SVGProps<SVGSVGElement>, 'ref'> & {
    /** Square size (sets both width and height). Default 16. */
    size?: number | string;
    /** When provided, the svg becomes role="img" with a <title> and is NOT aria-hidden. */
    title?: string;
};
declare function Check(props: IconProps): react.JSX.Element;
declare function Warning(props: IconProps): react.JSX.Element;
/** "Failed" — an X mark. */
declare function Cross(props: IconProps): react.JSX.Element;
/** "Cannot check" — a minus / dash. */
declare function Dash(props: IconProps): react.JSX.Element;
declare function Sun(props: IconProps): react.JSX.Element;
declare function Moon(props: IconProps): react.JSX.Element;
/** "System" — a contrast circle (half-filled). */
declare function Auto(props: IconProps): react.JSX.Element;
/** Solid play triangle (Run). */
declare function Play(props: IconProps): react.JSX.Element;
/** Skip-to-next (Step) — play triangle + trailing bar. */
declare function Step(props: IconProps): react.JSX.Element;
declare function File(props: IconProps): react.JSX.Element;
declare function ChevronRight(props: IconProps): react.JSX.Element;
/** Namespace access: `Icon.Check`, `Icon.Play`, etc. */
declare const Icon: {
    Check: typeof Check;
    Warning: typeof Warning;
    Cross: typeof Cross;
    Dash: typeof Dash;
    Sun: typeof Sun;
    Moon: typeof Moon;
    Auto: typeof Auto;
    Play: typeof Play;
    Step: typeof Step;
    File: typeof File;
    ChevronRight: typeof ChevronRight;
};

type UseRevealOptions = {
    /** Selector for reveal targets. Default `.lw-reveal:not(.in)`. */
    selector?: string;
    /** Dependency that re-runs the observer (e.g. a pathname or data array). */
    dep?: unknown;
    /** Safety-net timeout (ms) that force-shows any unrevealed target. Default 1500. */
    fallbackMs?: number;
    /** rootMargin for the observer. Default `0px 0px -10% 0px`. */
    rootMargin?: string;
    /** threshold for the observer. Default 0.05. */
    threshold?: number;
};
declare function useReveal(opts?: UseRevealOptions): void;

type UseSpotlightOptions = {
    /** Selector for spotlight targets. Default `.lw-spotlight`. */
    selector?: string;
};
declare function useSpotlight(opts?: UseSpotlightOptions): void;

type UseDeterministicCascadeOptions = {
    /** Total steps. stepIndex ranges 0..stepCount; stepCount === fully resolved. */
    stepCount: number;
    /**
     * The single restart seam. Bump this value (e.g. from an IntersectionObserver
     * re-entry callback) to replay the cascade from step 0. Not triggered on the
     * initial mount — wire `autoStart` for that.
     */
    restartKey?: number;
    /** Auto-advance interval in ms. Default 700. */
    intervalMs?: number;
    /**
     * When true (default) and the reader prefers reduced motion, the cascade
     * starts and stays resolved, and run()/restart() resolve instantly instead of
     * replaying. Manual step()/scrub() still function (they are discrete user
     * actions, not motion).
     */
    respectReducedMotion?: boolean;
    /** Start auto-playing on mount. Default false (static = complete). */
    autoStart?: boolean;
};
type UseDeterministicCascadeResult = {
    /** Current step index, 0..stepCount. Equals stepCount when fully resolved. */
    stepIndex: number;
    /** True when stepIndex >= stepCount (the complete static state). */
    done: boolean;
    /** True while auto-playing toward stepCount. */
    isRunning: boolean;
    /** Rewind to 0 and auto-play to stepCount (no-op-safe under reduced motion). */
    run: () => void;
    /** Advance one step (rewinds to 0 first if already resolved). */
    step: () => void;
    /** Jump to an arbitrary step index, clamped to [0, stepCount]. Stops playback. */
    scrub: (index: number) => void;
    /** Rewind to step 0 and stop (the restart seam). Resolves instantly under RM. */
    restart: () => void;
    /** Whether reduced motion is currently in effect. */
    reducedMotion: boolean;
};
declare function useDeterministicCascade(opts: UseDeterministicCascadeOptions): UseDeterministicCascadeResult;

export { Auto, Button, type ButtonProps, type ButtonVariant, Card, type CardProps, Check, ChevronRight, CodeBlock, type CodeBlockProps, type CodeTab, Console, type ConsoleFile, type ConsoleProps, Cross, Dash, Eyebrow, type EyebrowProps, type Feature, FeatureGrid, type FeatureGridProps, File, Icon, type IconProps, type LogoItem, LogoRail, type LogoRailProps, Moon, Play, type ResolvedTheme, Step, StoryCard, type StoryCardProps, type StoryQuote, type StoryStatus, Sun, type Theme, ThemeToggle, type ThemeToggleProps, type UseDeterministicCascadeOptions, type UseDeterministicCascadeResult, type UseRevealOptions, type UseSpotlightOptions, type UseThemeResult, Warning, useDeterministicCascade, useReveal, useSpotlight, useTheme };
