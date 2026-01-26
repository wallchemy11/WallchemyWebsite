"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { loadGsap } from "@/components/animations/loadGsap";

export default function SmoothScroll() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(max-width: 767px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let mounted = true;
    let gsapRef: any;
    let scrollTriggerRef: any;
    let update: ((time: number) => void) | null = null;
    let scrollUpdate: (() => void) | null = null;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true
    });

    (async () => {
      const { gsap, ScrollTrigger } = await loadGsap();
      if (!mounted) return;
      gsapRef = gsap;
      scrollTriggerRef = ScrollTrigger;

      scrollUpdate = ScrollTrigger.update;
      lenis.on("scroll", scrollUpdate);

      update = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(update);

      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();
    })();

    return () => {
      mounted = false;
      // Defensive: only run if GSAP loaded
      if (
        update &&
        gsapRef?.ticker &&
        typeof gsapRef.ticker.remove === "function"
      ) {
        gsapRef.ticker.remove(update);
      }
      if (scrollUpdate) {
        lenis.off("scroll", scrollUpdate);
      }
      lenis.destroy();
    };
  }, []);

  return null;
}
