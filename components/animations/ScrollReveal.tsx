"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: React.ReactNode;
  selector?: string;
  y?: number;
};

export default function ScrollReveal({
  children,
  selector = "[data-reveal]",
  y = 60
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(
        container.querySelectorAll(selector)
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
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

    return () => ctx.revert();
  }, [selector, y]);

  return <div ref={containerRef}>{children}</div>;
}
