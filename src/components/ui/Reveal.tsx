// 이 파일은 스크롤로 요소가 뷰포트에 들어올 때 부드럽게 떠오르며 등장하는 래퍼 컴포넌트다.
// 내부적으로 `useInView` 훅으로 진입 시점을 감지하고, opacity + translateY 트랜지션으로 fade-up 연출을 만든다.
import { CSSProperties, ReactNode, useRef } from "react";
import { useInView } from "@/hooks";

// Reveal 래퍼의 외부 설정 입력들이다.
type Props = {
  children: ReactNode;
  /** 트랜지션 지연(ms). 같은 부모 안에서 여러 Reveal 을 stagger 시킬 때 사용한다. */
  delay?: number;
  /** 초기 translateY 거리(px). 값이 클수록 더 아래에서 올라온다. */
  distance?: number;
  /** 트랜지션 지속 시간(ms). 기본 800ms 이며 섹션 분위기에 따라 늘리고 줄인다. */
  duration?: number;
  /** 한 번 보이면 상태를 고정할지 여부. 기본 true 로 반복 재생을 막는다. */
  once?: boolean;
  /** IntersectionObserver threshold. 기본 0.15. */
  threshold?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * 자식 요소를 감싸, 뷰포트 진입 시 fade + slide-up 애니메이션을 적용해 렌더링한다.
 * 입력은 등장 타이밍·거리·지속 시간 같은 연출 옵션과 children 이며, 반환값은 래퍼 `div` JSX다.
 * 부작용은 한 IntersectionObserver 구독이며, 언마운트 시 자동 해제된다.
 * 같은 부모 안에서 delay 를 단계별로 주면 순차 등장(stagger) 효과를 만들 수 있다.
 */
export default function Reveal({
  children,
  delay = 0,
  distance = 24,
  duration = 800,
  once = true,
  threshold = 0.15,
  className = "",
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { threshold, once });
  // threshold 옵션은 Reveal 외부에서 세밀하게 조절할 수 있도록 그대로 전달한다.

  // cubic-bezier(0.22, 1, 0.36, 1) 은 "ease-out-expo" 에 가까운 부드러운 감속 곡선이다.
  const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translate3d(0, 0, 0)"
          : `translate3d(0, ${distance}px, 0)`,
        transition: `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
