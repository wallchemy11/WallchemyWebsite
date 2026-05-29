"use client";

import { useEffect, useMemo, useRef } from "react";
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

export default function HomeCinematicPanels({ panels }: HomeCinematicPanelsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<HTMLDivElement[]>([]);
  const { shouldAnimate } = useMotionPrefs();
  const [failedImages, setFailedImages] = useState<Record<string, true>>({});
  const items = useMemo(() => panels.filter(Boolean), [panels]);

  const isVisible = (key: string) => !failedImages[key];
  const markFailed = (key: string) =>
    setFailedImages((prev) => ({ ...prev, [key]: true }));

  useEffect(() => {
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
              const heroImg = panel.querySelector<HTMLElement>(".panel-hero-img");
              if (index === 0) {
                gsap.set(panel, { autoAlpha: 1 });
                if (heroImg) gsap.set(heroImg, { scale: 1 });
              } else {
                gsap.set(panel, { autoAlpha: 0 });
                if (heroImg) gsap.set(heroImg, { scale: 1.05 });
              }
            });

            panelRefs.current.forEach((panel, index) => {
              if (index === 0) {
                timeline.addLabel(`panel-${index}`, 0);
                return;
              }

              const heroImg = panel.querySelector<HTMLElement>(".panel-hero-img");

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

              if (heroImg) {
                timeline.to(
                  heroImg,
                  { scale: 1, duration: 1.4, ease: "power2.out" },
                  `panel-${index}+=0.2`
                );
              }
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

  const total = String(items.length).padStart(2, "0");

  return (
    <section ref={sectionRef} className="relative bg-transparent">

      {/* ── Mobile layout ── */}
      <div className="md:hidden">
        {items.map((panel, index) => {
          const source = panel.images?.length ? panel.images : [panel.heroImage];
          const frames = source.filter(Boolean);
          const heroFrame = frames[0];
          const secondaryFrames = frames.slice(1, 3);
          const panelNum = String(index + 1).padStart(2, "0");

          return (
            <article
              key={`${panel.title}-mobile-${index}`}
              className="border-b border-alabaster/10 last:border-b-0"
            >
              {/* Hero image — full bleed portrait */}
              {heroFrame && isVisible(`${panel.title}-mh-${index}`) && (
                <div className="relative h-[58svh] overflow-hidden">
                  <Image
                    src={heroFrame}
                    alt={panel.title}
                    fill
                    sizes="100vw"
                    quality={75}
                    className="object-cover"
                    priority={index === 0}
                    onError={() => markFailed(`${panel.title}-mh-${index}`)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/70" />
                </div>
              )}

              {/* Text block */}
              <div className="px-5 py-6">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 flex-shrink-0 bg-brass" />
                  <p className="text-[10px] uppercase tracking-[0.3em] text-brass">Top Finishes</p>
                  <span className="ml-auto font-mono text-[11px] text-alabaster/25">{panelNum}</span>
                </div>
                <h2 className="font-display mt-3 text-[2rem] leading-none">{panel.title}</h2>
                <p className="mt-3 text-sm uppercase tracking-[0.15em] leading-relaxed text-alabaster/55 whitespace-pre-line">
                  {panel.shortDescription}
                </p>
              </div>

              {/* Secondary images — 2-col grid */}
              {secondaryFrames.length > 0 && (
                <div className="grid grid-cols-2 gap-1 px-5 pb-8">
                  {secondaryFrames.map((src, fi) => {
                    const key = `${panel.title}-ms-${index}-${fi}`;
                    if (!isVisible(key)) return null;
                    return (
                      <div
                        key={key}
                        className="relative h-[28svh] overflow-hidden rounded-sm border border-alabaster/15"
                      >
                        <Image
                          src={src}
                          alt={`${panel.title} detail`}
                          fill
                          sizes="45vw"
                          quality={65}
                          className="object-cover"
                          onError={() => markFailed(key)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* ── Desktop layout — pinned scroll crossfade ── */}
      <div className="relative hidden md:block md:h-screen overflow-hidden">
        {items.map((panel, index) => {
          const source = panel.images?.length ? panel.images : [panel.heroImage];
          const frames = source.filter(Boolean);
          const heroFrame = frames[0];
          const subFrame1 = frames[1];
          const subFrame2 = frames[2];
          const panelNum = String(index + 1).padStart(2, "0");

          return (
            <div
              key={panel.title}
              ref={(el) => { if (el) panelRefs.current[index] = el; }}
              className="absolute inset-0 will-change-[opacity]"
            >
              {/* Warm ambient background */}
              <div className="absolute inset-0 bg-[#0d0b0a]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_58%_50%,rgba(201,166,107,0.09),transparent_70%)]" />

              {/* Editorial diptych */}
              <div className="absolute inset-0 flex">

                {/* Left — dominant portrait hero */}
                <div className="relative w-1/2 overflow-hidden">
                  {heroFrame && isVisible(`${panel.title}-${index}-hero`) ? (
                    <>
                      <Image
                        src={heroFrame}
                        alt={panel.title}
                        fill
                        sizes="50vw"
                        quality={80}
                        className="panel-hero-img object-cover"
                        priority={index === 0}
                        onError={() => markFailed(`${panel.title}-${index}-hero`)}
                      />
                      {/* 1 px inner frame */}
                      <div className="pointer-events-none absolute inset-[10px] border border-alabaster/10" />
                      {/* Right-edge fade into panel bg */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0d0b0a]/65" />
                      {/* Top vignette */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0b0a]/30 via-transparent to-transparent" />
                    </>
                  ) : null}
                </div>

                {/* Right — sub-images + text */}
                <div className="relative flex w-1/2 flex-col">

                  {/* Top zone: staggered sub-image pair */}
                  <div className="flex flex-1 items-start gap-4 px-8 pt-10 pb-4 lg:px-10 lg:pt-12">
                    {subFrame1 && isVisible(`${panel.title}-${index}-sub1`) ? (
                      <div className="relative h-[28vh] flex-[1.5] overflow-hidden rounded-sm border border-alabaster/15 lg:h-[32vh]">
                        <Image
                          src={subFrame1}
                          alt={`${panel.title} secondary`}
                          fill
                          sizes="25vw"
                          quality={72}
                          className="object-cover"
                          onError={() => markFailed(`${panel.title}-${index}-sub1`)}
                        />
                      </div>
                    ) : null}
                    {subFrame2 && isVisible(`${panel.title}-${index}-sub2`) ? (
                      <div className="relative mt-12 h-[20vh] flex-1 overflow-hidden rounded-sm border border-alabaster/15 lg:mt-14 lg:h-[22vh]">
                        <Image
                          src={subFrame2}
                          alt={`${panel.title} detail`}
                          fill
                          sizes="20vw"
                          quality={70}
                          className="object-cover"
                          onError={() => markFailed(`${panel.title}-${index}-sub2`)}
                        />
                      </div>
                    ) : null}
                  </div>

                  {/* Bottom zone: text block */}
                  <div className="relative px-8 pb-12 lg:px-10 lg:pb-16">
                    {/* Ghost numeral behind text */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute right-8 bottom-10 select-none font-mono text-[9rem] font-bold leading-none text-brass/[0.05] lg:right-10 lg:bottom-12 lg:text-[11rem]"
                    >
                      {panelNum}
                    </span>

                    {/* Eyebrow + counter */}
                    <div className="mb-4 flex items-center gap-3">
                      <span className="h-px w-6 flex-shrink-0 bg-brass" />
                      <p className="text-[10px] uppercase tracking-[0.35em] text-brass">Top Finishes</p>
                      <span className="ml-auto font-mono text-xs text-alabaster/30">{panelNum} / {total}</span>
                    </div>

                    {/* Finish name */}
                    <h2 className="font-display text-4xl leading-[0.95] lg:text-5xl xl:text-[3.5rem]">
                      {panel.title}
                    </h2>

                    {/* Description */}
                    <p className="mt-4 max-w-xs text-sm uppercase tracking-[0.16em] leading-relaxed text-alabaster/55 whitespace-pre-line lg:mt-5">
                      {panel.shortDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
