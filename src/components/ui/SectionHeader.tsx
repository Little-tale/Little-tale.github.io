// 이 파일은 각 섹션 상단의 공통 제목 패턴을 렌더링하는 UI 컴포넌트다.
// 인덱스, 큰 제목, 보조 문구를 동일한 리듬으로 맞춰 전체 페이지 타이포그래피를 통일한다.
// 섹션 헤더에 필요한 최소 텍스트 입력 구조다.
type Props = {
  index: string;
  title: string;
  subtitle?: string;
};

/**
 * 섹션 상단의 번호, 제목, 보조 문구를 공통 스타일로 렌더링한다.
 * 입력은 인덱스 문자열, 제목, 선택적 부제목이며 반환값은 한 섹션의 시각적 시작점을 만드는 JSX다.
 * 부작용은 없고, `subtitle`이 없을 때만 보조 텍스트 영역이 생략된다.
 */
export default function SectionHeader({ index, title, subtitle }: Props) {
  // 상단 구분선과 큰 제목을 묶어 다음 콘텐츠 덩어리의 시작을 강하게 보여 준다.
  return (
    <div className="border-t border-border pt-10 mb-16 md:mb-24">
      <div className="flex items-baseline justify-between gap-6">
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono">
          {index}
        </span>
        {subtitle && (
          <span className="hidden md:block text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {subtitle}
          </span>
        )}
      </div>
      <h2 className="mt-6 text-5xl md:text-7xl font-semibold tracking-[-0.03em] leading-[0.95]">
        {title}
      </h2>
    </div>
  );
}
