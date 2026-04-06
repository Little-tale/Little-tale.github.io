import type { SkillCategory } from "@/domain";
import SectionHeader from "@/components/ui/SectionHeader";

type Props = {
  categories: readonly SkillCategory[];
};

export default function Skills({ categories }: Props) {
  const allSkills = categories.flatMap((c) => c.items);

  return (
    <section
      id="skills"
      className="px-6 md:px-10 max-w-[1400px] mx-auto py-24 md:py-32"
    >
      <SectionHeader
        index="(04) Skills"
        title="Toolkit"
        subtitle="Tech Stack"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border mb-16">
        {categories.map((c) => (
          <div key={c.name} className="bg-background p-8">
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
          </div>
        ))}
      </div>

      {/* marquee */}
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
