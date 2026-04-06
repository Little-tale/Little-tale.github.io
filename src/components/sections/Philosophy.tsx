import type { PhilosophyEntry } from "@/domain";
import SectionHeader from "@/components/ui/SectionHeader";

type Props = {
  entries: readonly PhilosophyEntry[];
};

export default function Philosophy({ entries }: Props) {
  return (
    <section
      id="philosophy"
      className="px-6 md:px-10 max-w-[1400px] mx-auto py-24 md:py-32"
    >
      <SectionHeader
        index="(02) Philosophy"
        title="개발 철학"
        subtitle="What I believe"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
        {entries.map((p, i) => (
          <div
            key={p.title}
            className="bg-background p-8 md:p-12 hover:bg-muted transition-colors group"
          >
            <div className="flex items-start justify-between mb-6">
              <span className="text-xs font-mono text-muted-foreground">
                0{i + 1}
              </span>
              <span className="w-2 h-2 rounded-full bg-muted-foreground group-hover:bg-foreground transition-colors" />
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-6 leading-tight">
              {p.title}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
