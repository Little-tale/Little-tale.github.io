// 이 파일은 마지막 CTA 역할을 하는 연락처 섹션이다.
// 히어로와 대칭되는 pinned 스테이지 안에서 큰 카피가 흩어진 상태로 등장해 스크롤과 함께 모이고,
// 카피가 다 모인 뒤 우측 액션 카드가 서서히 떠오르도록 연출한다.
import { useRef } from "react";
import type { Profile } from "@/domain";
import SectionHeader from "@/components/ui/SectionHeader";
import SpreadText from "@/components/ui/SpreadText";
import { useScrollProgress } from "@/hooks";

// 연락처 섹션 입력 속성 구조다.
type Props = {
  profile: Profile;
};

/**
 * 협업 제안 문구와 외부 연락 수단 링크를 pinned 스테이지로 렌더링한다.
 * 입력은 프로필 객체이며, 반환값은 대형 gather 카피와 뒤따라 등장하는 3개의 액션 카드를 담은 섹션 JSX다.
 * 내부에서 `useScrollProgress`(pin)로 스테이지 진행도를 읽어 카드 등장 시점을 계산한다.
 * 부작용은 없고, 링크 URL과 표시 텍스트는 모두 프로필 데이터에 의해 결정된다.
 */
export default function Contact({ profile }: Props) {
  const stageRef = useRef<HTMLElement>(null);
  // 히어로와 동일한 travel 값을 쓰면 gather 속도가 자연스럽게 맞춰진다.
  const stageTravel = 700;
  // 카드 등장은 카피가 거의 다 모인 후(진행도 0.6 이후) 서서히 시작해, 0.95 지점에서 완전히 보인다.
  const progress = useScrollProgress(stageRef, stageTravel, "pin");
  const cardReveal = Math.max(0, Math.min(1, (progress - 0.6) / 0.35));

  return (
    <section
      id="contact"
      data-scroll-stage
      ref={stageRef}
      className="relative h-[220vh]"
    >
      {/* 한 화면 높이의 sticky 컨테이너에서 카피가 모이는 연출과 카드 등장이 같은 구간에서 일어난다. */}
      <div className="sticky top-0 h-screen flex flex-col px-6 md:px-10 max-w-[1400px] mx-auto py-24 md:py-28 overflow-hidden">
        <SectionHeader
          index="(06) Contact"
          title="Let's Talk"
          subtitle="Get in touch"
        />

        {/* 좌측 대형 카피와 우측 액션 카드의 대비로 페이지 마지막 행동 유도를 강화한다. */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            {/*
              히어로 상단의 분산 효과와 대칭이 되도록, 연락처 헤드라인은 처음에 흩어진 상태에서
              스크롤이 진행될수록 한 덩어리로 모이는 gather 연출을 사용한다. SpreadText 의
              `invert` 플래그가 pin 모드 진행도를 뒤집어 0(=모임) 에서 1(=흩어짐) 방향을 반대로 돌린다.
            */}
            <h3 className="text-5xl md:text-8xl font-semibold tracking-[-0.04em] leading-[1.15]">
              <SpreadText
                invert
                useGradient
                distance={5}
                rotation={12}
                travel={stageTravel}
                seed={51}
              >
                함께 만들고
              </SpreadText>
              <br />
              <span className="text-muted-foreground">
                <SpreadText
                  invert
                  useGradient
                  distance={5}
                  rotation={12}
                  travel={stageTravel}
                  seed={67}
                >
                  기록할 사람을
                </SpreadText>
              </span>
              <br />
              <SpreadText
                invert
                useGradient
                distance={5}
                rotation={12}
                travel={stageTravel}
                seed={83}
              >
                찾고 있다면.
              </SpreadText>
            </h3>
          </div>
          {/* 우측 카드는 동일한 패턴을 반복해 어떤 채널로도 쉽게 이동할 수 있게 한다. */}
          <div
            className="lg:col-span-4 space-y-6"
            style={{
              opacity: cardReveal,
              transform: `translate3d(0, ${(1 - cardReveal) * 28}px, 0)`,
              // pointer-events 를 아직 안 보일 때 차단해 실수로 클릭되는 것을 막는다.
              pointerEvents: cardReveal > 0.2 ? "auto" : "none",
              willChange: "opacity, transform",
            }}
          >
            {/* hover 시 전체 카드가 반전되어 클릭 가능한 액션이라는 점을 분명히 보여 준다. */}
            <a
              href={`mailto:${profile.email}`}
              className="block group border border-border rounded-2xl p-6 hover:bg-foreground hover:text-background transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.25em]">
                  Email
                </span>
                <span className="group-hover:rotate-45 transition-transform">
                  →
                </span>
              </div>
              <p className="text-base md:text-lg">{profile.email}</p>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="block group border border-border rounded-2xl p-6 hover:bg-foreground hover:text-background transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.25em]">
                  GitHub
                </span>
                <span className="group-hover:rotate-45 transition-transform">
                  →
                </span>
              </div>
              <p className="text-base md:text-lg">@Little-tale</p>
            </a>
            <a
              href={profile.blog}
              target="_blank"
              rel="noreferrer"
              className="block group border border-border rounded-2xl p-6 hover:bg-foreground hover:text-background transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.25em]">
                  Blog
                </span>
                <span className="group-hover:rotate-45 transition-transform">
                  →
                </span>
              </div>
              <p className="text-base md:text-lg">velog.io/@little_tail</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
