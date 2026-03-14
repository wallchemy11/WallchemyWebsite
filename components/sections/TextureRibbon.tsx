"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
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
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [failedImages, setFailedImages] = useState<Record<string, true>>({});
  const ribbonItems = useMemo(() => [...items, ...items], [items]);
  const { shouldAnimate } = useMotionPrefs();
  const safeEyebrow = resolveText(eyebrow);
  const safeTitle = resolveText(title);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pinEl = pinRef.current;
    const track = trackRef.current;
    if (!section || !pinEl || !track) return;
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
              Math.max(200, track.scrollWidth - pinEl.offsetWidth);

            const scrollDistance = getDistance();
            ScrollTrigger.create({
              trigger: pinEl,
              start: "center center",
              end: () => `+=${getDistance() * 0.8}`,
              pin: true,
              pinSpacing: true
            });
            gsap.fromTo(
              track,
              { x: -scrollDistance },
              {
                x: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: pinEl,
                  start: "center center",
                  end: () => `+=${getDistance() * 0.8}`,
                  scrub: 0.9,
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
    <section ref={sectionRef} className="relative overflow-hidden bg-ink">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-8 md:pt-20 md:pb-10">
        <p className="text-xs uppercase tracking-[0.45em] text-brass">
          {safeEyebrow}
        </p>
        <h2 className="font-display mt-4 text-3xl md:text-5xl">
          {safeTitle}
        </h2>
      </div>
      <div
        ref={pinRef}
        className="overflow-x-auto md:flex md:min-h-[70vh] md:items-center md:overflow-visible"
      >
        <div
          ref={trackRef}
          className="flex w-max items-center gap-6 px-6 py-10 md:gap-10 md:py-0"
        >
          {ribbonItems.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="w-[200px] flex-shrink-0 sm:w-[260px] md:w-[320px]"
            >
              <div className="aspect-[3/4] w-full overflow-hidden">
                {!failedImages[`${item.title}-${index}-${item.heroImage}`] ? (
                  <Image
                    src={item.heroImage}
                    alt={item.title}
                    width={400}
                    height={533}
                    sizes="(max-width: 768px) 200px, 320px"
                    quality={70}
                    className="h-full w-full object-cover"
                    onError={() =>
                      setFailedImages((prev) => ({
                        ...prev,
                        [`${item.title}-${index}-${item.heroImage}`]: true
                      }))
                    }
                  />
                ) : null}
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
