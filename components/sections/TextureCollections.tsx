"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type WheelEvent
} from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";
import { resolveText } from "@/lib/text";
import { loadGsap } from "@/components/animations/loadGsap";
import { useMotionPrefs } from "@/components/animations/useMotionPrefs";

type Collection = {
  title: string;
  slug: string;
  heroImage: string;
  images?: string[];
  shortDescription: string;
};

type TextureCollectionsProps = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  supportText?: string;
  collections: Collection[];
};

export default function TextureCollections({
  eyebrow,
  title,
  intro,
  supportText,
  collections
}: TextureCollectionsProps) {
  const safeEyebrow = resolveText(eyebrow);
  const safeTitle = resolveText(title);
  const safeIntro = resolveText(intro);
  const safeSupportText = resolveText(supportText);
  const safeCollections = useMemo(() => collections || [], [collections]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, true>>({});
  const [autoPaused, setAutoPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const directoryScrollRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useMotionPrefs();

  if (safeCollections.length === 0) return null;

  const normalizedIndex = Math.min(activeIndex, safeCollections.length - 1);
  const selected = safeCollections[normalizedIndex];
  const imageSource =
    selected.images && selected.images.length > 0
      ? selected.images
      : [selected.heroImage];
  const images = Array.from(new Set(imageSource.filter(Boolean))).slice(0, 4);

  const key0 = `${selected.slug}-0-${images[0] || ""}`;
  const key1 = `${selected.slug}-1-${images[1] || ""}`;
  const key2 = `${selected.slug}-2-${images[2] || ""}`;
  const key3 = `${selected.slug}-3-${images[3] || ""}`;
  const show0 = !!images[0] && !failedImages[key0];
  const show1 = !!images[1] && !failedImages[key1];
  const show2 = !!images[2] && !failedImages[key2];
  const show3 = !!images[3] && !failedImages[key3];
  const imageKeys = [key0, key1, key2, key3];
  const visibleImages = images
    .map((src, idx) => ({ src, key: imageKeys[idx] }))
    .filter((item) => !!item.src && !failedImages[item.key]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || !shouldAnimate) return;

    let mounted = true;
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap } = await loadGsap();
      if (!mounted) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          stage.querySelectorAll(".texture-stage-title, .texture-stage-copy"),
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12
          }
        );
        gsap.fromTo(
          stage.querySelectorAll(".texture-frame"),
          { y: 30, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.08
          }
        );
      }, stage);

      cleanup = () => ctx.revert();
    })();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [normalizedIndex, shouldAnimate]);

  const handleDirectoryWheel = (event: WheelEvent<HTMLDivElement>) => {
    const el = directoryScrollRef.current;
    if (!el) return;
    const canScroll = el.scrollHeight > el.clientHeight;
    if (!canScroll) return;
    const nextTop = el.scrollTop + event.deltaY;
    const maxTop = el.scrollHeight - el.clientHeight;
    const willScroll = nextTop > 0 && nextTop < maxTop;
    if (willScroll) {
      event.preventDefault();
      el.scrollTop = nextTop;
    }
  };

  useEffect(() => {
    const syncVisibility = () => {
      setPageVisible(document.visibilityState === "visible");
    };
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, []);

  useEffect(() => {
    if (safeCollections.length <= 1 || autoPaused || !pageVisible) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeCollections.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [safeCollections.length, autoPaused, pageVisible]);

  return (
    <section className="relative overflow-hidden bg-ink py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(201,166,107,0.16),transparent_36%),radial-gradient(circle_at_86%_78%,rgba(103,72,48,0.2),transparent_42%)]" />
      <div className="mx-auto max-w-[1460px] px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading
            eyebrow={safeEyebrow}
            title={safeTitle}
            subtitle={safeIntro}
          />
          <div className="relative mt-14 grid gap-8 border border-alabaster/12 bg-gradient-to-b from-[#130f0d] via-[#100d0b] to-[#0c0a09] p-5 sm:p-6 md:grid-cols-[0.78fr_1.22fr] md:gap-12 md:p-8 lg:p-10">
            <aside
              data-reveal
              className="space-y-7 border-b border-alabaster/10 pb-8 md:sticky md:top-10 md:flex md:max-h-[82vh] md:min-h-0 md:flex-col md:space-y-6 md:border-b-0 md:border-r md:pb-0 md:pr-9"
            >
              <p className="text-[10px] tracking-[0.24em] text-brass/90 sm:text-xs">
                Texture Directory
              </p>
              <p className="max-w-lg text-sm leading-relaxed text-alabaster/76 sm:text-base md:text-lg">
                {safeSupportText || safeIntro}
              </p>
              <div className="rounded border border-alabaster/12 bg-[#0f0c0a]/70 p-3 md:flex md:flex-1 md:min-h-0 md:flex-col">
                <div
                  ref={directoryScrollRef}
                  onWheel={handleDirectoryWheel}
                  onMouseEnter={() => setAutoPaused(true)}
                  onMouseLeave={() => setAutoPaused(false)}
                  onTouchStart={() => setAutoPaused(true)}
                  onTouchEnd={() => setAutoPaused(false)}
                  onFocus={() => setAutoPaused(true)}
                  onBlur={() => setAutoPaused(false)}
                  className="max-h-[42vh] space-y-3 overflow-y-auto overscroll-contain pr-2 [scrollbar-color:rgba(201,166,107,0.55)_rgba(255,255,255,0.06)] [scrollbar-width:thin] md:h-full md:flex-1 md:max-h-none md:min-h-0 md:touch-pan-y [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brass/60 [&::-webkit-scrollbar-track]:bg-alabaster/5 [&::-webkit-scrollbar]:w-1.5"
                >
                  {safeCollections.map((collection, index) => {
                    const isActive = index === normalizedIndex;
                    return (
                      <button
                        key={collection.slug}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`group w-full rounded border px-4 py-4 text-left transition ${
                          isActive
                            ? "border-brass/70 bg-brass/[0.09] shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
                            : "border-alabaster/10 bg-alabaster/[0.02] hover:border-brass/40"
                        }`}
                      >
                        <p className="text-[10px] tracking-[0.25em] text-brass/85 sm:text-xs">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="font-display mt-2 text-lg tracking-[0.04em] sm:text-xl md:text-2xl">
                          {collection.title}
                        </h3>
                        <p className="mt-2 max-h-10 overflow-hidden text-xs leading-relaxed text-alabaster/62 sm:max-h-12 sm:text-sm">
                          {collection.shortDescription}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="md:hidden">
                <div className="rounded border border-alabaster/10 bg-[#0c0a09] p-4">
                  <p className="text-[10px] tracking-[0.26em] text-brass/90 sm:text-xs">
                    {String(normalizedIndex + 1).padStart(2, "0")} / {String(safeCollections.length).padStart(2, "0")}
                  </p>
                  <h3 className="font-display mt-3 text-2xl tracking-[0.05em] sm:text-3xl">
                    {selected.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-alabaster/75">
                    {selected.shortDescription}
                  </p>
                  <div className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
                    {images.map((src, i) => {
                      const key = `${selected.slug}-m-${i}-${src || ""}`;
                      if (!src || failedImages[key]) return null;
                      return (
                        <div
                          key={key}
                          className="w-[78vw] max-w-[360px] flex-shrink-0 snap-start rounded border border-alabaster/15 bg-alabaster/[0.04] p-2"
                        >
                          <div className={`${i % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"} bg-[#151210]`}>
                            <Image
                              src={src}
                              alt={`${selected.title} ${i + 1}`}
                              width={700}
                              height={933}
                              sizes="78vw"
                              quality={70}
                              className="h-full w-full object-contain"
                              onError={() =>
                                setFailedImages((prev) => ({
                                  ...prev,
                                  [key]: true
                                }))
                              }
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>
            <div
              ref={stageRef}
              data-reveal="image"
              onMouseEnter={() => setAutoPaused(true)}
              onMouseLeave={() => setAutoPaused(false)}
              className="relative hidden rounded border border-alabaster/10 bg-[#0c0a09] p-6 md:block md:p-7 lg:p-8"
            >
              <div className="pointer-events-none absolute inset-0 rounded bg-[radial-gradient(circle_at_16%_14%,rgba(201,166,107,0.18),transparent_34%),radial-gradient(circle_at_84%_74%,rgba(120,90,62,0.24),transparent_40%)]" />
              <div className="relative z-10">
                <p className="texture-stage-copy text-[10px] tracking-[0.24em] text-brass/90 sm:text-xs">
                  {String(normalizedIndex + 1).padStart(2, "0")} / {String(safeCollections.length).padStart(2, "0")}
                </p>
              </div>
              <div className="relative z-10 mt-5 grid grid-cols-12 gap-4 lg:gap-5">
                {show0 ? (
                  <div className="texture-frame col-span-5 rounded border border-alabaster/18 bg-alabaster/[0.04] p-2 shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
                    <div className="aspect-[3/4] w-full bg-[#151210]">
                      <Image
                        src={images[0]}
                        alt={`${selected.title} 1`}
                        width={700}
                        height={933}
                        sizes="(max-width: 1280px) 35vw, 24vw"
                        quality={72}
                        className="h-full w-full object-contain"
                        onError={() =>
                          setFailedImages((prev) => ({
                            ...prev,
                            [key0]: true
                          }))
                        }
                      />
                    </div>
                  </div>
                ) : null}
                {show1 ? (
                  <div className="texture-frame col-span-7 rounded border border-alabaster/18 bg-alabaster/[0.04] p-2 shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
                    <div className="aspect-[4/3] w-full bg-[#151210]">
                      <Image
                        src={images[1]}
                        alt={`${selected.title} 2`}
                        width={960}
                        height={720}
                        sizes="(max-width: 1280px) 45vw, 30vw"
                        quality={72}
                        className="h-full w-full object-contain"
                        onError={() =>
                          setFailedImages((prev) => ({
                            ...prev,
                            [key1]: true
                          }))
                        }
                      />
                    </div>
                  </div>
                ) : null}
                {show2 ? (
                  <div className="texture-frame col-span-7 rounded border border-alabaster/18 bg-alabaster/[0.04] p-2 shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
                    <div className="aspect-[4/3] w-full bg-[#151210]">
                      <Image
                        src={images[2]}
                        alt={`${selected.title} 3`}
                        width={960}
                        height={720}
                        sizes="(max-width: 1280px) 45vw, 30vw"
                        quality={72}
                        className="h-full w-full object-contain"
                        onError={() =>
                          setFailedImages((prev) => ({
                            ...prev,
                            [key2]: true
                          }))
                        }
                      />
                    </div>
                  </div>
                ) : null}
                {show3 ? (
                  <div className="texture-frame col-span-5 rounded border border-alabaster/18 bg-alabaster/[0.04] p-2 shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
                    <div className="aspect-[3/4] w-full bg-[#151210]">
                      <Image
                        src={images[3]}
                        alt={`${selected.title} 4`}
                        width={700}
                        height={933}
                        sizes="(max-width: 1280px) 35vw, 24vw"
                        quality={72}
                        className="h-full w-full object-contain"
                        onError={() =>
                          setFailedImages((prev) => ({
                            ...prev,
                            [key3]: true
                          }))
                        }
                      />
                    </div>
                  </div>
                ) : null}
                {visibleImages.length === 0 ? (
                  <div className="col-span-12 rounded border border-alabaster/10 bg-[#14110f] px-6 py-14 text-center text-sm text-alabaster/70">
                    Images for this texture are unavailable right now.
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
