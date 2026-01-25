"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useMotionPrefs } from "@/components/animations/useMotionPrefs";

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

    return () => ctx.revert();
  }, [shouldAnimate]);

  return <div ref={containerRef}>{children}</div>;
}
