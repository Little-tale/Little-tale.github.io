// 이 파일은 특정 요소가 스크롤 구간 안에서 얼마나 진행됐는지를 0..1 값으로 환산하는 훅을 제공한다.
// sticky 레이아웃처럼 일반적인 `rect.top` 계산이 통하지 않는 경우까지 고려해 스크롤 연동 애니메이션의 기준값을 만든다.
import { RefObject, useEffect, useState } from "react";

/**
 * 요소 또는 가장 가까운 `data-scroll-stage` 조상을 기준으로 스크롤 진행도를 계산한다.
 * 입력은 측정 대상 ref와 100% 진행으로 간주할 스크롤 거리(px)이며, 반환값은 항상 0 이상 1 이하의 숫자다.
 * 스크롤/리사이즈 이벤트가 발생하면 다음 animation frame에서 값을 다시 계산해 불필요한 연속 setState를 줄인다.
 * effect는 이벤트 리스너와 예약된 RAF를 등록하고, 언마운트 또는 의존성 변경 시 모두 정리한다.
 *
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

      // sticky 요소는 자신의 top 값이 고정되므로, stage 기준으로 계산해야 스크롤 진행도가 실제로 변한다.
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
      // 스크롤 이벤트마다 즉시 계산하지 않고 RAF로 한 프레임에 합쳐 브라우저 부담을 낮춘다.
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
