"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CinematicDividerProps = {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
};

export default function CinematicDivider({
  image,
  eyebrow,
  title,
  subtitle
}: CinematicDividerProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const imageEl = imageRef.current;
    const textEl = textRef.current;
    if (!section || !imageEl || !textEl) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 30%",
          scrub: 0.8
        }
      });

      tl.fromTo(
        imageEl,
        { scale: 1.18 },
        { scale: 1, ease: "none" },
        0
      ).fromTo(
        textEl,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
        0
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-ink py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div ref={imageRef} className="overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={1600}
            height={900}
            sizes="(max-width: 768px) 100vw, 1200px"
            quality={70}
            className="h-[260px] w-full object-cover sm:h-[360px] md:h-[520px]"
          />
        </div>
        <div
          ref={textRef}
          className="mt-8 grid gap-6 md:mt-10 md:grid-cols-[1.2fr_1fr]"
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.36em] text-brass sm:text-xs sm:tracking-[0.45em]">
              {eyebrow}
            </p>
            <h2 className="font-display mt-3 text-2xl sm:text-3xl md:text-5xl">
              {title}
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.18em] text-alabaster/70 sm:text-sm md:tracking-[0.2em]">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
