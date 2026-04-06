type Props = {
  index: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeader({ index, title, subtitle }: Props) {
  return (
    <div className="border-t border-border pt-10 mb-16 md:mb-24">
      <div className="flex items-baseline justify-between gap-6">
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono">
          {index}
        </span>
        {subtitle && (
          <span className="hidden md:block text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {subtitle}
          </span>
        )}
      </div>
      <h2 className="mt-6 text-5xl md:text-7xl font-semibold tracking-[-0.03em] leading-[0.95]">
        {title}
      </h2>
    </div>
  );
}
