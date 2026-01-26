"use client";

import { useEffect, useRef } from "react";
import { useMotionPrefs } from "@/components/animations/useMotionPrefs";
import { loadGsap } from "@/components/animations/loadGsap";

type MaskedTextProps = {
  text: string;
  className?: string;
};

export default function MaskedText({ text, className }: MaskedTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { shouldAnimate } = useMotionPrefs();

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;
    if (!shouldAnimate) return;

    let mounted = true;
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap } = await loadGsap();
      if (!mounted) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          element,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0 0)",
            duration: 1.2,
            ease: "power3.out",
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
      {text}
    </p>
  );
}
