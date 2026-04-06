"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";
import SpreadText from "./SpreadText";

function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const fmt = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Seoul",
      }).format(d);
      setTime(`${fmt} KST`);
    };
    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Hero() {
  const time = useClock();

  return (
    <>
      {/* Sticky scatter stage — 200vh scroll space so the text has room to tear apart */}
      <section
        id="top"
        data-scroll-stage
        className="relative h-[200vh]"
      >
        <div className="sticky top-0 h-screen flex flex-col pt-24 pb-10 px-6 md:px-10 max-w-[1400px] mx-auto overflow-hidden">
          {/* meta line */}
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground fade-up">
            <span>{profile.role} — Seoul, KR</span>
            <span className="font-mono">{time || "—— KST"}</span>
          </div>

          {/* huge name */}
          <div className="flex-1 flex flex-col items-center text-center justify-center py-10">
            <h1
              className="text-[22vw] md:text-[16vw] leading-[0.85] font-semibold tracking-[-0.04em] fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <SpreadText distance={3} rotation={10} travel={700} seed={3}>
                {profile.name}
              </SpreadText>
            </h1>
            <h2
              className="mt-6 text-[14vw] md:text-[10vw] leading-[0.85] font-light tracking-[-0.03em] text-muted-foreground fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <SpreadText distance={4} rotation={12} travel={700} seed={11}>
                App Developer
              </SpreadText>
            </h2>
            <p
              className="mt-8 text-sm md:text-base normal-case tracking-[0.3em] text-muted-foreground fade-up"
              style={{ animationDelay: "0.35s" }}
            >
              <SpreadText distance={20} rotation={20} travel={700} seed={23}>
                iOS · FLUTTER
              </SpreadText>
            </p>

            <p
              className="mt-14 max-w-2xl text-lg md:text-xl leading-relaxed shimmer-text fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              <SpreadText distance={8} rotation={12} travel={700} seed={42}>
                {profile.tagline}
              </SpreadText>
            </p>
          </div>

          {/* scroll hint */}
          <div className="flex items-center justify-center text-xs uppercase tracking-[0.3em] text-muted-foreground fade-up">
            <span className="animate-pulse">↓ Scroll</span>
          </div>
        </div>
      </section>

      {/* intro / CTA — shows after the scatter scroll has played */}
      <section className="px-6 md:px-10 max-w-[1400px] mx-auto pt-20 pb-24 md:pt-32 md:pb-40">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 border-t border-border pt-10">
          <div className="space-y-2 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>{profile.intro}</p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3 text-sm shrink-0">
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 border border-border rounded-full pl-5 pr-2 py-2 hover:bg-foreground hover:text-background transition-colors"
            >
              <span>작업물 보기</span>
              <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:rotate-45 transition-transform">
                →
              </span>
            </a>
            <span className="text-xs text-muted-foreground">
              4 projects · Swift · TCA · Concurrency
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
