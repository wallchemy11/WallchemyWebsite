"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ProcessNarrativeProps = {
  title: string;
  intro: string;
  steps: string[];
};

export default function ProcessNarrative({
  title,
  intro,
  steps
}: ProcessNarrativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const pinned = pinRef.current;
    if (!container || !pinned) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: pinned,
        pinSpacing: false
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
    <section ref={containerRef} className="bg-ink py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[0.9fr_1.1fr]">
        <div ref={pinRef} className="space-y-6 self-start">
          <p className="text-xs uppercase tracking-[0.4em] text-brass">
            Process
          </p>
          <h2 className="text-3xl font-medium leading-tight md:text-5xl">
            {title}
          </h2>
          <p className="text-sm uppercase tracking-[0.2em] text-alabaster/70">
            {intro}
          </p>
        </div>
        <div className="space-y-10">
          {steps.map((step, index) => (
            <div
              key={step}
              className="process-step border-l border-alabaster/10 pl-6"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-brass">
                {(index + 1).toString().padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-xl uppercase tracking-[0.2em]">
                {step}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
