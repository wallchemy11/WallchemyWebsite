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
    let cleanup: (() => void) | undefined;
    let fallbackTimer: ReturnType<typeof setTimeout>;

    // ── Phase 1: load GSAP and hide elements immediately ──────────────────
    // Runs ASAP so elements are already at opacity:0 when the LogoIntro
    // overlay fades out, preventing the visible→hidden flash.
    loadGsap().then(({ gsap }) => {
      if (!mounted) return;

      const ctx = gsap.context(() => {
        const [headline, ...rest] = gsap.utils.toArray<HTMLElement>(
          container.querySelectorAll("[data-hero]")
        );
        if (!headline) return;

        gsap.set(headline, {
          scale: 1.55,
          opacity: 0,
          filter: "blur(18px)",
          transformOrigin: "left bottom"
        });
        if (rest.length) gsap.set(rest, { scale: 1.18, opacity: 0, y: 16 });
      }, container);

      cleanup = () => ctx.revert();
    });

    // ── Phase 2: animate in after intro is done ───────────────────────────
    const startAnim = async () => {
      const { gsap, ScrollTrigger } = await loadGsap(); // already cached
      if (!mounted) return;

      const ctx = gsap.context(() => {
        const [headline, ...rest] = gsap.utils.toArray<HTMLElement>(
          container.querySelectorAll("[data-hero]")
        );
        if (!headline) return;

        gsap.to(headline, {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 2.0,
          ease: "expo.out",
          delay: 0.05
        });

        if (rest.length) {
          gsap.to(rest, {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.6,
            ease: "expo.out",
            delay: 0.6,
            stagger: 0.12
          });
        }

        const heroSection = container.closest("section");
        if (heroSection) {
          gsap.fromTo(
            headline,
            { scale: 1, transformOrigin: "left bottom" },
            {
              scale: 1.28,
              ease: "none",
              scrollTrigger: {
                trigger: heroSection,
                start: "top top",
                end: "bottom top",
                scrub: 1.5
              }
            }
          );
        }
      }, container);

      cleanup = () => ctx.revert();
    };

    const onIntroDone = () => {
      clearTimeout(fallbackTimer);
      if (mounted) startAnim();
    };

    window.addEventListener("wc:intro-done", onIntroDone, { once: true });
    fallbackTimer = setTimeout(onIntroDone, 4500);

    return () => {
      mounted = false;
      clearTimeout(fallbackTimer);
      window.removeEventListener("wc:intro-done", onIntroDone);
      cleanup?.();
    };
  }, [shouldAnimate]);

  return <div ref={containerRef}>{children}</div>;
}
