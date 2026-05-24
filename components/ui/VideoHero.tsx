import HeroReveal from "@/components/animations/HeroReveal";
import SmartVideo from "@/components/ui/SmartVideo";

type VideoHeroProps = {
  headline: string;
  subheadline?: string;
  videoSrc: string;
  mobileVideoSrc?: string;
  poster?: string;
  priorityVideo?: boolean;
};

export default function VideoHero({
  headline,
  subheadline,
  videoSrc,
  mobileVideoSrc,
  poster,
  priorityVideo = false
}: VideoHeroProps) {
  return (
    <section className="relative min-h-[62svh] overflow-hidden sm:min-h-[68svh] md:min-h-[90vh]">
      <SmartVideo
        src={videoSrc}
        mobileSrc={mobileVideoSrc}
        poster={poster}
        priority={priorityVideo}
        className="absolute inset-0"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgb(var(--hero-overlay-rgb, 62 54 48) / calc(var(--hero-overlay-opacity, 0.55) * 0.55)) 0%, rgb(var(--hero-overlay-rgb, 62 54 48) / var(--hero-overlay-opacity, 0.55)) 45%, rgb(var(--hero-overlay-rgb, 62 54 48) / 1) 100%)"
        }}
      />
      <div className="relative z-10 mx-auto flex min-h-[62svh] max-w-6xl flex-col justify-end px-6 pb-12 sm:min-h-[68svh] sm:pb-14 md:min-h-[90vh] md:pb-24">
        <HeroReveal>
          <h1
            data-hero
            className="font-display whitespace-pre-line text-[2rem] font-bold uppercase tracking-[0.13em] sm:text-5xl sm:tracking-[0.18em] md:text-8xl md:tracking-[0.2em]"
          >
            {headline}
          </h1>
          {subheadline ? (
            <p
              data-hero
              className="mt-4 max-w-3xl whitespace-pre-line text-[11px] uppercase tracking-[0.14em] text-alabaster/85 sm:mt-5 sm:text-sm sm:tracking-[0.2em] md:text-base md:tracking-[0.24em]"
            >
              {subheadline}
            </p>
          ) : null}
        </HeroReveal>
      </div>
    </section>
  );
}
