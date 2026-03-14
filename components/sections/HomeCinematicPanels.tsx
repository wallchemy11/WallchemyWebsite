"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useState } from "react";
import Image from "next/image";
import { useMotionPrefs } from "@/components/animations/useMotionPrefs";
import { loadGsap } from "@/components/animations/loadGsap";

type Panel = {
  title: string;
  shortDescription: string;
  heroImage: string;
  images?: string[];
};

type HomeCinematicPanelsProps = {
  panels: Panel[];
};

export default function HomeCinematicPanels({
  panels
}: HomeCinematicPanelsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<HTMLDivElement[]>([]);
  const { shouldAnimate } = useMotionPrefs();
  const [failedImages, setFailedImages] = useState<Record<string, true>>({});
  const items = useMemo(() => panels.filter(Boolean), [panels]);

  const isVisible = (key: string) => !failedImages[key];
  const markFailed = (key: string) =>
    setFailedImages((prev) => ({ ...prev, [key]: true }));

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || panelRefs.current.length === 0) return;
    if (!shouldAnimate) return;

    let mounted = true;
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap, ScrollTrigger } = await loadGsap();
      if (!mounted) return;

      const ctx = gsap.context(() => {
        ScrollTrigger.matchMedia({
          "(min-width: 1024px) and (pointer: fine)": () => {
            const segment = 1.6;
            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "center center",
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
          },
          "(max-width: 1023px), (pointer: coarse)": () => {
            panelRefs.current.forEach((panel) => {
              gsap.set(panel, { clearProps: "all", autoAlpha: 1 });
            });
          }
        });
      }, section);

      cleanup = () => ctx.revert();
    })();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [shouldAnimate, items.length]);

  if (items.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative bg-ink">
      <div className="md:hidden">
        {items.map((panel, index) => {
          const source =
            panel.images && panel.images.length > 0
              ? panel.images
              : [panel.heroImage];
          const frames = [...source].filter(Boolean).slice(0, 4);
          return (
            <article
              key={`${panel.title}-mobile-${index}`}
              className="border-b border-alabaster/10 bg-gradient-to-b from-[#15110f] via-[#0f0d0c] to-ink px-5 py-8 last:border-b-0"
            >
              <div className="overflow-x-auto pb-2">
                <div className="flex w-max items-center gap-4">
                  {frames.map((src, frameIndex) => {
                    const imageKey = `${panel.title}-m-${index}-${frameIndex}-${src}`;
                    if (!isVisible(imageKey)) return null;
                    return (
                      <div
                        key={imageKey}
                        className="h-[42svh] w-[46vw] min-w-[154px] max-w-[210px] rounded-sm border border-alabaster/20 bg-alabaster/[0.04] p-2"
                      >
                        <div className="h-full w-full overflow-hidden bg-[#151210]">
                          <Image
                            src={src}
                            alt={`${panel.title} ${frameIndex + 1}`}
                            width={420}
                            height={560}
                            sizes="46vw"
                            quality={68}
                            className="h-full w-full object-contain"
                            priority={index === 0 && frameIndex === 0}
                            onError={() => markFailed(imageKey)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-brass">
                  Curated Finish
                </p>
                <h2 className="font-display mt-2 text-[1.7rem]">{panel.title}</h2>
                <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-alabaster/70">
                  {panel.shortDescription}
                </p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="relative hidden h-auto overflow-visible md:block md:h-[82vh] lg:h-[90vh] md:overflow-hidden">
        {items.map((panel, index) => (
          <div
            key={panel.title}
            ref={(el) => {
              if (el) panelRefs.current[index] = el;
            }}
            className="relative min-h-[60vh] will-change-[opacity] md:absolute md:inset-0 md:min-h-0"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(201,166,107,0.14),transparent_45%),radial-gradient(circle_at_80%_85%,rgba(120,93,66,0.18),transparent_50%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#15110f] via-[#0f0d0c] to-ink" />
            <div className="absolute inset-0 mx-auto hidden max-w-6xl px-6 py-10 md:block">
              <div className="grid h-full grid-cols-12 grid-rows-6 gap-4 lg:gap-6">
                {(() => {
                  const source =
                    panel.images && panel.images.length > 0
                      ? panel.images
                      : [panel.heroImage];
                  const frames = [...source].filter(Boolean).slice(0, 4);
                  const frameClasses = [
                    "col-span-4 row-span-4",
                    "col-span-5 row-span-3",
                    "col-span-4 row-span-4",
                    "col-span-5 row-span-3"
                  ];
                  const frameStarts = [
                    "col-start-1 row-start-1",
                    "col-start-4 row-start-1",
                    "col-start-9 row-start-2",
                    "col-start-3 row-start-4"
                  ];
                  return frames.map((src, frameIndex) => {
                    const imageKey = `${panel.title}-${index}-${frameIndex}-${src}`;
                    if (!isVisible(imageKey)) return null;
                    return (
                      <div
                        key={imageKey}
                        className={`rounded-sm border border-alabaster/20 bg-alabaster/[0.04] p-2 shadow-[0_18px_40px_rgba(0,0,0,0.35)] ${frameClasses[frameIndex]} ${frameStarts[frameIndex]}`}
                      >
                        <div
                          className={`h-full w-full overflow-hidden bg-[#151210] ${
                            frameIndex % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"
                          }`}
                        >
                          <Image
                            src={src}
                            alt={`${panel.title} ${frameIndex + 1}`}
                            width={900}
                            height={1200}
                            sizes="(max-width: 1200px) 30vw, 24vw"
                            quality={72}
                            className="h-full w-full object-contain"
                            priority={index === 0 && frameIndex === 0}
                            onError={() => markFailed(imageKey)}
                          />
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
            <div className="absolute inset-0 block md:hidden">
              {(() => {
                const source =
                  panel.images && panel.images.length > 0
                    ? panel.images
                    : [panel.heroImage];
                const frames = [...source].filter(Boolean).slice(0, 4);
                return (
                  <div className="h-full overflow-x-auto px-5 py-7 sm:px-6 sm:py-8">
                    <div className="flex h-full w-max items-center gap-4">
                      {frames.map((src, frameIndex) => {
                        const imageKey = `${panel.title}-m-${index}-${frameIndex}-${src}`;
                        if (!isVisible(imageKey)) return null;
                        return (
                          <div
                            key={imageKey}
                            className="h-[44svh] w-[46vw] min-w-[156px] max-w-[214px] rounded-sm border border-alabaster/20 bg-alabaster/[0.04] p-2 sm:h-[50svh] sm:w-[42vw]"
                          >
                            <div className="h-full w-full overflow-hidden bg-[#151210]">
                              <Image
                                src={src}
                                alt={`${panel.title} ${frameIndex + 1}`}
                                width={420}
                                height={560}
                                sizes="42vw"
                                quality={68}
                                className="h-full w-full object-contain"
                                priority={index === 0 && frameIndex === 0}
                                onError={() => markFailed(imageKey)}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/90" />
            <div className="absolute inset-0 flex items-end">
              <div className="mx-auto w-full max-w-6xl px-5 pb-12 sm:px-6 sm:pb-16 md:pb-20">
                <p className="text-[10px] uppercase tracking-[0.25em] text-brass sm:text-xs sm:tracking-[0.4em]">
                  Curated Finish
                </p>
                <h2 className="font-display mt-3 text-[1.8rem] sm:text-3xl md:text-5xl">
                  {panel.title}
                </h2>
                <p className="mt-2 max-w-2xl text-[11px] uppercase tracking-[0.12em] text-alabaster/70 sm:mt-3 sm:text-sm sm:tracking-[0.18em] md:tracking-[0.2em]">
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
