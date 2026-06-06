"use client";

import { useEffect, useRef, useState } from "react";

type SmartVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  mobileSrc?: string;
  priority?: boolean;
};

function isHlsManifest(url: string) {
  return /\.m3u8(?:[?#].*)?$/i.test(url);
}

// Module-level singleton — hls.js is loaded once and reused across all instances
let hlsPromise: Promise<typeof import("hls.js")["default"] | null> | null = null;

async function loadHls() {
  if (!hlsPromise) {
    hlsPromise = import("hls.js")
      .then((m) => m.default)
      .catch(() => null);
  }
  return hlsPromise;
}

function useInView<T extends HTMLElement>(threshold = 0.05) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

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
  const { ref: containerRef, inView } = useInView<HTMLDivElement>(0.05);

  const [selectedSrc, setSelectedSrc] = useState(src);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [canStreamVideo, setCanStreamVideo] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(true);
  // Gates HLS setup until Effect 2 has confirmed the correct src.
  // Prevents the double-load race where SSR hydration restores the desktop
  // URL and the HLS effect fires once before Effect 2 switches to mobile.
  const [srcReady, setSrcReady] = useState(false);

  const selectedSrcIsHls = isHlsManifest(selectedSrc);

  // Refs so closures read current values without re-triggering effects
  const inViewRef = useRef(inView);
  const isPageVisibleRef = useRef(isPageVisible);
  useEffect(() => { inViewRef.current = inView; }, [inView]);
  useEffect(() => { isPageVisibleRef.current = isPageVisible; }, [isPageVisible]);

  // Page visibility
  useEffect(() => {
    const onChange = () => setIsPageVisible(document.visibilityState === "visible");
    onChange();
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  // Source selection — runs once on mount and on resize / network changes.
  // setSrcReady(true) is always called here, so the HLS effect only fires
  // after this effect has confirmed the correct selectedSrc.
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
      // Batch all three updates — React 18 flushes them in one re-render,
      // so the HLS effect sees the correct selectedSrc the first time it runs.
      setSelectedSrc(nextSrc);
      setCanStreamVideo(nextCanStream);
      setSrcReady(true);
      if (priority && nextCanStream) setShouldLoad(true);
    };

    update();
    mobile.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, [src, mobileSrc, priority]);

  // Trigger load when in view
  useEffect(() => {
    if (canStreamVideo && (priority || inView)) setShouldLoad(true);
  }, [inView, canStreamVideo, priority]);

  // Plain .mp4 playback — gated on srcReady so it never fires before the
  // source-selection effect has confirmed the correct desktop/mobile src.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad || !canStreamVideo || selectedSrcIsHls || !srcReady) return;

    const tryPlay = () => {
      if (inViewRef.current && isPageVisibleRef.current) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener("canplay", tryPlay, { once: true });
    video.load();
    return () => video.removeEventListener("canplay", tryPlay);
  }, [shouldLoad, canStreamVideo, selectedSrcIsHls, selectedSrc, srcReady]);

  // HLS playback — gated on srcReady so it never fires with the wrong src
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad || !canStreamVideo || !selectedSrcIsHls || !srcReady) return;

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

    loadHls()
      .then((HlsCtor) => {
        if (cancelled || !video) return;
        if (HlsCtor?.isSupported?.()) {
          const hls = new HlsCtor({
            enableWorker: false,
            lowLatencyMode: false
          });
          hls.loadSource(selectedSrc);
          hls.attachMedia(video);
          // Play as soon as the manifest is parsed and we're in view
          hls.on(HlsCtor.Events.MANIFEST_PARSED, () => {
            if (!cancelled && inViewRef.current && isPageVisibleRef.current) {
              video.play().catch(() => {});
            }
          });
          teardown = () => {
            hls.off(HlsCtor.Events.MANIFEST_PARSED);
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
  }, [selectedSrc, shouldLoad, canStreamVideo, selectedSrcIsHls, srcReady]);

  // Play / pause — selectedSrc intentionally omitted from deps (not used in body)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad || !canStreamVideo) return;

    if (!inView || !isPageVisible) {
      video.pause();
      return;
    }

    video.play().catch(() => {});
  }, [inView, shouldLoad, canStreamVideo, isPageVisible]);

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
