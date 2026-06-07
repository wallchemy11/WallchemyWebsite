import type { CSSProperties } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { resolveText } from "@/lib/text";

type StudioValuesProps = {
  eyebrow?: string;
  title?: string;
  values: string[];
  eyebrowStyle?: CSSProperties;
  titleStyle?: CSSProperties;
};

export default function StudioValues({
  values,
  eyebrow,
  title,
  eyebrowStyle,
  titleStyle,
}: StudioValuesProps) {
  const safeEyebrow = resolveText(eyebrow);
  const safeTitle   = resolveText(title);
  return (
    <section className="bg-transparent py-10 sm:py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow={safeEyebrow}
            title={safeTitle}
            eyebrowStyle={eyebrowStyle}
            titleStyle={titleStyle}
          />
          <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div key={value} data-reveal className="pt-1">
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
