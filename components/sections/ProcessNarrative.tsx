"use client";

import { useLayoutEffect, useRef } from "react";
import { useMotionPrefs } from "@/components/animations/useMotionPrefs";
import { loadGsap } from "@/components/animations/loadGsap";
import { resolveText } from "@/lib/text";

type ProcessNarrativeProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps: { title: string; body: string }[];
};

export default function ProcessNarrative({
  eyebrow,
  title,
  subtitle,
  steps
}: ProcessNarrativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useMotionPrefs();
  const safeEyebrow = resolveText(eyebrow);
  const safeTitle = resolveText(title);
  const safeSubtitle = resolveText(subtitle);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const pinned = pinRef.current;
    if (!container || !pinned) return;
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
              pin: pinned,
              pinSpacing: false
            });
          }
        });

        const stepEls = gsap.utils.toArray<HTMLElement>(
          container.querySelectorAll(".process-step")
        );
        stepEls.forEach((stepEl, index) => {
          gsap.fromTo(
            stepEl,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              delay: index * 0.05,
              scrollTrigger: {
                trigger: stepEl,
                start: "top 85%"
              }
            }
          );
        });
      }, container);

      cleanup = () => ctx.revert();
    })();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [shouldAnimate]);

  return (
    <section ref={containerRef} className="bg-ink py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <div ref={pinRef} className="self-start space-y-8">
          <p className="text-[10px] uppercase tracking-[0.36em] text-brass/90 sm:text-xs sm:tracking-[0.45em]">
            {safeEyebrow}
          </p>
          <h2 className="font-display text-3xl font-medium leading-tight sm:text-4xl md:text-6xl">
            {safeTitle}
          </h2>
          <p className="text-xs uppercase tracking-[0.18em] text-alabaster/70 sm:text-sm md:tracking-[0.2em]">
            {safeSubtitle}
          </p>
        </div>
        <div className="space-y-10">
          {steps.map((step, index) => (
            <div
              key={`${step.title}-${index}`}
              className="process-step border-b border-alabaster/10 pb-8"
            >
              <div className="flex items-start gap-6">
                <p className="text-[10px] uppercase tracking-[0.36em] text-brass/90 sm:text-xs sm:tracking-[0.45em]">
                  {(index + 1).toString().padStart(2, "0")}
                </p>
                <div>
                  <h3 className="font-display text-xl uppercase tracking-[0.18em] text-alabaster sm:text-2xl md:tracking-[0.22em]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-alabaster/75 sm:text-base">
                    {step.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
