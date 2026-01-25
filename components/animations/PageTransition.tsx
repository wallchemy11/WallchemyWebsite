"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

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
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-[60] origin-top bg-ink"
    />
  );
}
