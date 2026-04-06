// 이 파일은 히어로 다음에 이어지는 짧은 소개와 CTA를 렌더링한다.
// 자기소개 문장과 프로젝트 이동 버튼을 한 줄 맥락으로 묶어 첫 액션을 유도한다.
// 인트로 섹션 입력 속성 구조다.
type Props = {
  intro: string;
  ctaHref?: string;
  ctaLabel?: string;
  ctaSubLabel?: string;
};

/**
 * 자기소개 문장과 대표 CTA 버튼을 렌더링한다.
 * 입력은 소개 문장과 선택적 링크/레이블이며, 반환값은 본문 진입 전에 놓이는 간결한 전환 섹션 JSX다.
 * 부작용은 없고, 기본값을 제공해 상위 컴포넌트가 최소 입력만 전달해도 동작한다.
 */
export default function Intro({
  intro,
  ctaHref = "#projects",
  ctaLabel = "작업물 보기",
  ctaSubLabel = "4 projects · Swift · TCA · Concurrency",
}: Props) {
  // 좌우 양 끝 배치를 사용해 소개 문장과 행동 버튼을 서로 다른 시선 흐름으로 분리한다.
  return (
    <section className="px-6 md:px-10 max-w-[1400px] mx-auto pt-20 pb-24 md:pt-32 md:pb-40">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 border-t border-border pt-10">
        <div className="space-y-2 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>{intro}</p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3 text-sm shrink-0">
          {/* 둥근 버튼과 회전하는 화살표로 다음 섹션 이동을 명확히 강조한다. */}
          <a
            href={ctaHref}
            className="group inline-flex items-center gap-3 border border-border rounded-full pl-5 pr-2 py-2 hover:bg-foreground hover:text-background transition-colors"
          >
            <span>{ctaLabel}</span>
            <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:rotate-45 transition-transform">
              →
            </span>
          </a>
          <span className="text-xs text-muted-foreground">{ctaSubLabel}</span>
        </div>
      </div>
    </section>
  );
}
