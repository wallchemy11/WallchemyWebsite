"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMotionPrefs } from "@/components/animations/useMotionPrefs";
import { loadGsap } from "@/components/animations/loadGsap";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const loaderRef  = useRef<HTMLDivElement>(null); // spinning star wrapper — controls opacity
  const pathname   = usePathname();
  const { shouldAnimate } = useMotionPrefs();
  const navStarted = useRef(true);
  const gsapRef    = useRef<any>(null);

  useEffect(() => {
    loadGsap().then(({ gsap }) => { gsapRef.current = gsap; });
  }, []);

  // ── Cover overlay + show star loader the instant a nav click fires ────────
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
        gsap.set(overlay, { scaleY: 1 });
        if (loader) gsap.set(loader, { opacity: 1 });
      } else {
        overlay.style.transform = "scaleY(1)";
        if (loader) loader.style.opacity = "1";
      }
      overlay.style.pointerEvents = "auto";
    };

    window.addEventListener("wc:nav-start", cover);
    return () => window.removeEventListener("wc:nav-start", cover);
  }, []);

  // ── Lift overlay + fade star out when new page mounts ────────────────────
  useEffect(() => {
    const overlay = overlayRef.current;
    const loader  = loaderRef.current;
    if (!overlay) return;

    if (!navStarted.current) {
      overlay.style.transform = "scaleY(0)";
      overlay.style.pointerEvents = "none";
      if (loader) loader.style.opacity = "0";
      return;
    }
    navStarted.current = false;

    if (!shouldAnimate) {
      overlay.style.transform = "scaleY(0)";
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

      // Fade the star out just before the overlay lifts
      if (loader) {
        gsap.to(loader, { opacity: 0, duration: 0.2, ease: "power2.in" });
      }

      // Lift overlay — origin-bottom reveals page top-first
      gsap.fromTo(
        overlay,
        { scaleY: 1 },
        {
          scaleY: 0,
          transformOrigin: "bottom",
          duration: 0.45,
          ease: "power3.inOut",
          onComplete: () => {
            if (!active) return;
            overlay.style.pointerEvents = "none";
            window.dispatchEvent(new CustomEvent("wc:page-ready"));
          }
        }
      );
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
      {/* Ink overlay — origin-bottom so scaleY 1→0 reveals the page top-first */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[40] origin-bottom bg-ink"
        style={{ pointerEvents: "none" }}
      />

      {/*
        Star loader — centred above the overlay.
        opacity-0 via class keeps it hidden; GSAP sets opacity inline (overrides
        the class) only while a navigation is in progress.
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
