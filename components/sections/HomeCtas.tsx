import PrimaryCta from "@/components/ui/PrimaryCta";
import ScrollReveal from "@/components/animations/ScrollReveal";

type Cta = {
  label: string;
  href: string;
};

type HomeCtasProps = {
  ctas: Cta[];
};

export default function HomeCtas({ ctas }: HomeCtasProps) {
  return (
    <section className="bg-ink py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="flex flex-col gap-8 border-y border-alabaster/10 py-12 md:flex-row md:items-center md:justify-between">
            <p data-reveal="mask" className="text-lg text-alabaster/80">
              Ready to craft a surface story? Our team curates bespoke finishes
              for hospitality, retail, and private residences.
            </p>
            <div data-reveal className="flex gap-8">
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
