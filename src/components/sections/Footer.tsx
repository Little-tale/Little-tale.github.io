// 이 파일은 페이지 맨 아래의 짧은 메타 정보를 보여 주는 푸터다.
// 현재 연도 계산만 내부에서 수행하고, 나머지 텍스트는 상위에서 받아 간결하게 마감한다.
// 푸터가 필요로 하는 입력 속성 구조다.
type Props = {
  ownerName: string;
  tagline?: string;
};

/**
 * 페이지 하단의 저작권 및 태그라인을 렌더링한다.
 * 입력은 소유자 이름과 선택적 태그라인이며, 반환값은 얇은 구분선 아래의 메타 정보 JSX다.
 * 내부에서 현재 연도를 계산하지만 외부 상태를 변경하는 부작용은 없다.
 */
export default function Footer({
  ownerName,
  tagline = "Made in Seoul · 한 발자국, 누군가의 꿈으로",
}: Props) {
  // 매년 자동으로 바뀌는 값이므로 하드코딩하지 않는다.
  const year = new Date().getFullYear();
  // 본문과 푸터를 분리하는 상단 경계선만 두어 마감부를 차분하게 정리한다.
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span>© {year} {ownerName} — Built with Vite + React</span>
        <span className="font-mono">{tagline}</span>
      </div>
    </footer>
  );
}
