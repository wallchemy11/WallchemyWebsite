"use client";

import { useEffect, useRef, useState } from "react";

type SmartVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  mobileSrc?: string;
};

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}

export default function SmartVideo({
  src,
  mobileSrc,
  poster,
  className
}: SmartVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: containerRef, inView } = useInView<HTMLDivElement>({
    threshold: 0.35
  });
  const [shouldLoad, setShouldLoad] = useState(false);
  const [selectedSrc, setSelectedSrc] = useState(src);
  const [canStreamVideo, setCanStreamVideo] = useState(true);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const connection = (navigator as any).connection;
      const saveData = Boolean(connection?.saveData);
      const lowBandwidth =
        typeof connection?.effectiveType === "string" &&
        /(2g|slow-2g|3g)/i.test(connection.effectiveType);
      setSelectedSrc(mobile.matches && mobileSrc ? mobileSrc : src);
      setCanStreamVideo(!reducedMotion.matches && !saveData && !lowBandwidth);
    };
    update();
    mobile.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, [src, mobileSrc]);

  useEffect(() => {
    if (canStreamVideo && inView) {
      setShouldLoad(true);
    }
  }, [inView, canStreamVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (!inView) {
      video.pause();
      return;
    }

    if (document.visibilityState !== "visible") {
      video.pause();
      return;
    }

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // Autoplay can be blocked; we silently ignore and keep poster visible.
      });
    }
  }, [inView, shouldLoad, selectedSrc]);

  return (
    <div ref={containerRef} className={className}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        aria-hidden="true"
      >
        {shouldLoad ? <source src={selectedSrc} /> : null}
      </video>
    </div>
  );
}

