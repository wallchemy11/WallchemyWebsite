"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { loadGsap } from "@/components/animations/loadGsap";

export default function LogoIntro() {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile =
      window.matchMedia("(max-width: 767px)").matches ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isMobile) {
      // Skip the overlay on mobile — dispatch done immediately so dependent animations don't stall
      (window as any).__wcIntroDone = true;
      window.dispatchEvent(new CustomEvent("wc:intro-done"));
      return;
    }

    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    let cancelled = false;

    const dismiss = () => {
      if (cancelled) return;
      cancelled = true;
      setVisible(false);
      (window as any).__wcIntroDone = true;
      window.dispatchEvent(new CustomEvent("wc:intro-done"));
    };

    // Hard cap — if GSAP stalls for any reason the overlay must not hang
    const fallback = setTimeout(dismiss, 5500);

    (async () => {
      const { gsap } = await loadGsap();
      if (cancelled) return;

      const overlay = overlayRef.current;
      const logo    = logoRef.current;
      if (!overlay || !logo) { dismiss(); return; }

      const tl = gsap.timeline({ onComplete: () => { clearTimeout(fallback); dismiss(); } });

      tl.to(logo, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" });
      tl.to({}, { duration: 1.8 });
      tl.to(overlay, { opacity: 0, duration: 0.8, ease: "power2.inOut" });
    })();

    return () => { cancelled = true; clearTimeout(fallback); };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-ink"
    >
      <div
        ref={logoRef}
        className="flex flex-col items-center gap-6"
        style={{ opacity: 0, transform: "translateY(14px)" }}
      >
        <div style={{ animation: "wallchemy-spin 5s linear infinite" }}>
          <Image
            src="/brand/mark-white-200.png"
            alt=""
            width={80}
            height={80}
            priority
            className="logo-campagne h-16 w-16 sm:h-20 sm:w-20"
          />
        </div>
        <Image
          src="/brand/wordmark-white-600.png"
          alt="Wallchemy"
          width={180}
          height={20}
          priority
          className="logo-campagne h-4 w-auto sm:h-5"
        />
      </div>
    </div>
  );
}
