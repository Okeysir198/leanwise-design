/* =============================================================================
   @leanwise/design/react — the React component layer. Source; tsup compiles it
   to dist/react. Unversioned on purpose: it ships with the package, so a version
   pinned in this header only ever goes stale (it read "v0.6.0" through v0.9.0).

   These components render the `.lw-*` classes from lw.css; they do NOT bundle
   CSS. Import the stylesheet once at your app root:
     import '@leanwise/design/lw.css'
   Then mount the reveal/spotlight drivers once:
     import { useReveal, useSpotlight } from '@leanwise/design/react'
   ============================================================================= */

// Primitives ------------------------------------------------------------------
export { Button } from './button';
export type { ButtonProps, ButtonVariant } from './button';

export { Eyebrow } from './eyebrow';
export type { EyebrowProps } from './eyebrow';

export { Card } from './card';
export type { CardProps } from './card';

// Theme -----------------------------------------------------------------------
export { ThemeToggle } from './theme-toggle';
export type { ThemeToggleProps } from './theme-toggle';
export { useTheme } from './use-theme';
export type { Theme, ResolvedTheme, UseThemeResult } from './use-theme';

// Code surfaces ---------------------------------------------------------------
export { CodeBlock } from './code-block';
export type { CodeBlockProps, CodeTab } from './code-block';

// Console ---------------------------------------------------------------------
export { Console } from './console';
export type { ConsoleProps, ConsoleFile } from './console';

// Marketing cards -------------------------------------------------------------
export { StoryCard } from './story-card';
export type {
  StoryCardProps,
  StoryStatus,
  StoryQuote,
} from './story-card';

export { FeatureGrid } from './feature-grid';
export type { FeatureGridProps, Feature } from './feature-grid';

export { LogoRail } from './logo-rail';
export type { LogoRailProps, LogoItem } from './logo-rail';

// Icons -----------------------------------------------------------------------
export {
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
  Icon,
} from './icons/index';
export type { IconProps } from './icons/index';

// Hooks -----------------------------------------------------------------------
export { useReveal } from './hooks/use-reveal';
export type { UseRevealOptions } from './hooks/use-reveal';

export { useSpotlight } from './hooks/use-spotlight';
export type { UseSpotlightOptions } from './hooks/use-spotlight';

export { useDeterministicCascade } from './hooks/use-deterministic-cascade';
export type {
  UseDeterministicCascadeOptions,
  UseDeterministicCascadeResult,
} from './hooks/use-deterministic-cascade';
