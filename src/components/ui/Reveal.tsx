// 이 파일은 스크롤로 요소가 뷰포트에 들어올 때 부드럽게 떠오르며 등장하는 래퍼 컴포넌트다.
// framer-motion을 사용하여 부드럽고 자연스러운 애니메이션(fade-up 등)을 적용한다.
import { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Reveal 래퍼의 외부 설정 입력들이다.
type Props = {
  children: ReactNode;
  /** 트랜지션 지연(ms). 같은 부모 안에서 여러 Reveal 을 stagger 시킬 때 사용한다. */
  delay?: number;
  /** 초기 translateY 거리(px). 값이 클수록 더 아래에서 올라온다. */
  distance?: number;
  /** 트랜지션 지속 시간(ms). */
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
 * framer-motion을 사용하여 더욱 자연스러운 애니메이션을 제공한다.
 */
export default function Reveal({
  children,
  delay = 0,
  distance = 30,
  duration = 800,
  once = true,
  threshold = 0.15,
  className = "",
  style,
}: Props) {
  const prefersReducedMotion = useReducedMotion();

  // 사용자가 애니메이션 축소를 선호하는 경우 애니메이션 없이 바로 표시한다.
  if (prefersReducedMotion) {
    return (
      <div className={className} style={{ ...style, opacity: 1, transform: "none" }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: threshold, margin: "0px 0px -50px 0px" }}
      transition={{
        duration: duration / 1000,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1] as const, // ease-out-expo
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
