"use client";

import { useEffect, useState } from "react";

function readMedia() {
  if (typeof window === "undefined") return { reduced: false, mobile: false };
  return {
    reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    mobile: window.matchMedia("(max-width: 767px)").matches
  };
}

export function useMotionPrefs() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => readMedia().reduced
  );
  const [isMobile, setIsMobile] = useState(() => readMedia().mobile);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");

    const onReduced = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    const onMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    reduced.addEventListener("change", onReduced);
    mobile.addEventListener("change", onMobile);

    return () => {
      reduced.removeEventListener("change", onReduced);
      mobile.removeEventListener("change", onMobile);
    };
  }, []);

  return {
    prefersReducedMotion,
    isMobile,
    shouldAnimate: !prefersReducedMotion
  };
}
