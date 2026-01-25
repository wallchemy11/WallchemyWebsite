"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TextureRibbonItem = {
  title: string;
  heroImage: string;
};

type TextureRibbonProps = {
  items: TextureRibbonItem[];
};

export default function TextureRibbon({ items }: TextureRibbonProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const ribbonItems = useMemo(() => [...items, ...items], [items]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink py-16">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.45em] text-brass">
          Material Library
        </p>
        <h2 className="font-display mt-4 text-3xl md:text-5xl">
          A continuous ribbon of curated finishes.
        </h2>
      </div>
      <div className="mt-12">
        <div
          ref={trackRef}
          className="flex w-max items-center gap-10 px-6 pb-12"
        >
          {ribbonItems.map((item, index) => (
            <div key={`${item.title}-${index}`} className="w-[320px] md:w-[420px]">
              <div className="overflow-hidden">
                <Image
                  src={item.heroImage}
                  alt={item.title}
                  width={640}
                  height={800}
                  sizes="(max-width: 768px) 80vw, 420px"
                  quality={70}
                  className="h-[460px] w-full object-cover"
                />
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.35em] text-brass">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
