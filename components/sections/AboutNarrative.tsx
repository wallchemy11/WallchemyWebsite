import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

type AboutNarrativeProps = {
  narrative: string;
  founderNote: string;
};

export default function AboutNarrative({
  narrative,
  founderNote
}: AboutNarrativeProps) {
  return (
    <section className="bg-ink py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="About"
            title="A studio built on material intelligence."
            subtitle="Founded 2026 · Boutique surface studio"
          />
          <p
            data-reveal
            className="mt-6 text-xs uppercase tracking-[0.18em] text-alabaster/60 sm:text-sm md:tracking-[0.2em]"
          >
            {founderNote}
          </p>
          <p
            data-reveal
            className="mt-8 max-w-4xl text-base text-alabaster/80 sm:text-lg md:text-xl"
          >
            {narrative}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
