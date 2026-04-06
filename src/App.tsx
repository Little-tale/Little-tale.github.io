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

export default function App() {
  const { profile, philosophy, projects, skills, resume } = portfolioContent;
  const projectCount = projects.length;

  return (
    <>
      <Nav email={profile.email} />
      <main>
        <Hero
          name={profile.name}
          role={profile.role}
          tagline={profile.tagline}
        />
        <Intro
          intro={profile.intro}
          ctaSubLabel={`${projectCount} projects · Swift · TCA · Concurrency`}
        />
        <About profile={profile} resume={resume} />
        <Philosophy entries={philosophy} />
        <Projects projects={projects} />
        <Skills categories={skills} />
        <Contact profile={profile} />
      </main>
      <Footer ownerName={profile.name} />
    </>
  );
}
