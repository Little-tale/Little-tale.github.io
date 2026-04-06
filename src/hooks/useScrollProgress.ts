// 이 파일은 특정 요소가 스크롤 구간 안에서 얼마나 진행됐는지를 0..1 값으로 환산하는 훅을 제공한다.
// sticky 레이아웃처럼 일반적인 `rect.top` 계산이 통하지 않는 경우와, 요소가 아래에서 "접근"하는
// 상황까지 고려해 스크롤 연동 애니메이션의 기준값을 만든다.
import { RefObject, useEffect, useState } from "react";

/** 스크롤 진행도를 계산할 때 사용할 기준 모드. */
export type ScrollProgressMode = "pin" | "approach";

/**
 * 요소의 스크롤 진행도를 0..1 범위의 숫자로 환산한다.
 *
 * - `pin` 모드는 기존 동작이다. 가장 가까운 `[data-scroll-stage]` 조상(없으면 요소 자신)의
 *   상단이 뷰포트 위로 얼마나 밀려났는지를 기준으로 계산한다. 스크롤에 맞춰 sticky로 고정된
 *   요소에도 올바른 값이 나오도록 stage 기준으로 측정한다.
 * - `approach` 모드는 요소가 뷰포트 아래에서 위로 올라오는 동안의 진행도를 계산한다.
 *   요소 상단이 뷰포트 하단에 닿는 순간 0이고, `travel` 픽셀만큼 더 올라오면 1이 된다.
 *   "스크롤을 내릴수록 글자가 모인다" 같은 등장 연출에 쓰인다.
 *
 * 결과값은 항상 0 이상 1 이하로 clamp 되며, 스크롤/리사이즈 이벤트는 RAF 한 프레임으로 합쳐
 * 불필요한 연속 setState를 줄인다. effect는 이벤트 리스너와 예약된 RAF를 등록하고, 언마운트
 * 또는 의존성 변경 시 모두 정리한다.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  travel: number,
  mode: ScrollProgressMode = "pin"
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const compute = () => {
      const el = ref.current;
      if (!el) return;

      let p: number;
      if (mode === "approach") {
        // 뷰포트 하단에 요소 상단이 걸리는 순간 진행도 0, 거기서 travel 만큼 더 올라오면 1이 된다.
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        p = (vh - rect.top) / travel;
      } else {
        // sticky 요소는 자신의 top 값이 고정되므로, stage 기준으로 계산해야 스크롤 진행도가 실제로 변한다.
        const stage = el.closest(
          "[data-scroll-stage]"
        ) as HTMLElement | null;
        if (stage) {
          const sRect = stage.getBoundingClientRect();
          p = -sRect.top / travel;
        } else {
          const rect = el.getBoundingClientRect();
          p = -rect.top / travel;
        }
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
  }, [ref, travel, mode]);

  return progress;
}
