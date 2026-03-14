import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { resolveText } from "@/lib/text";

type AboutNarrativeProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  narrative?: string;
  founderNote?: string;
};

export default function AboutNarrative({
  eyebrow,
  title,
  subtitle,
  narrative,
  founderNote
}: AboutNarrativeProps) {
  const safeEyebrow = resolveText(eyebrow);
  const safeTitle = resolveText(title);
  const safeSubtitle = resolveText(subtitle);
  const safeNarrative = resolveText(narrative);
  const safeFounderNote = resolveText(founderNote);
  return (
    <section className="bg-ink py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow={safeEyebrow}
            title={safeTitle}
            subtitle={safeSubtitle}
          />
          <p
            data-reveal
            className="mt-6 text-[11px] uppercase tracking-[0.12em] text-alabaster/60 sm:text-sm sm:tracking-[0.16em] md:tracking-[0.2em]"
          >
            {safeFounderNote}
          </p>
          <p
            data-reveal
            className="mt-7 max-w-4xl text-[15px] text-alabaster/80 sm:text-lg md:text-xl"
          >
            {safeNarrative}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
