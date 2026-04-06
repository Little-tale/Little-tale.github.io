import SpreadText from "@/components/ui/SpreadText";
import { useClock } from "@/hooks";

type Props = {
  name: string;
  role: string;
  tagline: string;
  locationLabel?: string;
};

export default function Hero({
  name,
  role,
  tagline,
  locationLabel = "Seoul, KR",
}: Props) {
  const time = useClock();

  return (
    <section id="top" data-scroll-stage className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex flex-col pt-24 pb-10 px-6 md:px-10 max-w-[1400px] mx-auto overflow-hidden">
        {/* meta line */}
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground fade-up">
          <span>
            {role} — {locationLabel}
          </span>
          <span className="font-mono">{time || "—— KST"}</span>
        </div>

        {/* huge name */}
        <div className="flex-1 flex flex-col items-center text-center justify-center py-10">
          <h1
            className="text-[22vw] md:text-[16vw] leading-[0.85] font-semibold tracking-[-0.04em] fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <SpreadText distance={3} rotation={10} travel={700} seed={3}>
              {name}
            </SpreadText>
          </h1>
          <h2
            className="mt-6 text-[14vw] md:text-[10vw] leading-[0.85] font-light tracking-[-0.03em] text-muted-foreground fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <SpreadText distance={4} rotation={12} travel={700} seed={11}>
              {role}
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
              {tagline}
            </SpreadText>
          </p>
        </div>

        {/* scroll hint */}
        <div className="flex items-center justify-center text-xs uppercase tracking-[0.3em] text-muted-foreground fade-up">
          <span className="animate-pulse">↓ Scroll</span>
        </div>
      </div>
    </section>
  );
}
