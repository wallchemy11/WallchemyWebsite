"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useMotionPrefs } from "@/components/animations/useMotionPrefs";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { shouldAnimate } = useMotionPrefs();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (!shouldAnimate) return;

    gsap.fromTo(
      overlay,
      { scaleY: 1 },
      {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1,
        ease: "power3.out"
      }
    );
  }, [pathname, shouldAnimate]);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-[40] origin-top bg-ink"
    />
  );
}
