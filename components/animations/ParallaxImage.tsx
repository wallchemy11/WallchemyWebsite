"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { useMotionPrefs } from "@/components/animations/useMotionPrefs";
import { loadGsap } from "@/components/animations/loadGsap";

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
  const { shouldAnimate } = useMotionPrefs();

  useLayoutEffect(() => {
    const element = imageRef.current;
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

      cleanup = () => ctx.revert();
    })();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [shouldAnimate]);

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
