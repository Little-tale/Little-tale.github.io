import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "김재형 · App Developer",
  description:
    "제가 남긴 발자국이 누군가의 꿈이 되기를 바라는 앱 개발자 김재형의 포트폴리오. iOS와 Flutter.",
  openGraph: {
    title: "김재형 · App Developer",
    description:
      "Swift 6, Concurrency, TCA, Tuist 기반으로 문제를 풀고 기록을 남기는 iOS 개발자.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
