// 이 파일은 프로필 정보와 이력 데이터를 두 컬럼 구조로 풀어내는 About 섹션이다.
// 원본 resume 데이터를 화면용 공통 엔트리 구조로 변환해 여러 섹션을 같은 카드 패턴으로 표현한다.
import type { Profile, Resume, ResumeEntry } from "@/domain";
import SectionHeader from "@/components/ui/SectionHeader";

/**
 * About 섹션 오른쪽 컬럼에 쓰이는 공통 이력 블록을 렌더링한다.
 * 입력은 블록 라벨과 정규화된 이력 항목 배열이며, 반환값은 제목/메타/본문 리스트 JSX다.
 * 부작용은 없고, 각 항목의 `title`을 key로 사용하므로 제목이 식별자 역할도 겸한다.
 */
function Block({
  label,
  items,
}: {
  label: string;
  items: readonly ResumeEntry[];
}) {
  // 섹션마다 얇은 경계선을 두어 긴 이력 목록을 시각적으로 끊어 읽기 쉽게 만든다.
  return (
    <div className="border-t border-border pt-6">
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-6">
        {label}
      </p>
      <ul className="space-y-6">
        {items.map((it) => (
          <li key={it.title}>
            <div className="flex items-baseline justify-between gap-4">
              <h4 className="text-base md:text-lg font-medium">{it.title}</h4>
              {it.meta && (
                <span className="text-xs font-mono text-muted-foreground shrink-0">
                  {it.meta}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {it.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// About 섹션이 필요로 하는 프로필/이력 입력 구조다.
type Props = {
  profile: Profile;
  resume: Resume;
};

/**
 * 개인 소개, 연락처, 이력 요약을 함께 보여 주는 About 섹션을 렌더링한다.
 * 입력은 프로필 객체와 이력서 객체이며, 반환값은 좌측 소개/우측 이력의 2열 레이아웃 JSX다.
 * 내부에서 여러 resume 배열을 공통 `ResumeEntry` 형태로 변환하므로, 데이터 모양이 달라도 UI 구조는 일정하게 유지된다.
 */
export default function About({ profile, resume }: Props) {
  // 화면에서는 "제목 + 기간 + 설명" 패턴이 반복되므로 먼저 공통 구조로 정규화한다.
  const workItems: ResumeEntry[] = resume.work.map((w) => ({
    title: `${w.company} — ${w.role}`,
    meta: w.period,
    body: w.body,
  }));
  const leadershipItems: ResumeEntry[] = resume.leadership.map((w) => ({
    title: `${w.company} — ${w.role}`,
    meta: w.period,
    body: w.body,
  }));
  const educationItems: ResumeEntry[] = resume.education.map((w) => ({
    title: `${w.school} · ${w.major}`,
    meta: w.period,
    body: w.note,
  }));
  const activityItems: ResumeEntry[] = resume.activities.map((w) => ({
    title: `${w.name} — ${w.role}`,
    body: w.body,
  }));
  const awardItems: ResumeEntry[] = resume.awards.map((w) => ({
    title: w.title,
    meta: w.date,
    body: w.body,
  }));
  const certificateItems: ResumeEntry[] = resume.certificates.map((w) => ({
    title: w.title,
    meta: w.date,
    body: w.body,
  }));

  // 큰 제목과 본문을 분리한 12컬럼 그리드로, 자기소개와 이력을 동시에 훑을 수 있게 한다.
  return (
    <section
      id="about"
      className="px-6 md:px-10 max-w-[1400px] mx-auto py-24 md:py-32"
    >
      <SectionHeader
        index="(01) About"
        title="About Me"
        subtitle={`Born ${profile.birth}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* 좌측은 가치관/연락처처럼 정적인 자기소개 정보를 모은다. */}
        <div className="lg:col-span-5 space-y-6">
          <p className="text-2xl md:text-3xl leading-snug tracking-[-0.02em]">
            “{profile.tagline}”
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {profile.intro}
          </p>
          <dl className="text-sm space-y-2 pt-4">
            <div className="flex gap-4">
              <dt className="text-muted-foreground w-20">Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`} className="link-underline">
                  {profile.email}
                </a>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="text-muted-foreground w-20">Phone</dt>
              <dd>{profile.phone}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="text-muted-foreground w-20">GitHub</dt>
              <dd>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline"
                >
                  Little-tale
                </a>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="text-muted-foreground w-20">Blog</dt>
              <dd>
                <a
                  href={profile.blog}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline"
                >
                  velog.io/@little_tail
                </a>
              </dd>
            </div>
          </dl>
        </div>

        {/* 우측은 공통 블록 컴포넌트로 이력 카테고리를 길게 이어 붙인다. */}
        <div className="lg:col-span-7 space-y-12">
          <Block label="Work Experience" items={workItems} />
          <Block label="Leadership" items={leadershipItems} />
          <Block label="Education" items={educationItems} />
          <Block label="Activities" items={activityItems} />
          <Block label="Awards & Honors" items={awardItems} />
          <Block label="Certificates" items={certificateItems} />
        </div>
      </div>
    </section>
  );
}
