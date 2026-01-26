import PrimaryCta from "@/components/ui/PrimaryCta";
import ScrollReveal from "@/components/animations/ScrollReveal";

type Cta = {
  label: string;
  href: string;
};

type HomeCtasProps = {
  intro: string;
  ctas: Cta[];
};

export default function HomeCtas({ intro, ctas }: HomeCtasProps) {
  return (
    <section className="bg-ink py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="flex flex-col gap-6 border-y border-alabaster/10 py-10 md:flex-row md:items-center md:justify-between md:gap-8 md:py-12">
            <p data-reveal="mask" className="text-base text-alabaster/80 sm:text-lg">
              {intro}
            </p>
            <div data-reveal className="flex flex-wrap gap-6 md:gap-8">
              {ctas.map((cta) => (
                <PrimaryCta key={cta.label} label={cta.label} href={cta.href} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
