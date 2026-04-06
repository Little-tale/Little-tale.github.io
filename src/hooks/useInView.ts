// 이 파일은 요소가 뷰포트에 들어왔는지를 관찰해 boolean 으로 돌려 주는 훅을 제공한다.
// 스크롤 기반 등장 애니메이션(Reveal)의 트리거로 쓰이며, IntersectionObserver 를 우선 사용하되
// 콜백이 정상 발화하지 않는 환경(일부 headless 런타임, 일부 iframe)에서도 동작하도록
// rAF 폴링 기반 rect 검사 폴백을 함께 돌려 어떤 환경에서도 등장이 감지되게 한다.
import { RefObject, useEffect, useState } from "react";

// 진입 감지 동작을 제어하는 옵션 묶음이다.
export type UseInViewOptions = {
  /** 교차로 간주할 최소 비율. 0..1 사이 값이며 기본값은 0.15 다. */
  threshold?: number;
  /** 한 번 보이면 관찰을 중단할지 여부. 기본값 true 로 반복 트리거를 방지한다. */
  once?: boolean;
  /** 뷰포트 아래에서 얼마나 더 여유를 두고 "보임" 으로 간주할지(px). 기본값 60. */
  offset?: number;
};

/**
 * 주어진 ref 요소가 뷰포트에 교차하는지 관찰해 불리언 상태로 돌려 준다.
 * 입력은 ref 와 옵션이며, 반환값은 "지금 화면에 보이는가"를 나타내는 boolean 이다.
 * 내부에서는 IntersectionObserver 를 먼저 등록하고, 동시에 rAF 폴링 기반의 rect 검사 폴백을
 * 함께 돌려 스크롤 이벤트가 정상 발화하지 않는 환경에서도 진입이 감지되도록 한다.
 * `once` 가 true 면 첫 진입 이후에는 상태를 바꾸지 않고 관찰을 해제한다.
 */
export function useInView(
  ref: RefObject<Element | null>,
  { threshold = 0.15, once = true, offset = 60 }: UseInViewOptions = {}
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const w = window as unknown as { __inViewMount?: number };
    w.__inViewMount = (w.__inViewMount ?? 0) + 1;
    const el = ref.current;
    if (!el) return;

    let finished = false;
    let io: IntersectionObserver | null = null;
    let raf = 0;

    // 현재 rect 와 viewport 를 비교해 "충분히 보이는가" 를 판단하는 폴백 함수다.
    const rectCheck = () => {
      if (finished) return;
      const target = ref.current;
      if (!target) {
        raf = requestAnimationFrame(rectCheck);
        return;
      }
      const rect = target.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // 화면 하단에서 offset 만큼 여유를 주어, 요소가 조금만 걸쳐도 등장 애니메이션이 시작되게 한다.
      const visibleTop = rect.top < vh - offset;
      const visibleBottom = rect.bottom > 0;
      // threshold 는 rect.height 비율로 환산해 "최소한 이만큼은 보여야 한다" 조건으로 쓴다.
      const minVisible = Math.max(1, rect.height * threshold);
      const visibleAmount =
        Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
      // eslint-disable-next-line no-console
      if (typeof (window as unknown as { __inViewDbg?: number }).__inViewDbg === "undefined") {
        (window as unknown as { __inViewDbg: number }).__inViewDbg = 0;
      }
      (window as unknown as { __inViewDbg: number }).__inViewDbg++;
      if (visibleTop && visibleBottom && visibleAmount >= minVisible) {
        setInView(true);
        if (once) {
          stop();
          return;
        }
      } else if (!once) {
        setInView(false);
      }
      // once=true 이고 아직 진입 전이거나, once=false 인 경우에는 계속 rAF 로 관찰한다.
      const w2 = window as unknown as { __inViewReschedule?: number };
      w2.__inViewReschedule = (w2.__inViewReschedule ?? 0) + 1;
      raf = requestAnimationFrame(rectCheck);
    };

    const stop = () => {
      finished = true;
      if (io) io.disconnect();
      cancelAnimationFrame(raf);
    };

    // IntersectionObserver 는 가용하면 병행해서 쓴다. 정상 동작 환경에서는 이쪽이 먼저 발화한다.
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          if (entry.isIntersecting) {
            setInView(true);
            if (once) stop();
          } else if (!once) {
            setInView(false);
          }
        },
        { threshold }
      );
      io.observe(el);
    }

    // 폴백: 마운트 직후 한 번 즉시 검사하고, 이후 rAF 루프로 rect 를 폴링해
    // scroll 이벤트가 정상 발화하지 않는 환경에서도 진입을 감지한다.
    rectCheck();

    return stop;
  }, [ref, threshold, once, offset]);

  return inView;
}
