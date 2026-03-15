"use client";

import { useEffect, useRef, useState } from "react";

type SmartVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  mobileSrc?: string;
  priority?: boolean;
};

declare global {
  interface Window {
    Hls?: any;
    __hlsLibPromise?: Promise<any>;
  }
}

function isHlsManifest(url: string) {
  return /\.m3u8(?:[?#].*)?$/i.test(url);
}

async function loadHlsLibrary() {
  if (typeof window === "undefined") return null;
  if (window.Hls) return window.Hls;
  if (!window.__hlsLibPromise) {
    window.__hlsLibPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector(
        'script[data-hls-lib="true"]'
      ) as HTMLScriptElement | null;
      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(window.Hls || null), {
          once: true
        });
        existingScript.addEventListener("error", () => reject(new Error("Failed to load hls.js")), {
          once: true
        });
        return;
      }

      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/hls.js@1.5.17/dist/hls.min.js";
      script.async = true;
      script.dataset.hlsLib = "true";
      script.onload = () => resolve(window.Hls || null);
      script.onerror = () => reject(new Error("Failed to load hls.js"));
      document.head.appendChild(script);
    });
  }
  return window.__hlsLibPromise;
}

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
  className,
  priority = false
}: SmartVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: containerRef, inView } = useInView<HTMLDivElement>({
    threshold: 0.35
  });
  const [shouldLoad, setShouldLoad] = useState(false);
  const [selectedSrc, setSelectedSrc] = useState(src);
  const [canStreamVideo, setCanStreamVideo] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const selectedSrcIsHls = isHlsManifest(selectedSrc);

  useEffect(() => {
    const onVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === "visible");
    };
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const connection = (navigator as any).connection;
      const saveData = Boolean(connection?.saveData);
      const lowBandwidth =
        typeof connection?.effectiveType === "string" &&
        /(2g|slow-2g|3g)/i.test(connection.effectiveType);
      const nextSrc = mobile.matches && mobileSrc ? mobileSrc : src;
      const nextCanStream = !reducedMotion.matches && !saveData && !lowBandwidth;
      setSelectedSrc(nextSrc);
      setCanStreamVideo(nextCanStream);
      if (priority && nextCanStream) {
        setShouldLoad(true);
      }
    };
    update();
    mobile.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, [src, mobileSrc, priority]);

  useEffect(() => {
    if (canStreamVideo && (priority || inView)) {
      setShouldLoad(true);
    }
  }, [inView, canStreamVideo, priority]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!shouldLoad || !canStreamVideo || !selectedSrcIsHls) return;

    let cancelled = false;
    let teardown = () => {};

    const attachNativeHls = () => {
      video.src = selectedSrc;
      video.load();
      teardown = () => {
        video.pause();
        video.removeAttribute("src");
        video.load();
      };
    };

    const canPlayNativeHls = Boolean(
      video.canPlayType("application/vnd.apple.mpegurl") ||
        video.canPlayType("application/x-mpegURL")
    );

    if (canPlayNativeHls) {
      attachNativeHls();
      return () => teardown();
    }

    loadHlsLibrary()
      .then((HlsCtor) => {
        if (cancelled || !video) return;
        if (HlsCtor?.isSupported?.()) {
          const hls = new HlsCtor({
            enableWorker: true,
            lowLatencyMode: true
          });
          hls.loadSource(selectedSrc);
          hls.attachMedia(video);
          teardown = () => {
            hls.destroy();
          };
        } else {
          attachNativeHls();
        }
      })
      .catch(() => {
        if (!cancelled) attachNativeHls();
      });

    return () => {
      cancelled = true;
      teardown();
    };
  }, [selectedSrc, shouldLoad, canStreamVideo, selectedSrcIsHls]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad || !canStreamVideo) return;

    if (!inView) {
      video.pause();
      return;
    }

    if (!isPageVisible) {
      video.pause();
      return;
    }

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // Autoplay can be blocked; we silently ignore and keep poster visible.
      });
    }
  }, [inView, shouldLoad, selectedSrc, canStreamVideo, isPageVisible]);

  return (
    <div ref={containerRef} className={className}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        muted
        loop
        playsInline
        preload={priority ? "metadata" : "none"}
        poster={poster}
        aria-hidden="true"
      >
        {shouldLoad && !selectedSrcIsHls ? (
          <source src={selectedSrc} type="video/mp4" />
        ) : null}
      </video>
    </div>
  );
}

