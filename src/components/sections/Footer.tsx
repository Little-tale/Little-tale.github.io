type Props = {
  ownerName: string;
  tagline?: string;
};

export default function Footer({
  ownerName,
  tagline = "Made in Seoul · 한 발자국, 누군가의 꿈으로",
}: Props) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span>© {year} {ownerName} — Built with Vite + React</span>
        <span className="font-mono">{tagline}</span>
      </div>
    </footer>
  );
}
