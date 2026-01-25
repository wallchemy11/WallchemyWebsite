import ScrollReveal from "@/components/animations/ScrollReveal";

type WhyWallchemyProps = {
  text: string;
};

export default function WhyWallchemy({ text }: WhyWallchemyProps) {
  return (
    <section className="bg-ink py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
            <p
              data-reveal
              className="text-3xl font-medium leading-snug md:text-5xl"
            >
              Why Wallchemy
            </p>
            <p data-reveal className="text-sm uppercase tracking-[0.2em] text-alabaster/70">
              {text}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
