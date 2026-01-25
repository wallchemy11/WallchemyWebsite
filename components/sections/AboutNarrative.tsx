import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

type AboutNarrativeProps = {
  intro: string;
  narrative: string;
  founderNote: string;
};

export default function AboutNarrative({
  intro,
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
          <div className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr]">
            <p data-reveal className="text-lg text-alabaster/80">
              {intro}
            </p>
            <p data-reveal className="text-sm uppercase tracking-[0.2em] text-alabaster/60">
              {founderNote}
            </p>
          </div>
          <p data-reveal className="mt-10 max-w-4xl text-xl text-alabaster/80">
            {narrative}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
