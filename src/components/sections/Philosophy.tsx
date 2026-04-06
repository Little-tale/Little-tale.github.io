// 이 파일은 개발 철학 문장을 카드형 그리드로 보여 주는 섹션이다.
// 텍스트 위주의 내용이 지루해지지 않도록 번호와 hover 반응을 함께 사용한다.
import type { PhilosophyEntry } from "@/domain";
import SectionHeader from "@/components/ui/SectionHeader";

// 개발 철학 섹션 입력 속성 구조다.
type Props = {
  entries: readonly PhilosophyEntry[];
};

/**
 * 개발 철학 카드 목록을 2열 그리드로 렌더링한다.
 * 입력은 제목/본문을 가진 철학 항목 배열이며, 반환값은 섹션 헤더와 카드 그리드 JSX다.
 * 부작용은 없고, 배열 순서가 카드 번호 및 노출 순서에 직접 반영된다.
 */
export default function Philosophy({ entries }: Props) {
  return (
    <section
      id="philosophy"
      className="px-6 md:px-10 max-w-[1400px] mx-auto py-24 md:py-32"
    >
      <SectionHeader
        index="(02) Philosophy"
        title="개발 철학"
        subtitle="What I believe"
      />

      {/* gap-px + 배경색 조합으로 카드 사이를 실제 테두리보다 더 선명한 분할선처럼 보이게 한다. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
        {entries.map((p, i) => (
          <div
            key={p.title}
            className="bg-background p-8 md:p-12 hover:bg-muted transition-colors group"
          >
            <div className="flex items-start justify-between mb-6">
              <span className="text-xs font-mono text-muted-foreground">
                0{i + 1}
              </span>
              <span className="w-2 h-2 rounded-full bg-muted-foreground group-hover:bg-foreground transition-colors" />
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-6 leading-tight">
              {p.title}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
