// 이 파일은 단일 페이지 포트폴리오의 전체 섹션 조합을 담당하는 최상위 화면 컴포넌트다.
// 라우터 없이 정적 콘텐츠를 읽어 각 섹션에 필요한 조각만 props로 분배한다.
import { portfolioContent } from "@/content";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import About from "@/components/sections/About";
import Philosophy from "@/components/sections/Philosophy";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

/**
 * 포트폴리오 단일 페이지를 섹션 단위로 조립해 렌더링한다.
 * 입력은 없고, 정적 콘텐츠 모듈에서 읽은 데이터를 각 섹션 props로 전달한다.
 * 반환값은 내비게이션, 소개, 프로젝트, 연락처를 포함한 전체 페이지 JSX다.
 */
export default function App() {
  const { profile, philosophy, projects, skills, resume } = portfolioContent;
  // 소개 섹션의 CTA 보조 문구에서 실제 프로젝트 개수를 자동 반영한다.
  const projectCount = projects.length;

  return (
    <>
      {/* 전역 고정 내비게이션은 섹션 앵커 이동의 시작점 역할을 한다. */}
      <Nav email={profile.email} />
      <main>
        {/* 상단 히어로와 인트로는 스크롤 첫 화면에서 핵심 정체성을 압축해 보여준다. */}
        <Hero
          name={profile.name}
          role={profile.role}
          tagline={profile.tagline}
        />
        <Intro
          intro={profile.intro}
          ctaSubLabel={`${projectCount} projects · Swift · TCA · Concurrency`}
        />
        {/* 이후 섹션은 소개 -> 철학 -> 작업물 -> 스택 -> 연락 흐름으로 이어진다. */}
        <About profile={profile} resume={resume} />
        <Philosophy entries={philosophy} />
        <Projects projects={projects} />
        <Skills categories={skills} />
        <Contact profile={profile} />
      </main>
      {/* 푸터는 페이지를 닫는 메타 정보만 간결하게 노출한다. */}
      <Footer ownerName={profile.name} />
    </>
  );
}
