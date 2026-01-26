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
          "(min-width: 768px)": () => {
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
    <section ref={containerRef} className="bg-ink py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[0.9fr_1.1fr]">
        <div ref={pinRef} className="space-y-6 self-start">
          <p className="text-xs uppercase tracking-[0.45em] text-brass">
            {safeEyebrow}
          </p>
          <h2 className="font-display text-4xl font-medium leading-tight md:text-6xl">
            {safeTitle}
          </h2>
          <p className="text-base uppercase tracking-[0.18em] text-alabaster/80">
            {safeSubtitle}
          </p>
        </div>
        <div className="space-y-12">
          {items.map((item) => (
            <div key={item.eyebrow} className="manifesto-item border-l border-alabaster/10 pl-6">
              <p className="text-xs uppercase tracking-[0.35em] text-brass">
                {item.eyebrow}
              </p>
              <p className="mt-4 text-xl text-alabaster/85">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
