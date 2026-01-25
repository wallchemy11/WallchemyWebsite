"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type MaskedTextProps = {
  text: string;
  className?: string;
};

export default function MaskedText({ text, className }: MaskedTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

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

    return () => ctx.revert();
  }, []);

  return (
    <p ref={textRef} className={className}>
      {text}
    </p>
  );
}
