"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SplitTextProps = {
  text: string;
  className?: string;
};

export default function SplitText({ text, className }: SplitTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const words = element.querySelectorAll(".split-word");

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

    return () => ctx.revert();
  }, []);

  return (
    <p ref={textRef} className={className}>
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} className="split-word">
          {word}&nbsp;
        </span>
      ))}
    </p>
  );
}
