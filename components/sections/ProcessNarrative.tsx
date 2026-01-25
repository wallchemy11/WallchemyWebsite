"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ProcessNarrativeProps = {
  title: string;
  steps: string[];
};

export default function ProcessNarrative({
  title,
  steps
}: ProcessNarrativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const pinned = pinRef.current;
    if (!container || !pinned) return;

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

      const steps = gsap.utils.toArray<HTMLElement>(
        container.querySelectorAll(".process-step")
      );
      steps.forEach((step, index) => {
        gsap.fromTo(
          step,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: index * 0.05,
            scrollTrigger: {
              trigger: step,
              start: "top 85%"
            }
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-ink py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <div ref={pinRef} className="self-start space-y-8">
          <p className="text-[10px] uppercase tracking-[0.36em] text-brass/90 sm:text-xs sm:tracking-[0.45em]">
            Process
          </p>
          <h2 className="font-display text-3xl font-medium leading-tight sm:text-4xl md:text-6xl">
            {title}
          </h2>
        </div>
        <div className="space-y-10">
          {steps.map((step, index) => (
            <div
              key={step}
              className="process-step border-b border-alabaster/10 pb-8"
            >
              <div className="flex items-start gap-6">
                <p className="text-[10px] uppercase tracking-[0.36em] text-brass/90 sm:text-xs sm:tracking-[0.45em]">
                  {(index + 1).toString().padStart(2, "0")}
                </p>
                <div>
                  <h3 className="font-display text-xl uppercase tracking-[0.18em] text-alabaster sm:text-2xl md:tracking-[0.22em]">
                    {step}
                  </h3>
                  <p className="mt-3 text-sm text-alabaster/75 sm:text-base">
                    Crafted with material testing, site alignment, and a focus
                    on long-term finish integrity.
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
