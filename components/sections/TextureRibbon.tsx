"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { useMotionPrefs } from "@/components/animations/useMotionPrefs";
import { loadGsap } from "@/components/animations/loadGsap";
import { resolveText } from "@/lib/text";

type TextureRibbonItem = {
  title: string;
  heroImage: string;
};

type TextureRibbonProps = {
  items: TextureRibbonItem[];
  eyebrow?: string;
  title?: string;
};

export default function TextureRibbon({
  items,
  eyebrow,
  title
}: TextureRibbonProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const ribbonItems = useMemo(() => [...items, ...items], [items]);
  const { shouldAnimate } = useMotionPrefs();
  const safeEyebrow = resolveText(eyebrow);
  const safeTitle = resolveText(title);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (!shouldAnimate) return;

    let mounted = true;
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap, ScrollTrigger } = await loadGsap();
      if (!mounted) return;

      const ctx = gsap.context(() => {
        ScrollTrigger.matchMedia({
          "(min-width: 768px)": () => {
            const getDistance = () =>
              Math.max(200, track.scrollWidth - section.offsetWidth);

            const scrollDistance = getDistance();
            gsap.fromTo(
              track,
              { x: -scrollDistance },
              {
                x: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top top",
                  end: () => `+=${getDistance() * 0.8}`,
                  scrub: 0.9,
                  pin: true,
                  invalidateOnRefresh: true
                }
              }
            );
          },
          "(max-width: 767px)": () => {
            gsap.set(track, { clearProps: "all" });
          }
        });
      }, section);

      cleanup = () => ctx.revert();
    })();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [shouldAnimate]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink py-16">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.45em] text-brass">
          {safeEyebrow}
        </p>
        <h2 className="font-display mt-4 text-3xl md:text-5xl">
          {safeTitle}
        </h2>
      </div>
      <div className="mt-8 overflow-x-auto md:mt-12 md:overflow-visible">
        <div
          ref={trackRef}
          className="flex w-max items-center gap-6 px-6 pb-10 md:gap-10 md:pb-12"
        >
          {ribbonItems.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="w-[240px] sm:w-[300px] md:w-[420px]"
            >
              <div className="overflow-hidden">
                <Image
                  src={item.heroImage}
                  alt={item.title}
                  width={640}
                  height={800}
                  sizes="(max-width: 768px) 80vw, 420px"
                  quality={70}
                  className="h-[300px] w-full object-cover sm:h-[360px] md:h-[460px]"
                />
              </div>
              <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-brass sm:text-xs sm:tracking-[0.35em]">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
