import HeroReveal from "@/components/animations/HeroReveal";

type VideoHeroProps = {
  headline: string;
  subheadline?: string;
  videoSrc: string;
  poster?: string;
};

export default function VideoHero({
  headline,
  subheadline,
  videoSrc,
  poster
}: VideoHeroProps) {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/55 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(176,139,79,0.15),transparent_60%)]" />
      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-6xl flex-col justify-end px-6 pb-24">
        <HeroReveal>
          <h1
            data-hero
            className="font-display text-5xl font-semibold uppercase tracking-[0.22em] md:text-7xl"
          >
            {headline}
          </h1>
          {subheadline ? (
            <p
              data-hero
              className="mt-6 max-w-3xl text-base uppercase tracking-[0.24em] text-alabaster/70"
            >
              {subheadline}
            </p>
          ) : null}
        </HeroReveal>
      </div>
    </section>
  );
}
