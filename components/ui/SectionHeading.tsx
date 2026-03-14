import { resolveText } from "@/lib/text";

type SectionHeadingProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle
}: SectionHeadingProps) {
  const safeEyebrow = resolveText(eyebrow);
  const safeTitle = resolveText(title);
  const safeSubtitle = resolveText(subtitle);

  return (
    <div data-reveal className="space-y-4">
      {safeEyebrow ? (
        <p className="text-[10px] uppercase tracking-[0.26em] text-brass/90 [overflow-wrap:anywhere] sm:text-xs sm:tracking-[0.42em]">
          {safeEyebrow}
        </p>
      ) : null}
      <h2 className="font-display break-words text-3xl font-medium leading-[1.1] [overflow-wrap:anywhere] sm:text-4xl md:text-6xl">
        {safeTitle}
      </h2>
      {safeSubtitle ? (
        <p className="max-w-2xl text-xs uppercase tracking-[0.14em] text-alabaster/70 [overflow-wrap:anywhere] sm:text-sm sm:tracking-[0.2em] md:text-base md:tracking-[0.22em]">
          {safeSubtitle}
        </p>
      ) : null}
    </div>
  );
}
