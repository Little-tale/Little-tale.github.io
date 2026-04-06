import { profile } from "@/lib/content";
import SectionHeader from "./SectionHeader";

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-6 md:px-10 max-w-[1400px] mx-auto py-24 md:py-32"
    >
      <SectionHeader index="(05) Contact" title="Let's Talk" subtitle="Get in touch" />

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
        <div className="lg:col-span-4 space-y-6">
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
