"use client";

import { useEffect, useRef } from "react";
import { useMotionPrefs } from "@/components/animations/useMotionPrefs";
import { loadGsap } from "@/components/animations/loadGsap";

type SplitTextProps = {
  text: string;
  className?: string;
};

export default function SplitText({ text, className }: SplitTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { shouldAnimate, isMobile } = useMotionPrefs();

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;
    if (!shouldAnimate) return;

    const words = element.querySelectorAll(".split-word");

    let mounted = true;
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap } = await loadGsap();
      if (!mounted) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          words,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power4.out",
            stagger: 0.04,
            scrollTrigger: {
              trigger: element,
              start: "top 80%"
            }
          }
        );
      }, element);

      cleanup = () => ctx.revert();
    })();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [shouldAnimate]);

  return (
    <p ref={textRef} className={className}>
      {isMobile
        ? text
        : text.split(" ").map((word, index) => (
            <span key={`${word}-${index}`} className="split-word">
              {word}&nbsp;
            </span>
          ))}
    </p>
  );
}
