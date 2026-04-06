// 이 파일은 마지막 CTA 역할을 하는 연락처 섹션이다.
// 큰 문장으로 협업 제안을 던지고, 이메일/깃허브/블로그를 카드형 링크로 정리한다.
import type { Profile } from "@/domain";
import SectionHeader from "@/components/ui/SectionHeader";

// 연락처 섹션 입력 속성 구조다.
type Props = {
  profile: Profile;
};

/**
 * 협업 제안 문구와 외부 연락 수단 링크를 렌더링한다.
 * 입력은 프로필 객체이며, 반환값은 카피 블록과 3개의 액션 카드로 구성된 섹션 JSX다.
 * 부작용은 없고, 링크 URL과 표시 텍스트는 모두 프로필 데이터에 의해 결정된다.
 */
export default function Contact({ profile }: Props) {
  return (
    <section
      id="contact"
      className="px-6 md:px-10 max-w-[1400px] mx-auto py-24 md:py-32"
    >
      <SectionHeader
        index="(05) Contact"
        title="Let's Talk"
        subtitle="Get in touch"
      />

      {/* 좌측 대형 카피와 우측 액션 카드의 대비로 페이지 마지막 행동 유도를 강화한다. */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8">
          <h3 className="text-5xl md:text-8xl font-semibold tracking-[-0.04em] leading-[0.9]">
            함께 만들고
            <br />
            <span className="text-muted-foreground">기록할 사람을</span>
            <br />
            찾고 있다면.
          </h3>
        </div>
        {/* 우측 카드는 동일한 패턴을 반복해 어떤 채널로도 쉽게 이동할 수 있게 한다. */}
        <div className="lg:col-span-4 space-y-6">
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
    </section>
  );
}
