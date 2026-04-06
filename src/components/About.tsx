import {
  work,
  leadership,
  education,
  activities,
  awards,
  certificates,
  profile,
} from "@/lib/content";
import SectionHeader from "./SectionHeader";

function Block({
  label,
  items,
}: {
  label: string;
  items: { title: string; meta?: string; body: string }[];
}) {
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

export default function About() {
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

        <div className="lg:col-span-7 space-y-12">
          <Block
            label="Work Experience"
            items={work.map((w) => ({
              title: `${w.company} — ${w.role}`,
              meta: w.period,
              body: w.body,
            }))}
          />
          <Block
            label="Leadership"
            items={leadership.map((w) => ({
              title: `${w.company} — ${w.role}`,
              meta: w.period,
              body: w.body,
            }))}
          />
          <Block
            label="Education"
            items={education.map((w) => ({
              title: `${w.school} · ${w.major}`,
              meta: w.period,
              body: w.note,
            }))}
          />
          <Block
            label="Activities"
            items={activities.map((w) => ({
              title: `${w.name} — ${w.role}`,
              body: w.body,
            }))}
          />
          <Block
            label="Awards & Honors"
            items={awards.map((w) => ({
              title: w.title,
              meta: w.date,
              body: w.body,
            }))}
          />
          <Block
            label="Certificates"
            items={certificates.map((w) => ({
              title: w.title,
              meta: w.date,
              body: w.body,
            }))}
          />
        </div>
      </div>
    </section>
  );
}
