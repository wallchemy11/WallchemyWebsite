"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import { resolveText } from "@/lib/text";

type CraftsmanshipSectionProps = {
  title?: string;
  body?: string;
};

export default function CraftsmanshipSection({
  title,
  body
}: CraftsmanshipSectionProps) {
  const safeTitle = resolveText(title);
  const safeBody = resolveText(body);
  if (!safeTitle && !safeBody) return null;

  return (
    <section className="bg-ink py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
            <h2
              data-reveal
              className="font-display text-2xl font-medium leading-tight sm:text-3xl md:text-4xl"
            >
              {safeTitle}
            </h2>
            <p
              data-reveal
              className="text-sm leading-relaxed text-alabaster/80 sm:text-base md:tracking-[0.02em]"
            >
              {safeBody}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
