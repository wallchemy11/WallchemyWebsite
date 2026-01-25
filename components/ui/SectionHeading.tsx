type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle
}: SectionHeadingProps) {
  return (
    <div data-reveal className="space-y-4">
      {eyebrow ? (
        <p className="text-[10px] uppercase tracking-[0.36em] text-brass/90 sm:text-xs sm:tracking-[0.42em]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-medium leading-[1.1] sm:text-4xl md:text-6xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-2xl text-xs uppercase tracking-[0.2em] text-alabaster/70 sm:text-sm md:text-base md:tracking-[0.22em]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
