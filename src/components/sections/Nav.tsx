// 이 파일은 페이지 상단 고정 내비게이션과 모바일 메뉴를 담당한다.
// 스크롤 위치에 따라 배경을 전환하고, 라우터 없이 섹션 앵커 링크로 단일 페이지를 이동시킨다.
import { useEffect, useState } from "react";

// 내비게이션에 표시할 앵커 링크 한 항목의 구조다.
type NavLink = { href: string; label: string };

// 상단 내비게이션이 필요로 하는 입력 속성이다.
type Props = {
  email: string;
  links?: readonly NavLink[];
};

// 기본 링크 순서는 페이지 섹션 순서와 일치시켜 사용자의 스캔 흐름을 유지한다.
const DEFAULT_LINKS: readonly NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#philosophy", label: "Philosophy" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

/**
 * 상단 고정 내비게이션과 모바일 확장 메뉴를 렌더링한다.
 * 입력은 연락용 이메일과 선택적 링크 목록이며, 반환값은 스크롤 반응형 헤더 JSX다.
 * 내부 상태로 스크롤 여부와 모바일 메뉴 열림 상태를 관리하고, 스크롤 이벤트 리스너를 등록/해제한다.
 */
export default function Nav({ email, links = DEFAULT_LINKS }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 약간만 내려도 배경을 주어 히어로 위에서는 투명, 본문에서는 읽기 쉬운 헤더로 전환한다.
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 히어로 위에서는 가볍게 떠 있고, 스크롤 후에는 blur+border로 본문과 분리한다.
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border"
          : "bg-transparent"
      }`}
    >
      {/* 히어로 위에서는 가볍게 떠 있고, 스크롤 후에는 blur+border로 본문과 분리한다. */}
      {/* 데스크톱에서는 좌측 브랜딩, 중앙 링크, 우측 가용 상태 배지가 한 줄에 놓인다. */}
      <nav className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="text-sm font-medium tracking-tight hover:opacity-70 transition-opacity"
        >
          김재형 <span className="text-muted-foreground">/ Jaehyung</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-underline hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${email}`}
          className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] border border-border rounded-full px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available
        </a>

        {/* 모바일에서는 텍스트 버튼 하나로 메뉴를 토글해 상단 폭을 절약한다. */}
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-sm"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {/* 모바일 오버플로 메뉴는 헤더 바로 아래에 세로 리스트로 펼쳐진다. */}
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <ul className="px-6 py-6 flex flex-col gap-4 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
