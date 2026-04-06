// 이 파일은 포트폴리오의 핵심 작업물 섹션을 렌더링한다.
// 긴 프로젝트 데이터를 메타, 기능, 하이라이트, 문제 해결 사례로 나눠 읽기 쉬운 기사형 구조로 배치한다.
import type { Project } from "@/domain";
import SectionHeader from "@/components/ui/SectionHeader";

// 프로젝트 섹션 입력 속성 구조다.
type Props = {
  projects: readonly Project[];
};

/**
 * 프로젝트 목록을 기사형 아티클로 렌더링한다.
 * 입력은 프로젝트 데이터 배열이며, 반환값은 섹션 헤더와 프로젝트별 상세 블록 JSX다.
 * 부작용은 없고, 각 프로젝트의 `link`, `status`, `cause`, `bullets` 유무에 따라 일부 영역만 조건부로 노출된다.
 */
export default function Projects({ projects }: Props) {
  return (
    <section
      id="projects"
      className="px-6 md:px-10 max-w-[1400px] mx-auto py-24 md:py-32"
    >
      <SectionHeader
        index="(03) Projects"
        title="Selected Work"
        subtitle="2024 — 2025"
      />

      {/* 각 프로젝트 사이 여백을 크게 두어 하나의 케이스 스터디처럼 읽히도록 만든다. */}
      <div className="space-y-32 md:space-y-48">
        {projects.map((p) => (
          <article key={p.id} id={p.id} className="scroll-mt-24">
            {/* Title row */}
            {/* 프로젝트명과 기간을 크게 분리해 첫 스캔에서 핵심 메타가 바로 들어오게 한다. */}
            <header className="border-t border-border pt-8 mb-12">
              <div className="flex items-baseline justify-between gap-6 mb-6">
                <span className="text-xs font-mono text-muted-foreground">
                  / {p.index}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  {p.period}
                </span>
              </div>
              <h3 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-tight">
                {p.title}
                {p.status && (
                  <span className="ml-4 align-middle text-xs uppercase tracking-[0.2em] text-muted-foreground border border-border rounded-full px-3 py-1">
                    {p.status}
                  </span>
                )}
              </h3>
              <p className="mt-6 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
                {p.tagline}
              </p>
            </header>

            {/* Meta grid */}
            {/* 환경/팀/스택을 3개 패널로 끊어, 긴 본문 전에 프로젝트 맥락을 빠르게 요약한다. */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-border mb-px">
              <div className="md:col-span-3 bg-background p-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                  Environment
                </p>
                <ul className="text-sm space-y-1">
                  <li>{p.env.xcode}</li>
                  <li>{p.env.minIOS}</li>
                  <li>{p.env.swift}</li>
                </ul>
              </div>
              <div className="md:col-span-3 bg-background p-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                  Team
                </p>
                <p className="text-sm">{p.team}</p>
              </div>
              <div className="md:col-span-6 bg-background p-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                  Stack
                </p>
                <ul className="text-sm space-y-1">
                  {p.stack.map((s) => (
                    <li key={s.label}>
                      <span className="text-muted-foreground">{s.label}</span>{" "}
                      — {s.items}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Features */}
            {/* 기능은 균등 카드 그리드로 배치해 제품 범위를 한눈에 보여 준다. */}
            <div className="mt-16">
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-6">
                Core Features
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
                {p.features.map((f) => (
                  <div key={f.title} className="bg-background p-6">
                    <h4 className="text-base font-semibold mb-3">{f.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {f.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            {/* 하이라이트는 hover 반응을 넣어 정적인 텍스트 블록에 가벼운 인터랙션을 더한다. */}
            <div className="mt-16">
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-6">
                Highlights
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                {p.highlights.map((h) => (
                  <div
                    key={h.title}
                    className="bg-background p-6 hover:bg-muted transition-colors"
                  >
                    <h4 className="text-base font-semibold mb-2">{h.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {h.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Troubles */}
            {/* 문제 해결 사례는 기본적으로 첫 항목만 열어 두어 정보량을 제어하면서도 한 가지는 바로 읽히게 한다. */}
            <div className="mt-16">
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-6">
                Problem-Solving Cases
              </p>
              <div className="space-y-px bg-border">
                {p.troubles.map((t, i) => (
                  <details
                    key={t.title}
                    open={i === 0}
                    className="group bg-background"
                  >
                    <summary className="cursor-pointer list-none p-6 flex items-center justify-between gap-6 hover:bg-muted transition-colors">
                      <div className="flex items-baseline gap-4">
                        <span className="text-xs font-mono text-muted-foreground">
                          0{i + 1}
                        </span>
                        <span className="text-base md:text-lg font-medium">
                          {t.title}
                        </span>
                      </div>
                      <span className="text-muted-foreground group-open:rotate-45 transition-transform text-xl leading-none">
                        +
                      </span>
                    </summary>
                    {/* 문제/원인/해결을 열 단위로 분리해 기술 판단 근거를 스캔하기 쉽게 만든다. */}
                    <div className="px-6 pb-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm leading-relaxed">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                          문제
                        </p>
                        <p className="text-muted-foreground">{t.problem}</p>
                      </div>
                      {t.cause && (
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                            원인
                          </p>
                          <p className="text-muted-foreground">{t.cause}</p>
                        </div>
                      )}
                      <div className={t.cause ? "" : "md:col-span-2"}>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                          해결
                        </p>
                        <p>{t.solution}</p>
                        {t.bullets && (
                          <ul className="mt-3 space-y-1.5">
                            {t.bullets.map((b) => (
                              <li
                                key={b}
                                className="text-muted-foreground flex gap-2"
                              >
                                <span className="text-emerald-400">✓</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {p.link && (
              <div className="mt-12">
                <a
                  href={p.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm link-underline"
                >
                  ↗ {p.link.label}
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
