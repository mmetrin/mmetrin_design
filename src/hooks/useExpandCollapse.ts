import { useState, useRef, useCallback, useEffect } from 'react';

export const EXPAND_DURATION = 650; // ms — shared by CSS transitions and JS timers
export const EXPAND_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

/**
 * Manages expand/collapse state with smooth scroll compensation:
 * on collapse, tracks the trigger element's viewport position each frame
 * and scrolls to keep it stationary — no jerky jump.
 *
 * triggerRef: attach to the button/container that stays visible when collapsed.
 * reset: call when external state (e.g. filter change) should force collapse.
 */
export function useExpandCollapse() {
  const [expanded, setExpanded] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  // mirror state for RAF callbacks to avoid stale closure
  const expandedRef = useRef(false);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const cancelRaf = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const toggle = useCallback(() => {
    cancelRaf();

    if (expandedRef.current) {
      expandedRef.current = false;
      setExpanded(false);

      // Track trigger position each frame and compensate scroll so the button
      // stays in place while the content collapses beneath it.
      const trigger = triggerRef.current;
      if (trigger) {
        const targetY = trigger.getBoundingClientRect().top;
        const start = performance.now();

        const track = (now: number) => {
          const diff = trigger.getBoundingClientRect().top - targetY;
          if (diff !== 0) window.scrollBy({ top: diff, behavior: 'instant' });
          if (now - start < EXPAND_DURATION + 100) {
            rafRef.current = requestAnimationFrame(track);
          } else {
            rafRef.current = null;
          }
        };
        rafRef.current = requestAnimationFrame(track);
      }
    } else {
      expandedRef.current = true;
      setExpanded(true);
    }
  }, []);

  const reset = useCallback(() => {
    cancelRaf();
    expandedRef.current = false;
    setExpanded(false);
  }, []);

  const setExpandedState = useCallback((next: boolean) => {
    cancelRaf();
    expandedRef.current = next;
    setExpanded(next);
  }, []);

  return { expanded, toggle, triggerRef, reset, setExpandedState };
}
