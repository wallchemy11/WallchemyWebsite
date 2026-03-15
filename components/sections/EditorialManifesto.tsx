"use client";

import { useLayoutEffect, useRef } from "react";
import { useMotionPrefs } from "@/components/animations/useMotionPrefs";
import { loadGsap } from "@/components/animations/loadGsap";
import { resolveText } from "@/lib/text";

type ManifestoItem = {
  eyebrow: string;
  text: string;
};

type EditorialManifestoProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items: ManifestoItem[];
};

export default function EditorialManifesto({
  eyebrow,
  title,
  subtitle,
  items
}: EditorialManifestoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useMotionPrefs();
  const safeEyebrow = resolveText(eyebrow);
  const safeTitle = resolveText(title);
  const safeSubtitle = resolveText(subtitle);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    if (!container || !pin) return;
    if (!shouldAnimate) return;

    let mounted = true;
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap, ScrollTrigger } = await loadGsap();
      if (!mounted) return;

      const ctx = gsap.context(() => {
        ScrollTrigger.matchMedia({
          "(min-width: 1024px) and (pointer: fine)": () => {
            ScrollTrigger.create({
              trigger: container,
              start: "top top",
              end: "bottom bottom",
              pin,
              pinSpacing: true
            });
          }
        });

        const items = gsap.utils.toArray<HTMLElement>(
          container.querySelectorAll(".manifesto-item")
        );
        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.18,
            scrollTrigger: {
              trigger: container,
              start: "top 80%"
            }
          }
        );
      }, container);

      cleanup = () => ctx.revert();
    })();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [shouldAnimate]);

  return (
    <section ref={containerRef} className="bg-ink pt-6 pb-16 sm:pt-8 sm:pb-20 md:pt-10 md:pb-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <div ref={pinRef} className="space-y-6 self-start">
          <p className="text-[11px] uppercase tracking-[0.3em] text-brass sm:text-xs sm:tracking-[0.45em]">
            {safeEyebrow}
          </p>
          <h2 className="font-display text-3xl font-medium leading-tight sm:text-4xl md:text-6xl">
            {safeTitle}
          </h2>
          <p className="whitespace-pre-line text-sm uppercase tracking-[0.12em] text-alabaster/80 sm:text-base sm:tracking-[0.18em]">
            {safeSubtitle}
          </p>
        </div>
        <div className="space-y-9 sm:space-y-12">
          {items.map((item) => (
            <div key={item.eyebrow} className="manifesto-item border-l border-alabaster/10 pl-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-brass sm:text-xs sm:tracking-[0.35em]">
                {item.eyebrow}
              </p>
              <p className="mt-3 text-lg text-alabaster/85 sm:mt-4 sm:text-xl">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
