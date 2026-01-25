"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

  const selectedSrc = useMemo(() => {
    if (typeof window === "undefined") return src;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    return isMobile && mobileSrc ? mobileSrc : src;
  }, [src, mobileSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const connection = (navigator as any).connection;
    const saveData = Boolean(connection?.saveData);

    if (!inView || saveData) {
      video.pause();
      return;
    }

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // Autoplay can be blocked; we silently ignore and keep poster visible.
      });
    }
  }, [inView, selectedSrc]);

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
      >
        <source src={selectedSrc} />
      </video>
    </div>
  );
}

