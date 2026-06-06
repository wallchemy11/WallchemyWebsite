"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  collections,
}: TextureCollectionsProps) {
  const safeEyebrow   = resolveText(eyebrow);
  const safeTitle     = resolveText(title);
  const safeIntro     = resolveText(intro);
  const safeCollections = useMemo(() => collections || [], [collections]);

  const [activeIndex, setActiveIndex]   = useState(0);
  const [autoPaused,  setAutoPaused]    = useState(false);
  const [pageVisible, setPageVisible]   = useState(true);
  const [failedImages, setFailedImages] = useState<Record<string, true>>({});

  const panelRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const tabListRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useMotionPrefs();

  if (safeCollections.length === 0) return null;

  const idx     = Math.min(activeIndex, safeCollections.length - 1);
  const total   = String(safeCollections.length).padStart(2, "0");
  const numeral = String(idx + 1).padStart(2, "0");

  // ── Page visibility ───────────────────────────────────────────────────────
  useEffect(() => {
    const sync = () => setPageVisible(document.visibilityState === "visible");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  // ── Auto-advance ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (safeCollections.length <= 1 || autoPaused || !pageVisible) return;
    const t = window.setInterval(
      () => setActiveIndex((p) => (p + 1) % safeCollections.length),
      4800
    );
    return () => window.clearInterval(t);
  }, [safeCollections.length, autoPaused, pageVisible]);

  // ── Scroll active tab into view (horizontal only) ────────────────────────
  useEffect(() => {
    const list = tabListRef.current;
    if (!list) return;
    const btn = list.querySelectorAll<HTMLButtonElement>("button")[idx];
    if (!btn) return;
    const listRect = list.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const targetLeft =
      list.scrollLeft + (btnRect.left - listRect.left) - listRect.width / 2 + btnRect.width / 2;
    list.scrollTo({ left: targetLeft, behavior: "smooth" });
  }, [idx]);

  // ── GSAP crossfade between panels ────────────────────────────────────────
  const prevIndexRef = useRef(idx);
  useEffect(() => {
    if (!shouldAnimate) return;
    const prev    = prevIndexRef.current;
    const current = idx;
    prevIndexRef.current = current;
    if (prev === current) return;

    loadGsap().then(({ gsap }) => {
      const prevPanel = panelRefs.current[prev];
      const nextPanel = panelRefs.current[current];
      if (!prevPanel || !nextPanel) return;

      gsap.to(prevPanel, { opacity: 0, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(
        nextPanel,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.1 }
      );
    });
  }, [idx, shouldAnimate]);

  function markFailed(key: string) {
    setFailedImages((prev) => ({ ...prev, [key]: true }));
  }

  function getImages(c: Collection) {
    const src = c.images?.length ? c.images : [c.heroImage];
    return Array.from(new Set(src.filter(Boolean))).slice(0, 4);
  }

  return (
    <section
      className="relative overflow-x-clip bg-transparent py-10 sm:py-14 md:py-20"
      onMouseEnter={() => setAutoPaused(true)}
      onMouseLeave={() => setAutoPaused(false)}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_60%,rgba(201,166,107,0.08),transparent_70%)]" />

      <div className="mx-auto w-full max-w-[1460px] px-4 sm:px-6 md:px-8">
        <ScrollReveal>
          <SectionHeading eyebrow={safeEyebrow} title={safeTitle} subtitle={safeIntro} />
        </ScrollReveal>

        {/* ── Tab navigation ────────────────────────────────────────────── */}
        <div
          ref={tabListRef}
          className="mt-8 flex gap-2 overflow-x-auto pb-2 sm:mt-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
        >
          {safeCollections.map((c, i) => {
            const active = i === idx;
            return (
              <button
                key={c.slug}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => { setActiveIndex(i); setAutoPaused(true); }}
                className={`flex-shrink-0 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition-all duration-300 sm:px-5 sm:text-xs ${
                  active
                    ? "border-brass bg-brass/10 text-brass"
                    : "border-alabaster/15 text-alabaster/45 hover:border-alabaster/35 hover:text-alabaster/70"
                }`}
              >
                {c.title}
              </button>
            );
          })}
        </div>

        {/* ── Panel stack ───────────────────────────────────────────────── */}
        <div className="relative mt-6 sm:mt-8">
          {safeCollections.map((c, i) => {
            const images  = getImages(c);
            const hero    = images[0];
            const detail1 = images[1];
            const detail2 = images[2];
            const isActive = i === idx;
            const hKey  = `${c.slug}-h`;
            const d1Key = `${c.slug}-d1`;
            const d2Key = `${c.slug}-d2`;

            return (
              <div
                key={c.slug}
                ref={(el) => { panelRefs.current[i] = el; }}
                role="tabpanel"
                aria-hidden={!isActive}
                style={{ opacity: shouldAnimate ? (i === 0 ? 1 : 0) : (isActive ? 1 : 0) }}
                className={`${i === 0 ? "" : "absolute inset-0"} ${!isActive && !shouldAnimate ? "pointer-events-none" : ""}`}
              >
                {/* ── Desktop layout ───────────────────────────────────── */}
                <div className="hidden md:flex md:h-[72vh] md:max-h-[780px] md:min-h-[520px] md:gap-0 md:overflow-hidden md:rounded-sm md:border md:border-alabaster/10">

                  {/* Left: dominant image */}
                  <div className="relative w-[58%] flex-shrink-0 overflow-hidden bg-[#0d0b09]">
                    {hero && !failedImages[hKey] ? (
                      <>
                        <Image
                          src={hero}
                          alt={c.title}
                          fill
                          sizes="58vw"
                          quality={82}
                          className="object-cover transition-transform duration-700"
                          priority={i === 0}
                          onError={() => markFailed(hKey)}
                        />
                        {/* Right-edge fade to panel bg */}
                        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-[#0d0b09]" />
                        {/* Bottom vignette */}
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0d0b09]/70 to-transparent" />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-[#141210]" />
                    )}
                  </div>

                  {/* Right: info + detail images */}
                  <div className="flex flex-1 flex-col justify-between bg-[#0d0b09] px-8 py-8 lg:px-10 lg:py-10">
                    {/* Top: counter + name + description */}
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="h-px w-6 flex-shrink-0 bg-brass/60" />
                        <p className="text-[10px] uppercase tracking-[0.35em] text-brass/80">
                          Material
                        </p>
                        <span className="ml-auto font-mono text-xs text-alabaster/25">
                          {numeral} / {total}
                        </span>
                      </div>
                      <h2 className="font-display mt-5 text-[2.6rem] leading-[0.92] tracking-[0.02em] lg:text-[3.2rem] xl:text-[3.6rem]">
                        {c.title}
                      </h2>
                      <p className="mt-5 max-w-xs text-sm uppercase tracking-[0.14em] leading-relaxed text-alabaster/55 lg:mt-6 lg:max-w-sm">
                        {c.shortDescription}
                      </p>
                    </div>

                    {/* Bottom: detail thumbnails */}
                    <div className="flex gap-3 pt-6">
                      {detail1 && !failedImages[d1Key] && (
                        <div className="relative h-[18vh] flex-1 overflow-hidden rounded-sm border border-alabaster/12 bg-[#141210]">
                          <Image
                            src={detail1}
                            alt={`${c.title} detail`}
                            fill
                            sizes="16vw"
                            quality={70}
                            className="object-cover"
                            onError={() => markFailed(d1Key)}
                          />
                        </div>
                      )}
                      {detail2 && !failedImages[d2Key] && (
                        <div className="relative h-[18vh] flex-1 overflow-hidden rounded-sm border border-alabaster/12 bg-[#141210]">
                          <Image
                            src={detail2}
                            alt={`${c.title} detail`}
                            fill
                            sizes="16vw"
                            quality={70}
                            className="object-cover"
                            onError={() => markFailed(d2Key)}
                          />
                        </div>
                      )}
                      {!detail1 && !detail2 && (
                        <div className="h-[18vh] flex-1 rounded-sm border border-alabaster/8 bg-[#141210]" />
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Mobile layout ─────────────────────────────────────── */}
                <div className="md:hidden">
                  {/* Full-bleed hero image */}
                  <div className="relative h-[58svh] overflow-hidden rounded-sm bg-[#0d0b09]">
                    {hero && !failedImages[hKey] ? (
                      <>
                        <Image
                          src={hero}
                          alt={c.title}
                          fill
                          sizes="100vw"
                          quality={75}
                          className="object-cover"
                          priority={i === 0}
                          onError={() => markFailed(hKey)}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0d0b09] to-transparent" />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-[#141210]" />
                    )}

                    {/* Overlaid counter */}
                    <div className="absolute top-4 right-4 font-mono text-[11px] text-alabaster/40">
                      {numeral} / {total}
                    </div>
                  </div>

                  {/* Text block */}
                  <div className="px-1 pt-5 pb-8">
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="h-px w-5 flex-shrink-0 bg-brass/60" />
                      <p className="text-[10px] uppercase tracking-[0.3em] text-brass/80">Material</p>
                    </div>
                    <h2 className="font-display text-[2rem] leading-none tracking-[0.02em]">
                      {c.title}
                    </h2>
                    <p className="mt-3 text-sm uppercase tracking-[0.12em] leading-relaxed text-alabaster/55">
                      {c.shortDescription}
                    </p>

                    {/* Detail thumbnails */}
                    {(detail1 || detail2) && (
                      <div className="mt-5 flex gap-3">
                        {detail1 && !failedImages[d1Key] && (
                          <div className="relative h-[22svh] flex-1 overflow-hidden rounded-sm border border-alabaster/12">
                            <Image
                              src={detail1}
                              alt={`${c.title} detail`}
                              fill
                              sizes="45vw"
                              quality={65}
                              className="object-cover"
                              onError={() => markFailed(d1Key)}
                            />
                          </div>
                        )}
                        {detail2 && !failedImages[d2Key] && (
                          <div className="relative h-[22svh] flex-1 overflow-hidden rounded-sm border border-alabaster/12">
                            <Image
                              src={detail2}
                              alt={`${c.title} detail`}
                              fill
                              sizes="45vw"
                              quality={65}
                              className="object-cover"
                              onError={() => markFailed(d2Key)}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
