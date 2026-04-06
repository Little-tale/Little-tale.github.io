// 이 파일은 각 섹션 상단의 공통 제목 패턴을 렌더링하는 UI 컴포넌트다.
// 인덱스, 큰 제목, 보조 문구를 동일한 리듬으로 맞춰 전체 페이지 타이포그래피를 통일한다.
// 스크롤 진입 시 자연스럽게 떠오르는 reveal 애니메이션이 기본으로 들어가 있다.
import { useRef } from "react";
import { useInView } from "@/hooks";

// 섹션 헤더에 필요한 최소 텍스트 입력 구조다.
type Props = {
  index: string;
  title: string;
  subtitle?: string;
};

/**
 * 섹션 상단의 번호, 제목, 보조 문구를 공통 스타일로 렌더링한다.
 * 입력은 인덱스 문자열, 제목, 선택적 부제목이며 반환값은 한 섹션의 시각적 시작점을 만드는 JSX다.
 * 내부에서는 `useInView` 로 뷰포트 진입 여부를 관찰해, 인덱스/제목이 순차적으로 떠오르는 stagger 연출을 만든다.
 * `subtitle` 이 없을 때만 보조 텍스트 영역이 생략된다.
 */
export default function SectionHeader({ index, title, subtitle }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { threshold: 0.2 });

  // 부드러운 감속 커브와 길이 있는 duration 을 조합해 섹션이 "자리잡는" 느낌을 준다.
  const easing = "cubic-bezier(0.22, 1, 0.36, 1)";
  const baseStyle = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translate3d(0,0,0)" : "translate3d(0,24px,0)",
    transition: `opacity 900ms ${easing} ${delay}ms, transform 900ms ${easing} ${delay}ms`,
    willChange: "opacity, transform",
  });

  // 상단 구분선과 큰 제목을 묶어 다음 콘텐츠 덩어리의 시작을 강하게 보여 준다.
  return (
    <div
      ref={ref}
      className="border-t border-border pt-10 mb-16 md:mb-24"
      style={{
        // 구분선 자체는 얇게 흐려 들어오며, 선 아래 텍스트가 순차적으로 올라온다.
        borderTopColor: visible ? undefined : "transparent",
        transition: `border-color 900ms ${easing}`,
      }}
    >
      <div className="flex items-baseline justify-between gap-6">
        <span
          className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono"
          style={baseStyle(0)}
        >
          {index}
        </span>
        {subtitle && (
          <span
            className="hidden md:block text-xs uppercase tracking-[0.25em] text-muted-foreground"
            style={baseStyle(80)}
          >
            {subtitle}
          </span>
        )}
      </div>
      <h2
        className="mt-6 text-5xl md:text-7xl font-semibold tracking-[-0.03em] leading-[0.95]"
        style={baseStyle(160)}
      >
        {title}
      </h2>
    </div>
  );
}
