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
        <p className="text-xs uppercase tracking-[0.42em] text-brass/90">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-4xl font-medium leading-[1.05] md:text-6xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-2xl text-base uppercase tracking-[0.22em] text-alabaster/70">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
