"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMotionPrefs } from "@/components/animations/useMotionPrefs";
import { loadGsap } from "@/components/animations/loadGsap";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const loaderRef  = useRef<HTMLDivElement>(null);
  const pathname   = usePathname();
  const { shouldAnimate } = useMotionPrefs();
  // true on first mount so the initial overlay lifts on the first page load
  const navStarted = useRef(true);
  const gsapRef    = useRef<any>(null);

  useEffect(() => {
    loadGsap().then(({ gsap }) => { gsapRef.current = gsap; });
  }, []);

  // ── Cover: snap overlay opaque + reset star the instant nav fires ─────────
  useEffect(() => {
    const cover = () => {
      const overlay = overlayRef.current;
      const loader  = loaderRef.current;
      if (!overlay) return;
      navStarted.current = true;

      const gsap = gsapRef.current;
      if (gsap) {
        gsap.killTweensOf(overlay);
        gsap.killTweensOf(loader);
        gsap.set(overlay, { opacity: 1, pointerEvents: "auto" });
        // Reset star to its resting state before showing it
        if (loader) gsap.set(loader, { opacity: 1, scale: 1 });
      } else {
        overlay.style.opacity = "1";
        overlay.style.pointerEvents = "auto";
        if (loader) loader.style.opacity = "1";
      }
    };

    window.addEventListener("wc:nav-start", cover);
    return () => window.removeEventListener("wc:nav-start", cover);
  }, []);

  // ── Reveal: star expands outward while overlay dissolves ─────────────────
  useEffect(() => {
    const overlay = overlayRef.current;
    const loader  = loaderRef.current;
    if (!overlay) return;

    // Back/forward navigation — no overlay was shown, just clear state
    if (!navStarted.current) {
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
      if (loader) loader.style.opacity = "0";
      return;
    }
    navStarted.current = false;

    if (!shouldAnimate) {
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
      if (loader) loader.style.opacity = "0";
      window.dispatchEvent(new CustomEvent("wc:page-ready"));
      return;
    }

    let active = true;
    (async () => {
      const { gsap } = await loadGsap();
      if (!active) return;

      gsap.killTweensOf(overlay);
      if (loader) gsap.killTweensOf(loader);

      // Star scales up and fades — the "opening" motion
      if (loader) {
        gsap.to(loader, {
          scale: 2.2,
          opacity: 0,
          duration: 0.45,
          ease: "power2.out",
        });
      }

      // Overlay dissolves slightly slower so the star finishes first,
      // then the page fully emerges from the ink
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.55,
        ease: "power2.inOut",
        onComplete: () => {
          if (!active) return;
          overlay.style.pointerEvents = "none";
          window.dispatchEvent(new CustomEvent("wc:page-ready"));
        },
      });
    })();

    return () => {
      active = false;
      const gsap = gsapRef.current;
      if (gsap) {
        gsap.killTweensOf(overlay);
        if (loader) gsap.killTweensOf(loader);
      }
    };
  }, [pathname, shouldAnimate]);

  return (
    <>
      {/*
        Ink overlay — no scaleY, no origin class.
        Starts opaque (CSS default opacity:1) so it covers the page on first
        load; GSAP controls opacity from that point on via inline style.
        React has no style prop here, so re-renders never fight GSAP.
      */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[40] bg-ink"
        aria-hidden="true"
      />

      {/*
        Star loader — opacity-0 class keeps it hidden by default.
        GSAP inline style (opacity:1) overrides the class while nav is active.
        scale is also GSAP-only — no React prop — so re-renders don't reset it.
      */}
      <div
        ref={loaderRef}
        className="pointer-events-none fixed inset-0 z-[55] flex items-center justify-center opacity-0"
        aria-hidden="true"
      >
        <div style={{ animation: "wallchemy-spin 2.5s linear infinite" }}>
          <Image
            src="/brand/mark-white-200.png"
            alt=""
            width={48}
            height={48}
            className="logo-campagne h-12 w-12 opacity-80"
          />
        </div>
      </div>
    </>
  );
}
