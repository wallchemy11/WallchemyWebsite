import HeroReveal from "@/components/animations/HeroReveal";
import SmartVideo from "@/components/ui/SmartVideo";

type VideoHeroProps = {
  headline: string;
  subheadline?: string;
  videoSrc: string;
  mobileVideoSrc?: string;
  poster?: string;
};

export default function VideoHero({
  headline,
  subheadline,
  videoSrc,
  mobileVideoSrc,
  poster
}: VideoHeroProps) {
  return (
    <section className="relative min-h-[62svh] overflow-hidden sm:min-h-[68svh] md:min-h-[90vh]">
      <SmartVideo
        src={videoSrc}
        mobileSrc={mobileVideoSrc}
        poster={poster}
        className="absolute inset-0"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundColor:
            "rgb(var(--hero-overlay-rgb, 11 10 9) / var(--hero-overlay-opacity, 0.55))"
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(176,139,79,0.15),transparent_60%)]" />
      <div className="relative z-10 mx-auto flex min-h-[62svh] max-w-6xl flex-col justify-end px-6 pb-12 sm:min-h-[68svh] sm:pb-14 md:min-h-[90vh] md:pb-24">
        <HeroReveal>
          <h1
            data-hero
            className="font-display whitespace-pre-line text-[1.9rem] font-semibold uppercase tracking-[0.13em] sm:text-4xl sm:tracking-[0.18em] md:text-7xl md:tracking-[0.2em]"
          >
            {headline}
          </h1>
          {subheadline ? (
            <p
              data-hero
              className="mt-4 max-w-3xl whitespace-pre-line text-[11px] uppercase tracking-[0.14em] text-alabaster/70 sm:mt-5 sm:text-sm sm:tracking-[0.2em] md:text-base md:tracking-[0.24em]"
            >
              {subheadline}
            </p>
          ) : null}
        </HeroReveal>
      </div>
    </section>
  );
}
