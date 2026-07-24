import { useCallback, useEffect, useRef, useState } from 'react';

/* =============================================================================
   useDeterministicCascade — deterministic step-through playback for the hero
   validation console. Inspired by the site's live-validation panel, but
   factored into a reusable hook the consumer drives from .lw-run-controls.

   MOTION CONTRACT (mirrors reveal.ts / live-validation.tsx): the static state —
   SSR, no JS, reduced motion — is COMPLETE. stepIndex starts at `stepCount`
   (fully resolved) and stays there unless JS actively drives a replay. Motion
   only ever replays or embellishes; it never hides content from a reader who
   can't tolerate it.

   Deterministic, never random. The site's panel made the same choice: a
   compliance buyer needs the output to read as reproducible, not as a
   live-jittering dashboard. `run()` always plays the same 0→stepCount sequence.

   Controls:
     • run()     — rewind to 0, auto-advance to stepCount. Under reduced motion:
                   resolve to stepCount instantly (no rewind, no hiding).
     • step()    — advance one step; if already resolved, rewind to 0 first so a
                   second press re-watches the first step. Under reduced motion:
                   advance one without rewinding.
     • scrub(i)  — jump to an arbitrary step (clamped). Stops any auto-play.
     • restart() — stop + rewind to 0 (the "single restart seam"). Under reduced
                   motion: resolve to stepCount.
   ============================================================================= */

export type UseDeterministicCascadeOptions = {
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

export type UseDeterministicCascadeResult = {
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

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useDeterministicCascade(
  opts: UseDeterministicCascadeOptions,
): UseDeterministicCascadeResult {
  const {
    stepCount,
    restartKey,
    intervalMs = 700,
    respectReducedMotion = true,
    autoStart = false,
  } = opts;

  // Start COMPLETE — the static state is the correct state.
  const [stepIndex, setStepIndex] = useState<number>(stepCount);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduced = respectReducedMotion && prefersReducedMotion();

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Clamp helper that adapts to a changed stepCount (e.g. data swap).
  const clampStep = useCallback(
    (i: number): number => Math.max(0, Math.min(i, stepCount)),
    [stepCount],
  );

  const run = useCallback(() => {
    if (respectReducedMotion && prefersReducedMotion()) {
      // Resolves instantly; never hides intermediate state from a RM reader.
      clearTimer();
      setIsRunning(false);
      setStepIndex(stepCount);
      return;
    }
    clearTimer();
    // Rewind to the start, then advance on the interval until resolved.
    setStepIndex(0);
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setStepIndex((prev) => {
        const next = prev + 1;
        if (next >= stepCount) {
          if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setIsRunning(false);
          return stepCount;
        }
        return next;
      });
    }, intervalMs);
  }, [stepCount, intervalMs, clearTimer, respectReducedMotion]);

  const step = useCallback(() => {
    if (respectReducedMotion && prefersReducedMotion()) {
      // Discrete advance, no rewind/hiding.
      clearTimer();
      setIsRunning(false);
      setStepIndex((prev) => (prev >= stepCount ? stepCount : prev + 1));
      return;
    }
    clearTimer();
    setIsRunning(false);
    setStepIndex((prev) => (prev >= stepCount ? 0 : prev + 1));
  }, [stepCount, clearTimer, respectReducedMotion]);

  const scrub = useCallback(
    (index: number) => {
      clearTimer();
      setIsRunning(false);
      setStepIndex(clampStep(index));
    },
    [clampStep, clearTimer],
  );

  const restart = useCallback(() => {
    if (respectReducedMotion && prefersReducedMotion()) {
      clearTimer();
      setIsRunning(false);
      setStepIndex(stepCount);
      return;
    }
    clearTimer();
    setIsRunning(false);
    setStepIndex(0);
  }, [stepCount, clearTimer, respectReducedMotion]);

  // Keep stepIndex in range when stepCount changes (e.g. the consumer swapped
  // the dataset). If the new count already resolves the current index, leave it.
  useEffect(() => {
    setStepIndex((prev) => (prev > stepCount ? stepCount : prev));
  }, [stepCount]);

  // autoStart: play once on mount (and only once).
  const didAutoStart = useRef(false);
  useEffect(() => {
    if (autoStart && !didAutoStart.current) {
      didAutoStart.current = true;
      run();
    }
  }, [autoStart, run]);

  // The restart seam: a change to restartKey replays the cascade. Not fired on
  // the initial mount — only on an actual bump, so wiring it to an IO re-entry
  // behaves exactly like the site's triggerReplay.
  const firstRestartKey = useRef(true);
  useEffect(() => {
    if (firstRestartKey.current) {
      firstRestartKey.current = false;
      return;
    }
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restartKey]);

  // Always tear down the timer on unmount.
  useEffect(() => clearTimer, [clearTimer]);

  return {
    stepIndex,
    done: stepIndex >= stepCount,
    isRunning,
    run,
    step,
    scrub,
    restart,
    reducedMotion: reduced,
  };
}
