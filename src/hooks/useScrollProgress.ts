import { RefObject, useEffect, useState } from "react";

/**
 * Tracks scroll progress (0..1) of an element relative to either its nearest
 * `[data-scroll-stage]` ancestor or its own top, over `travel` pixels.
 *
 * For sticky-pinned elements, progress is measured against the stage's own
 * bounding rect rather than the element's, because a pinned element's
 * `rect.top` stays at 0 and would never advance.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  travel: number
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const compute = () => {
      const el = ref.current;
      if (!el) return;

      const stage = el.closest(
        "[data-scroll-stage]"
      ) as HTMLElement | null;

      let p: number;
      if (stage) {
        const sRect = stage.getBoundingClientRect();
        p = -sRect.top / travel;
      } else {
        const rect = el.getBoundingClientRect();
        p = -rect.top / travel;
      }
      setProgress(Math.max(0, Math.min(1, p)));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, travel]);

  return progress;
}
