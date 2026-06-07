"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { resolveText } from "@/lib/text";
import type { SelectedWorkItem } from "@/lib/types/content";

type SelectedWorkGalleryProps = {
  items: SelectedWorkItem[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  eyebrowStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  subtitleStyle?: CSSProperties;
};

export default function SelectedWorkGallery({
  items,
  eyebrow,
  title,
  subtitle,
  eyebrowStyle,
  titleStyle,
  subtitleStyle,
}: SelectedWorkGalleryProps) {
  const safeEyebrow = resolveText(eyebrow);
  const safeTitle = resolveText(title);
  const safeSubtitle = resolveText(subtitle);

  if (!items.length) return null;

  return (
    <section className="bg-transparent py-10 sm:py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow={safeEyebrow}
            title={safeTitle}
            subtitle={safeSubtitle}
            eyebrowStyle={eyebrowStyle}
            titleStyle={titleStyle}
            subtitleStyle={subtitleStyle}
          />
          <div className="mt-10 grid gap-9 sm:mt-12 sm:gap-10 md:gap-12">
            {items.map((item) => (
              <article
                key={item.slug}
                className="grid gap-5 sm:gap-6 md:grid-cols-[1.1fr_1fr]"
              >
                <div data-reveal="image">
                  <Image
                    src={item.heroImage}
                    alt={item.title}
                    width={1200}
                    height={800}
                    sizes="(max-width: 768px) 100vw, 60vw"
                    quality={70}
                    className="h-[220px] w-full object-cover sm:h-[320px] md:h-[420px]"
                  />
                </div>
                <div data-reveal className="space-y-4">
                  <h3 className="font-display text-xl uppercase tracking-[0.12em] sm:text-2xl sm:tracking-[0.16em] md:tracking-[0.2em]">
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
