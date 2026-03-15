"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { useMotionPrefs } from "@/components/animations/useMotionPrefs";
import { loadGsap } from "@/components/animations/loadGsap";

type DramaticImageRevealProps = {
  image: string;
  alt?: string;
};

export default function DramaticImageReveal({
  image,
  alt = "Why Wallchemy"
}: DramaticImageRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useMotionPrefs();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const imageEl = imageRef.current;
    if (!section || !imageEl) return;
    if (!shouldAnimate) return;

    let mounted = true;
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap } = await loadGsap();
      if (!mounted) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          imageEl,
          { scale: 1.16 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "bottom 30%",
              scrub: 0.8
            }
          }
        );
      }, section);

      cleanup = () => ctx.revert();
    })();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [shouldAnimate]);

  return (
    <section ref={sectionRef} className="bg-ink pt-0 pb-2 sm:pb-3 md:pb-4">
      <div className="mx-auto max-w-6xl px-6">
        <div ref={imageRef} className="overflow-hidden border border-alabaster/10">
          <Image
            src={image}
            alt={alt}
            width={1800}
            height={1000}
            sizes="(max-width: 768px) 100vw, 1200px"
            quality={72}
            className="h-[240px] w-full object-cover sm:h-[320px] md:h-[460px]"
          />
        </div>
      </div>
    </section>
  );
}
