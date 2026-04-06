export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span>© 2025 김재형 — Built with Next.js</span>
        <span className="font-mono">
          Made in Seoul · 한 발자국, 누군가의 꿈으로
        </span>
      </div>
    </footer>
  );
}
