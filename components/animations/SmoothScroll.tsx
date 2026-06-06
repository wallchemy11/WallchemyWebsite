"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { loadGsap } from "@/components/animations/loadGsap";

export default function SmoothScroll() {
  const pathname   = useRef(usePathname());  // track without triggering setup re-run
  const pathnameV  = usePathname();          // reactive version for the scroll effect
  const lenisRef   = useRef<Lenis | null>(null);
  const stRef      = useRef<any>(null);      // ScrollTrigger ref

  // ── Scroll to top + refresh triggers on every route change ───────────────
  useEffect(() => {
    // rAF waits for Next.js to finish painting the new page before we move scroll
    const raf = requestAnimationFrame(() => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
      // Give layout a beat to settle, then recalculate all ScrollTrigger positions
      setTimeout(() => stRef.current?.refresh(), 120);
    });
    return () => cancelAnimationFrame(raf);
  }, [pathnameV]);

  // ── Lenis setup (desktop / fine-pointer only) ─────────────────────────────
  useEffect(() => {
    const hasCoarsePointer =
      typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    if (
      typeof window === "undefined" ||
      hasCoarsePointer ||
      window.matchMedia("(max-width: 767px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let mounted = true;
    let gsapRef: any;
    let update: ((time: number) => void) | null = null;
    let scrollUpdate: (() => void) | null = null;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;

    (async () => {
      const { gsap, ScrollTrigger } = await loadGsap();
      if (!mounted) return;
      gsapRef   = gsap;
      stRef.current = ScrollTrigger;

      scrollUpdate = ScrollTrigger.update;
      lenis.on("scroll", scrollUpdate);

      update = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();
    })();

    return () => {
      mounted = false;
      lenisRef.current = null;
      stRef.current    = null;
      if (update && gsapRef?.ticker && typeof gsapRef.ticker.remove === "function") {
        gsapRef.ticker.remove(update);
      }
      if (scrollUpdate) lenis.off("scroll", scrollUpdate);
      lenis.destroy();
    };
  }, []);

  return null;
}
