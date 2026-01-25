"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  quality?: number;
};

export default function ParallaxImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 60vw",
  quality = 70
}: ParallaxImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = imageRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { y: -40 },
        {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }, element);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={imageRef} className={className}>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        sizes={sizes}
        quality={quality}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
