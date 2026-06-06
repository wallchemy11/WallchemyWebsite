"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { loadGsap } from "@/components/animations/loadGsap";

export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // ── Scroll to top on every route change (and on first mount) ─────────────
  useEffect(() => {
    // Prevent the browser from restoring the previous scroll position itself;
    // we handle it manually so Lenis and native scroll stay in sync.
    if (typeof window !== "undefined") {
      history.scrollRestoration = "manual";
    }

    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

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

    history.scrollRestoration = "manual";

    let mounted = true;
    let gsapRef: any;
    let update: ((time: number) => void) | null = null;
    let scrollUpdate: (() => void) | null = null;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true
    });

    lenisRef.current = lenis;

    (async () => {
      const { gsap, ScrollTrigger } = await loadGsap();
      if (!mounted) return;
      gsapRef = gsap;

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
      if (update && gsapRef?.ticker && typeof gsapRef.ticker.remove === "function") {
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
