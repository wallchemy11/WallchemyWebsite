"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useMotionPrefs } from "@/components/animations/useMotionPrefs";
import { loadGsap } from "@/components/animations/loadGsap";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { shouldAnimate } = useMotionPrefs();

  // ── Snap overlay to full coverage the moment a nav click fires ────────────
  // This gives instant visual feedback before Next.js resolves the new page.
  useEffect(() => {
    const cover = async () => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      if (!shouldAnimate) {
        overlay.style.transform = "scaleY(1)";
        return;
      }
      const { gsap } = await loadGsap();
      gsap.killTweensOf(overlay);
      gsap.set(overlay, { scaleY: 1 });
    };

    window.addEventListener("wc:nav-start", cover);
    return () => window.removeEventListener("wc:nav-start", cover);
  }, [shouldAnimate]);

  // ── Lift overlay once the new page is ready ───────────────────────────────
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (!shouldAnimate) {
      overlay.style.transform = "scaleY(0)";
      return;
    }

    let active = true;
    (async () => {
      const { gsap } = await loadGsap();
      if (!active) return;
      gsap.fromTo(
        overlay,
        { scaleY: 1 },
        {
          scaleY: 0,
          transformOrigin: "top",
          duration: 0.5,
          ease: "power3.out",
          onComplete: () => { window.dispatchEvent(new CustomEvent("wc:page-ready")); }
        }
      );
    })();

    return () => { active = false; };
  }, [pathname, shouldAnimate]);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-[40] origin-top bg-ink"
    />
  );
}
