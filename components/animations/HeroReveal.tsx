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

        gsap.set(headline, { opacity: 0, y: 20 });
        if (rest.length) gsap.set(rest, { opacity: 0, y: 12 });
      }, container);

      cleanup1 = () => ctx.revert();
    });

    // ── Phase 2: animate in ───────────────────────────────────────────────
    const startAnim = async () => {
      const { gsap, ScrollTrigger } = await loadGsap();
      if (!mounted) return;

      const ctx = gsap.context(() => {
        const [headline, ...rest] = gsap.utils.toArray<HTMLElement>(
          container.querySelectorAll("[data-hero]")
        );
        if (!headline) return;

        gsap.to(headline, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out"
        });

        if (rest.length) {
          gsap.to(rest, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            delay: 0.15,
            stagger: 0.09
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
      // Subsequent navigation: start immediately — text animates behind the
      // PageTransition overlay (500ms) so it's already mid-reveal when overlay lifts
      fallbackTimer = setTimeout(onIntroDone, 80);
    } else {
      // First load: wait for LogoIntro to complete
      window.addEventListener("wc:intro-done", onIntroDone, { once: true });
      fallbackTimer = setTimeout(onIntroDone, 4500);
    }

    return () => {
      mounted = false;
      clearTimeout(fallbackTimer);
      window.removeEventListener("wc:intro-done", onIntroDone);
      cleanup1?.();
      cleanup2?.();
    };
  }, [shouldAnimate]);

  return <div ref={containerRef}>{children}</div>;
}
