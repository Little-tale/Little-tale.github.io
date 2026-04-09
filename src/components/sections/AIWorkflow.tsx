// 이 파일은 "어떤 AI 도구를 어떤 역할로 쓰는가" 를 드러내는 독립 섹션이다.
// 단순 로고 나열이 아니라 역할 카드로 구성해, 한 도구에 락인되지 않는 오케스트레이션 감각을 보여 준다.
import type { AIWorkflowTool } from "@/domain";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

// 섹션 입력 속성 구조다. 카드로 렌더링할 툴 목록을 받는다.
type Props = {
  tools: readonly AIWorkflowTool[];
};

/**
 * AI 워크플로에서 쓰는 도구들을 역할 기반 카드 그리드로 렌더링한다.
 * 입력은 `AIWorkflowTool` 배열이며, 반환값은 섹션 헤더와 4열 카드 레이아웃으로 구성된 섹션 JSX다.
 * 부작용은 없고, 카드 순서는 데이터 파일에서 결정되므로 여기서는 순서를 바꾸지 않는다.
 */
export default function AIWorkflow({ tools }: Props) {
  return (
    <section
      id="ai-workflow"
      className="px-6 md:px-10 max-w-[1400px] mx-auto pt-24 md:pt-32 pb-12 md:pb-16"
    >
      <SectionHeader
        index="(03) AI Workflow"
        title="How I Work with AI"
        subtitle="Agent Orchestration"
      />

      {/*
        상단 카피는 "한 도구에 락인되지 않는다" 는 태도를 한 문장으로 요약한다.
        큰 타이포와 함께 읽혀 카드 나열을 단순 리스트가 아니라 선언문처럼 보이게 만든다.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
        <Reveal className="lg:col-span-7">
          <p className="text-2xl md:text-4xl leading-[1.2] tracking-[-0.02em] font-light">
            에이전트를 고르는 것도 설계다.
            <br />
            <span className="text-muted-foreground">
              문제의 결에 맞는 AI를 꺼내 쓰고, 판단은 내가, 반복은 에이전트가
              한다.
            </span>
          </p>
        </Reveal>
        <Reveal
          delay={180}
          className="lg:col-span-5 flex lg:justify-end items-end"
        >
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
            Claude, Codex, OpenCode, Antigravity. 코딩 에이전트를 병렬로 굴리고
            각자의 강점에 맞춰 작업을 위임한다. 툴을 쓰는 게 아니라
            오케스트레이션한다.
          </p>
        </Reveal>
      </div>

      {/* 카드 그리드는 데스크탑에서 1×4, 태블릿에서 2×2, 모바일에서 세로 스택으로 자연스럽게 접힌다. */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-border border border-border">
        {tools.map((tool, idx) => (
          <Reveal
            key={tool.name}
            delay={idx * 120}
            className="bg-background p-6 flex flex-col gap-4 hover:bg-foreground hover:text-background transition-colors group"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-xl md:text-2xl font-semibold tracking-[-0.02em]">
                  {tool.name}
                </h4>
                {tool.alias && (
                  <p className="mt-1 text-[11px] font-mono text-muted-foreground group-hover:text-background/70">
                    {tool.alias}
                  </p>
                )}
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground shrink-0 mt-1 group-hover:text-background/70">
                {tool.vendor}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-background/80">
              {tool.role}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
