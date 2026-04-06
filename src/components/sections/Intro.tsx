type Props = {
  intro: string;
  ctaHref?: string;
  ctaLabel?: string;
  ctaSubLabel?: string;
};

export default function Intro({
  intro,
  ctaHref = "#projects",
  ctaLabel = "작업물 보기",
  ctaSubLabel = "4 projects · Swift · TCA · Concurrency",
}: Props) {
  return (
    <section className="px-6 md:px-10 max-w-[1400px] mx-auto pt-20 pb-24 md:pt-32 md:pb-40">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 border-t border-border pt-10">
        <div className="space-y-2 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>{intro}</p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3 text-sm shrink-0">
          <a
            href={ctaHref}
            className="group inline-flex items-center gap-3 border border-border rounded-full pl-5 pr-2 py-2 hover:bg-foreground hover:text-background transition-colors"
          >
            <span>{ctaLabel}</span>
            <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:rotate-45 transition-transform">
              →
            </span>
          </a>
          <span className="text-xs text-muted-foreground">{ctaSubLabel}</span>
        </div>
      </div>
    </section>
  );
}
