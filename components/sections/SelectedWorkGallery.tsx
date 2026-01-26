"use client";

import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { resolveText } from "@/lib/text";
import type { SelectedWorkItem } from "@/lib/types/content";

type SelectedWorkGalleryProps = {
  items: SelectedWorkItem[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export default function SelectedWorkGallery({
  items,
  eyebrow,
  title,
  subtitle
}: SelectedWorkGalleryProps) {
  const safeEyebrow = resolveText(eyebrow);
  const safeTitle = resolveText(title);
  const safeSubtitle = resolveText(subtitle);

  if (!items.length) return null;

  return (
    <section className="bg-ink py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow={safeEyebrow}
            title={safeTitle}
            subtitle={safeSubtitle}
          />
          <div className="mt-12 grid gap-10 md:gap-12">
            {items.map((item) => (
              <article
                key={item.slug}
                className="grid gap-6 md:grid-cols-[1.1fr_1fr]"
              >
                <div data-reveal="image">
                  <Image
                    src={item.heroImage}
                    alt={item.title}
                    width={1200}
                    height={800}
                    sizes="(max-width: 768px) 100vw, 60vw"
                    quality={70}
                    className="h-[260px] w-full object-cover sm:h-[340px] md:h-[420px]"
                  />
                </div>
                <div data-reveal className="space-y-4">
                  <h3 className="font-display text-xl uppercase tracking-[0.18em] sm:text-2xl md:tracking-[0.2em]">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="text-xs text-alabaster/70 sm:text-sm">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
