import type { RefObject } from "react";
export type ThemeMode = "light" | "dark" | "system";
export interface ThemeState { mode: ThemeMode; resolved: "light" | "dark"; setMode(m: ThemeMode): void; isDark: boolean; }
export function useTheme(): ThemeState;
export function useReveal(opts?: { threshold?: number; rootMargin?: string }): [RefObject<any>, boolean];
export function useSpotlight(): RefObject<any>;
export function useDeterministicCascade(opts?: { step?: number; max?: number; base?: number }): (i: number) => string;
export function useReducedMotion(): boolean;
export function animateCounter(el: HTMLElement | null, to: number, opts?: { from?: number; duration?: number; decimals?: number; format?: (n: number) => string }): () => void;
