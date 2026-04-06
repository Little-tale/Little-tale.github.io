// 이 파일은 첫 화면의 시각적 임팩트를 담당하는 히어로 섹션이다.
// 긴 sticky 스테이지 안에서 텍스트 분산 애니메이션과 현재 시각 표기를 조합해 포트폴리오의 첫인상을 만든다.
import SpreadText from "@/components/ui/SpreadText";
import { useClock } from "@/hooks";

// 히어로 섹션에 필요한 텍스트 입력 값들이다.
type Props = {
  name: string;
  role: string;
  tagline: string;
  locationLabel?: string;
};

/**
 * 이름, 역할, 태그라인을 대형 타이포그래피로 보여 주는 히어로 섹션을 렌더링한다.
 * 입력은 이름/역할/태그라인과 선택적 위치 라벨이며, 반환값은 sticky 기반 스크롤 연출 섹션 JSX다.
 * 내부적으로 `useClock`을 호출해 시각 문자열이 주기적으로 갱신되며, 그 변화에 따라 다시 렌더링된다.
 */
export default function Hero({
  name,
  role,
  tagline,
  locationLabel = "Seoul, KR",
}: Props) {
  const time = useClock();

  // 200vh 스테이지 안에서 sticky 컨테이너가 고정되며 텍스트 애니메이션 구간을 확보한다.
  return (
    <section id="top" data-scroll-stage className="relative h-[200vh]">
      {/* 실제 보이는 화면은 한 화면 높이로 고정하고, 상하 여백만 안쪽에서 조절한다. */}
      <div className="sticky top-0 h-screen flex flex-col pt-24 pb-10 px-6 md:px-10 max-w-[1400px] mx-auto overflow-hidden">
        {/* meta line */}
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground fade-up">
          <span>
            {role} — {locationLabel}
          </span>
          <span className="font-mono">{time || "—— KST"}</span>
        </div>

        {/* huge name */}
        {/* 중앙 정렬된 대형 타이포그래피 블록으로 이름과 역할을 포스터처럼 보여 준다. */}
        <div className="flex-1 flex flex-col items-center text-center justify-center py-10">
          <h1
            className="text-[22vw] md:text-[16vw] leading-[0.85] font-semibold tracking-[-0.04em] fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <SpreadText distance={3} rotation={10} travel={700} seed={3}>
              {name}
            </SpreadText>
          </h1>
          <h2
            className="mt-6 text-[14vw] md:text-[10vw] leading-[0.85] font-light tracking-[-0.03em] text-muted-foreground fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <SpreadText distance={4} rotation={12} travel={700} seed={11}>
              {role}
            </SpreadText>
          </h2>
          <p
            className="mt-8 text-sm md:text-base normal-case tracking-[0.3em] text-muted-foreground fade-up"
            style={{ animationDelay: "0.35s" }}
          >
            <SpreadText distance={20} rotation={20} travel={700} seed={23}>
              iOS · FLUTTER
            </SpreadText>
          </p>

          <p
            className="mt-14 max-w-2xl text-lg md:text-xl leading-relaxed shimmer-text fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <SpreadText distance={8} rotation={12} travel={700} seed={42}>
              {tagline}
            </SpreadText>
          </p>
        </div>

        {/* scroll hint */}
        {/* 하단 힌트는 다음 섹션으로 스크롤을 자연스럽게 유도한다. */}
        <div className="flex items-center justify-center text-xs uppercase tracking-[0.3em] text-muted-foreground fade-up">
          <span className="animate-pulse">↓ Scroll</span>
        </div>
      </div>
    </section>
  );
}
