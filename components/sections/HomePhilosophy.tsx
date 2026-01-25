import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

type HomePhilosophyProps = {
  philosophy: string;
};

export default function HomePhilosophy({ philosophy }: HomePhilosophyProps) {
  return (
    <section className="bg-ink py-20">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Philosophy"
            title="Surfaces designed to evoke emotion."
            subtitle="A studio-led practice rooted in craft, mineral science, and architectural calm."
          />
          <p
            data-reveal="mask"
            className="mt-8 max-w-3xl text-lg text-alabaster/80"
          >
            {philosophy}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
