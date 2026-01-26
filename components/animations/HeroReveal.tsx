"use client";

import { useLayoutEffect, useRef } from "react";
import { useMotionPrefs } from "@/components/animations/useMotionPrefs";
import { loadGsap } from "@/components/animations/loadGsap";

type HeroRevealProps = {
  children: React.ReactNode;
};

export default function HeroReveal({ children }: HeroRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useMotionPrefs();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!shouldAnimate) return;

    let mounted = true;
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap } = await loadGsap();
      if (!mounted) return;

      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>(
          container.querySelectorAll("[data-hero]")
        );

        gsap.set(items, { y: 60, opacity: 0 });
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.2
        });
      }, container);

      cleanup = () => ctx.revert();
    })();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [shouldAnimate]);

  return <div ref={containerRef}>{children}</div>;
}
