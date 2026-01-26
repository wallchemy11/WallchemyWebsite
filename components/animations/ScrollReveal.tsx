"use client";

import { useEffect, useRef } from "react";
import { useMotionPrefs } from "@/components/animations/useMotionPrefs";
import { loadGsap } from "@/components/animations/loadGsap";

type ScrollRevealProps = {
  children: React.ReactNode;
  selector?: string;
  y?: number;
  start?: string;
};

export default function ScrollReveal({
  children,
  selector = "[data-reveal]",
  y = 60,
  start = "top 75%"
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useMotionPrefs();

  useEffect(() => {
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
          container.querySelectorAll(selector)
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start,
            end: "bottom 60%",
            toggleActions: "play none none reverse"
          }
        });

        items.forEach((item, index) => {
          const type = item.dataset.reveal;

          if (type === "image") {
            tl.fromTo(
              item,
              {
                y: y + 20,
                opacity: 0,
                scale: 1.04
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.4,
                ease: "power4.out"
              },
              index === 0 ? 0 : "<0.12"
            );
            return;
          }

          if (type === "mask") {
            tl.fromTo(
              item,
              { y: 20, opacity: 0, clipPath: "inset(0 0 100% 0)" },
              {
                y: 0,
                opacity: 1,
                clipPath: "inset(0 0 0 0)",
                duration: 1.4,
                ease: "power4.out"
              },
              index === 0 ? 0 : "<0.1"
            );
            return;
          }

          tl.fromTo(
            item,
            { y, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power4.out"
            },
            index === 0 ? 0 : "<0.08"
          );
        });
      }, container);

      cleanup = () => ctx.revert();
    })();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [selector, y, start, shouldAnimate]);

  return <div ref={containerRef}>{children}</div>;
}
