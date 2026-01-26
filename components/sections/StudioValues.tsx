import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

type StudioValuesProps = {
  eyebrow: string;
  title: string;
  values: string[];
};

export default function StudioValues({ values, eyebrow, title }: StudioValuesProps) {
  return (
    <section className="bg-ink py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div key={value} data-reveal className="border-t border-brass/30 pt-6">
                <p className="text-sm uppercase tracking-[0.25em] text-alabaster/70">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
