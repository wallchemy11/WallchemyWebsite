import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { resolveText } from "@/lib/text";

type StudioValuesProps = {
  eyebrow?: string;
  title?: string;
  values: string[];
};

export default function StudioValues({
  values,
  eyebrow,
  title
}: StudioValuesProps) {
  const safeEyebrow = resolveText(eyebrow);
  const safeTitle = resolveText(title);
  return (
    <section className="bg-ink py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow={safeEyebrow}
            title={safeTitle}
          />
          <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div key={value} data-reveal className="border-t border-brass/30 pt-6">
                <p className="text-sm uppercase tracking-[0.14em] text-alabaster/70 sm:tracking-[0.22em]">
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
