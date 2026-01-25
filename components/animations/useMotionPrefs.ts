"use client";

import { useEffect, useState } from "react";

export function useMotionPrefs() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");

    const update = () => {
      setPrefersReducedMotion(reduced.matches);
      setIsMobile(mobile.matches);
    };

    update();
    reduced.addEventListener("change", update);
    mobile.addEventListener("change", update);

    return () => {
      reduced.removeEventListener("change", update);
      mobile.removeEventListener("change", update);
    };
  }, []);

  return {
    prefersReducedMotion,
    isMobile,
    shouldAnimate: !prefersReducedMotion && !isMobile
  };
}

