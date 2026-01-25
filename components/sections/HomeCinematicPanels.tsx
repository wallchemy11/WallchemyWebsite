"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Panel = {
  title: string;
  shortDescription: string;
  heroImage: string;
};

type HomeCinematicPanelsProps = {
  panels: Panel[];
};

export default function HomeCinematicPanels({
  panels
}: HomeCinematicPanelsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<HTMLDivElement[]>([]);

  const items = useMemo(() => panels.slice(0, 3), [panels]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || panelRefs.current.length === 0) return;

    const ctx = gsap.context(() => {
      const segment = 1.6;
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${items.length * 900}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1
        }
      });

      panelRefs.current.forEach((panel, index) => {
        if (index === 0) {
          gsap.set(panel, { autoAlpha: 1 });
        } else {
          gsap.set(panel, { autoAlpha: 0 });
        }
      });

      panelRefs.current.forEach((panel, index) => {
        if (index === 0) {
          timeline.addLabel(`panel-${index}`, 0);
          return;
        }

        timeline
          .addLabel(`panel-${index}`, index * segment)
          .to(
            panelRefs.current[index - 1],
            { autoAlpha: 0, duration: 0.8, ease: "power2.out" },
            `panel-${index}`
          )
          .fromTo(
            panel,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 1.1, ease: "power2.out" },
            `panel-${index}+=0.2`
          );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-ink">
      <div className="relative h-[90vh] overflow-hidden">
        {items.map((panel, index) => (
          <div
            key={panel.title}
            ref={(el) => {
              if (el) panelRefs.current[index] = el;
            }}
            className="absolute inset-0 will-change-[opacity]"
          >
            <Image
              src={panel.heroImage}
              alt={panel.title}
              fill
              sizes="100vw"
              quality={70}
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/50 to-ink" />
            <div className="absolute inset-0 flex items-end">
              <div className="mx-auto w-full max-w-6xl px-6 pb-20">
                <p className="text-xs uppercase tracking-[0.4em] text-brass">
                  Curated Finish
                </p>
                <h2 className="font-display mt-4 text-3xl md:text-5xl">
                  {panel.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm uppercase tracking-[0.2em] text-alabaster/70">
                  {panel.shortDescription}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
