import type { RefObject } from "react";
export type ThemeMode = "light" | "dark" | "system";
export interface ThemeState { mode: ThemeMode; resolved: "light" | "dark"; setMode(m: ThemeMode): void; isDark: boolean; }
/** The storage key the localStorage entry and the cookie both use. */
export declare const THEME_KEY: string;
/**
 * The `window` event `paint()` fires, carrying the chosen mode in `detail`.
 *
 * The theme has one source of truth (the document) and any number of views onto
 * it. Listen here to keep a second picker — or your own chrome — in step with a
 * change made anywhere else.
 */
export declare const THEME_EVENT: string;
/**
 * Apply a mode to `<html>` (class + data-theme). Returns whether dark resolved.
 * Also fires `THEME_EVENT` so every view onto the theme stays in step.
 */
export function paint(m: ThemeMode): boolean;
/**
 * Write the choice to localStorage AND the `lw-theme` cookie. The cookie is not
 * redundant: it is the only one of the two a server can read, so it is what lets
 * an SSR consumer emit `<html data-theme>` in the first byte instead of flashing.
 */
export function persist(m: ThemeMode): void;
export function useTheme(): ThemeState;
export function useReveal(opts?: { threshold?: number; rootMargin?: string }): [RefObject<any>, boolean];
export function useSpotlight(): RefObject<any>;
export function useDeterministicCascade(opts?: { step?: number; max?: number; base?: number }): (i: number) => string;
export function useReducedMotion(): boolean;
export function animateCounter(el: HTMLElement | null, to: number, opts?: { from?: number; duration?: number; decimals?: number; format?: (n: number) => string }): () => void;
