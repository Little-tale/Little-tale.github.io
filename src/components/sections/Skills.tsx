// 이 파일은 기술 스택 카테고리와 하단 마키 텍스트를 렌더링하는 섹션이다.
// 정적인 태그 목록과 반복 애니메이션을 함께 사용해 기술 폭과 시각적 리듬을 동시에 보여 준다.
import type { SkillCategory } from "@/domain";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

// 스킬 섹션 입력 속성 구조다.
type Props = {
  categories: readonly SkillCategory[];
};

/**
 * 기술 스택 카테고리 목록과 반복 마키 텍스트를 렌더링한다.
 * 입력은 카테고리 배열이며, 반환값은 카드형 스택 목록과 하단 흐르는 텍스트를 포함한 섹션 JSX다.
 * 내부에서는 모든 스킬명을 평탄화해 마키 데이터로 재사용하며, 입력 배열이 바뀌면 그 결과도 함께 갱신된다.
 */
export default function Skills({ categories }: Props) {
  // 카테고리별 태그를 한 번 더 펼쳐 마키 트랙에서 동일 데이터를 반복 사용한다.
  const allSkills = categories.flatMap((c) => c.items);

  return (
    <section
      id="skills"
      className="px-6 md:px-10 max-w-[1400px] mx-auto py-24 md:py-32"
    >
      <SectionHeader
        index="(05) Skills"
        title="Toolkit"
        subtitle="Tech Stack"
      />

      {/* 상단은 카테고리별 태그 카드, 하단은 전체 기술을 흐르게 보여 주는 대비 구조다. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border mb-16">
        {categories.map((c, i) => (
          <Reveal key={c.name} delay={i * 90} className="bg-background p-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-5">
              {c.name}
            </p>
            <ul className="flex flex-wrap gap-2">
              {c.items.map((s) => (
                <li
                  key={s}
                  className="text-sm border border-border rounded-full px-4 py-1.5 hover:bg-foreground hover:text-background transition-colors"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      {/* marquee */}
      {/* 동일 배열을 두 번 이어 붙여 끊김 없는 무한 마키처럼 보이게 만든다. */}
      <div className="overflow-hidden border-y border-border py-8 -mx-6 md:-mx-10">
        <div className="marquee-track flex gap-12 whitespace-nowrap">
          {[...allSkills, ...allSkills].map((s, i) => (
            <span
              key={i}
              className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-muted-foreground"
            >
              {s}
              <span className="mx-12 text-border">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
