"use client";

import {
  CSSProperties,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Props = {
  children: string;
  /** maximum vertical travel (in em of the current font-size) at full scatter */
  distance?: number;
  /** maximum rotation in degrees at full scatter */
  rotation?: number;
  /** how far the element must scroll past the top of the viewport to reach full scatter (px) */
  travel?: number;
  /** stable seed so each occurrence has its own letter pattern */
  seed?: number;
  className?: string;
  style?: CSSProperties;
};

function rand(i: number, seed: number): number {
  const x = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

/**
 * Y-only scatter text, modeled after bettinasosa.com hero:
 *   transform = matrix(cos, sin, -sin, cos, 0, ty)   // tx is always 0
 *
 * Each letter gets a stable pseudo-random unit direction. A single scroll
 * progress multiplies every letter's direction, so the whole word tears apart
 * vertically in unison as the user scrolls.
 */
export default function SpreadText({
  children,
  distance = 6,
  rotation = 15,
  travel = 600,
  seed = 1,
  className = "",
  style,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);

  const letters = useMemo(() => {
    const chars = Array.from(children);
    return chars.map((ch, i) => ({
      ch,
      dir: rand(i + 1, seed), // -1..1, used for both ty and rotation
      dirRot: rand(i + 1, seed + 91),
    }));
  }, [children, seed]);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const el = ref.current;
      if (!el) return;
      // Find the nearest sticky-scroll ancestor (if any). We measure progress
      // against the scroll container's own position, not the element's
      // getBoundingClientRect — because when the element is sticky-pinned, its
      // rect.top stays at 0 and progress would never advance.
      // Strategy: walk up until we find a section with data-scroll-stage,
      // otherwise fall back to the element's own top.
      let stage: HTMLElement | null = el.closest(
        "[data-scroll-stage]"
      ) as HTMLElement | null;
      let p: number;
      if (stage) {
        const sRect = stage.getBoundingClientRect();
        // progress is how far the stage has been scrolled through.
        // -sRect.top grows from 0 to (stage.height - viewportHeight).
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
  }, [travel]);

  // linear — bettinasosa feels linear in scroll; small ease only near start
  const eased = progress;

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        ...style,
      }}
    >
      {letters.map((l, i) => {
        const isSpace = l.ch === " ";
        const ty = l.dir * distance * eased;
        const rot = l.dirRot * rotation * eased;
        const letterOpacity = Math.max(0, 1 - progress * 1.4);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: `translate3d(0, ${ty}em, 0) rotate(${rot}deg)`,
              opacity: letterOpacity,
              willChange: "transform, opacity",
              whiteSpace: "pre",
            }}
          >
            {isSpace ? "\u00A0" : l.ch}
          </span>
        );
      })}
    </span>
  );
}
