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
    <section className="relative min-h-[70vh] overflow-hidden md:min-h-[90vh]">
      <SmartVideo
        src={videoSrc}
        mobileSrc={mobileVideoSrc}
        poster={poster}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/55 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(176,139,79,0.15),transparent_60%)]" />
      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-6 pb-16 md:min-h-[90vh] md:pb-24">
        <HeroReveal>
          <h1
            data-hero
            className="font-display text-3xl font-semibold uppercase tracking-[0.2em] sm:text-4xl md:text-7xl"
          >
            {headline}
          </h1>
          {subheadline ? (
            <p
              data-hero
              className="mt-5 max-w-3xl text-xs uppercase tracking-[0.2em] text-alabaster/70 sm:text-sm md:text-base md:tracking-[0.24em]"
            >
              {subheadline}
            </p>
          ) : null}
        </HeroReveal>
      </div>
    </section>
  );
}
