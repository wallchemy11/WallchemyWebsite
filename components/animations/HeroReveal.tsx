"use client";

import { useLayoutEffect, useRef } from "react";
import { useMotionPrefs } from "@/components/animations/useMotionPrefs";
import { loadGsap } from "@/components/animations/loadGsap";

type HeroRevealProps = {
  children: React.ReactNode;
};

export default function HeroReveal({ children }: HeroRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useMotionPrefs();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || !shouldAnimate) return;

    let mounted = true;
    let cleanup1: (() => void) | undefined;
    let cleanup2: (() => void) | undefined;
    let fallbackTimer: ReturnType<typeof setTimeout>;

    // ── Phase 1: hide elements immediately before first paint ─────────────
    loadGsap().then(({ gsap }) => {
      if (!mounted) return;

      const ctx = gsap.context(() => {
        const [headline, ...rest] = gsap.utils.toArray<HTMLElement>(
          container.querySelectorAll("[data-hero]")
        );
        if (!headline) return;

        gsap.set(headline, { opacity: 0, y: 18 });
        if (rest.length) gsap.set(rest, { opacity: 0, y: 10 });
      }, container);

      cleanup1 = () => ctx.revert();
    });

    // ── Phase 2: animate in after overlay is fully gone ───────────────────
    const startAnim = async () => {
      const { gsap } = await loadGsap();
      if (!mounted) return;

      const ctx = gsap.context(() => {
        const [headline, ...rest] = gsap.utils.toArray<HTMLElement>(
          container.querySelectorAll("[data-hero]")
        );
        if (!headline) return;

        // Fast, clean reveal — the overlay lift is the cinematic moment;
        // text just needs to appear crisply once it's visible.
        gsap.to(headline, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" });

        if (rest.length) {
          gsap.to(rest, {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            delay: 0.1,
            stagger: 0.07
          });
        }

        const heroSection = container.closest("section");
        if (heroSection) {
          gsap.fromTo(
            headline,
            { y: 0 },
            {
              y: -40,
              ease: "none",
              scrollTrigger: {
                trigger: heroSection,
                start: "top top",
                end: "bottom top",
                scrub: true
              }
            }
          );
        }
      }, container);

      cleanup2 = () => ctx.revert();
    };

    const onIntroDone = () => {
      clearTimeout(fallbackTimer);
      if (mounted) startAnim();
    };

    const introAlreadyDone = !!(window as any).__wcIntroDone;
    if (introAlreadyDone) {
      // Subsequent navigation: wait for the overlay to fully lift, THEN reveal.
      // Starting earlier caused mid-animation elements to show through the lifting overlay.
      window.addEventListener("wc:page-ready", onIntroDone, { once: true });
      fallbackTimer = setTimeout(onIntroDone, 1200); // safety net if event misfires
    } else {
      // First load: wait for LogoIntro to complete
      window.addEventListener("wc:intro-done", onIntroDone, { once: true });
      fallbackTimer = setTimeout(onIntroDone, 4500);
    }

    return () => {
      mounted = false;
      clearTimeout(fallbackTimer);
      window.removeEventListener("wc:intro-done", onIntroDone);
      window.removeEventListener("wc:page-ready", onIntroDone);
      cleanup1?.();
      cleanup2?.();
    };
  }, [shouldAnimate]);

  return <div ref={containerRef}>{children}</div>;
}
